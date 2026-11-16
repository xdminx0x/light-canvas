/* Light Canvas local-file backend. All state and image bytes live in the chosen folder. */
(() => {
  'use strict';
  window.__lcAppVersion = '__LC_APP_VERSION__';
  const nativeFetch = window.fetch.bind(window);
  const seedElement = document.getElementById('lc-seed');
  const seed = JSON.parse(seedElement.textContent); seedElement.remove();
  const gate = document.getElementById('folder-gate');
  const status = document.getElementById('folder-status');
  const pickButton = document.getElementById('choose-folder');
  const downloadButton = document.getElementById('download-data');
  const importButton = document.getElementById('import-data');
  const importInput = document.getElementById('import-file');
  let state, folder, assetFolder, active = new Map(), urls = new Map(), memoryAssets = new Map();
  const deletingAssets = new Set();
  let readyResolve;
  const ready = new Promise(resolve => { readyResolve = resolve; });
  const eventBus = new EventTarget();
  const now = () => new Date().toISOString();
  const clone = value => structuredClone(value);
  const response = (value, code = 200) => new Response(JSON.stringify(value), {status: code, headers: {'Content-Type': 'application/json; charset=utf-8'}});
  const failure = (message, code = 400) => response({error: message}, code);
  const all = kind => Object.values(state[kind] || {});
  const keyFor = provider => state.keys[provider.id] || (provider.apiKeyEnv && state.envKeys[provider.apiKeyEnv]) || '';
  const publicProvider = p => ({...p, models:window.LightCanvasModels.sort(p.models||[]), hasKey: !!keyFor(p), keyHint: keyFor(p) ? '已配置' : ''});
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const b64ToBytes = b64 => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const bytesToB64 = bytes => { let out = ''; for (let i = 0; i < bytes.length; i += 32768) out += String.fromCharCode(...bytes.subarray(i, i + 32768)); return btoa(out); };
  const readBlob = async blob => new Uint8Array(await blob.arrayBuffer());
  const escapeKey = error => { let message=String(error?.message||error); for(const key of [...Object.values(state?.keys||{}),...Object.values(state?.envKeys||{})].filter(Boolean)) message=message.replaceAll(key,'[密钥已隐藏]'); return message; };
  const db = () => new Promise((resolve, reject) => { const req = indexedDB.open('light-canvas-folder-v1', 1); req.onupgradeneeded = () => req.result.createObjectStore('handles'); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); });
  async function savedHandle() { const d = await db(); return new Promise((resolve, reject) => { const tx = d.transaction('handles'); const r = tx.objectStore('handles').get('data'); r.onsuccess = () => { resolve(r.result); d.close(); }; r.onerror = () => reject(r.error); }); }
  async function saveHandle(handle) { const d = await db(); return new Promise((resolve, reject) => { const tx = d.transaction('handles','readwrite'); tx.objectStore('handles').put(handle, 'data'); tx.oncomplete = () => { d.close(); resolve(); }; tx.onerror = () => reject(tx.error); }); }
  async function writeFile(handle, value) { const stream = await handle.createWritable(); await stream.write(value); await stream.close(); }
  let saveChain = Promise.resolve();
  function save() { if (!folder) return Promise.resolve(); saveChain = saveChain.catch(()=>{}).then(async () => { const file = await folder.getFileHandle('canvas.json', {create:true}); await writeFile(file, JSON.stringify(state)); }); return saveChain; }
  async function loadAsset(id) {
    assert(!deletingAssets.has(id), "图片正在删除");
    if (memoryAssets.has(id)) return memoryAssets.get(id);
    if (!assetFolder) throw new Error('图片文件夹未连接');
    const file = await assetFolder.getFileHandle(id).then(h => h.getFile());
    const blob = file.slice(0, file.size, state.asset[id]?.mime || 'application/octet-stream');
    return blob;
  }
  async function addAsset(blob, name, mime) {
    const id = crypto.randomUUID();
    const bytes = await readBlob(blob);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const sha256 = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2,'0')).join('');
    const actual = new Blob([bytes], {type: mime || blob.type || 'application/octet-stream'});
    if (assetFolder) await writeFile(await assetFolder.getFileHandle(id,{create:true}), actual);
    if (!assetFolder) memoryAssets.set(id, actual);
    const a = {id, name: String(name || 'image').slice(0,240), mime: actual.type, size: actual.size, url: `/api/assets/${id}`, sha256};
    state.asset[id] = a; await save(); return a;
  }
  window.__lcAssetUrl = id => '#lc-asset='+encodeURIComponent(id);
  // Visible images own a lease. Original bytes are read only for viewing/upload.
  const imageCache = new Map(), imagePending = new Map();
  let thumbnailFolder;
  async function thumbnail(id) {
    if (thumbnailFolder) try { return await (await thumbnailFolder.getFileHandle(id+'.webp')).getFile(); } catch {}
    const original = await loadAsset(id);
    const bitmap = await createImageBitmap(original);
    try {
      const scale = Math.min(1, 768 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('预览生成失败')), 'image/webp', .82));
      canvas.width=canvas.height=0;
      if(thumbnailFolder) await writeFile(await thumbnailFolder.getFileHandle(id+'.webp',{create:true}),blob).catch(()=>{});
      return blob;
    } finally { bitmap.close(); }
  }
  function trimImages() {
    let idle=0;
    for(const entry of imageCache.values()) if(!entry.refs && !entry.original) idle+=entry.bytes;
    for(const [key,entry] of imageCache) if(!entry.refs && (entry.original || idle>16*1024*1024 || Date.now()-entry.used>30000)) {
      URL.revokeObjectURL(entry.url); imageCache.delete(key); if(!entry.original)idle-=entry.bytes;
    }
  }
  async function acquireImage(id,original=false) {
    assert(!deletingAssets.has(id), "图片正在删除");
    const key=(original?'original:':'thumb:')+id;
    if(!imageCache.has(key)) {
      if(!imagePending.has(key)) imagePending.set(key,(async()=>{
        const blob=await (original?loadAsset(id):thumbnail(id));
        imageCache.set(key,{url:URL.createObjectURL(blob),bytes:blob.size,refs:0,used:Date.now(),original});
      })().finally(()=>imagePending.delete(key)));
      await imagePending.get(key);
    }
    const entry=imageCache.get(key); entry.refs++; entry.used=Date.now();
    let released=false;
    return {url:entry.url,release(){if(released)return;released=true;entry.refs--;entry.used=Date.now();trimImages();}};
  }
  setInterval(trimImages,10000);
  window.__lcAcquireImage=acquireImage;
  window.__lcImageStats=()=>({cached:imageCache.size,pending:imagePending.size,active:[...imageCache.values()].filter(e=>e.refs>0).length,memoryAssets:memoryAssets.size});
  // Open and download links request original bytes independently of thumbnails.
  document.addEventListener('click',async event=>{
    const anchor=event.target.closest?.('a[href^="#lc-asset="]'); if(!anchor)return;
    event.preventDefault();event.stopPropagation();
    const id=decodeURIComponent(anchor.getAttribute('href').slice(10));
    const imageViewer=anchor.dataset.imageViewer==='true';
    const popup=anchor.hasAttribute('download')?null:window.open('about:blank','_blank',imageViewer?'popup,width=1100,height=850':undefined);
    if(!anchor.hasAttribute('download')&&!popup){alert('浏览器阻止了新窗口，请允许此页面打开弹出窗口。');return;}
    try {
      if(imageViewer) {
        const blob=await loadAsset(id);
        if(popup.closed)return;
        popup.opener=null;
        const doc=popup.document;
        doc.title=state.asset[id]?.name||'原尺寸图片';
        const meta=doc.createElement('meta');meta.name='viewport';meta.content='width=device-width, initial-scale=1';doc.head.append(meta);
        doc.documentElement.style.cssText='background:#202020;color-scheme:dark;';
        const img=doc.createElement('img');img.alt=doc.title;img.tabIndex=0;img.setAttribute('role','button');
        let fit=true;
        const render=()=>{
          doc.body.style.cssText=fit?'margin:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;':'margin:0;min-width:max-content;min-height:100vh;';
          img.style.cssText=fit?'display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;cursor:zoom-in;':'display:block;max-width:none;max-height:none;width:auto;height:auto;margin:0 auto;cursor:zoom-out;';
          img.title=fit?'点击查看原始分辨率':'点击适应窗口';
          img.setAttribute('aria-label',img.title);img.setAttribute('aria-pressed',String(!fit));
        };
        const toggle=(event)=>{
          if(!img.naturalWidth)return;
          const rect=img.getBoundingClientRect(),x=event?.clientX??popup.innerWidth/2,y=event?.clientY??popup.innerHeight/2;
          const point={x:(x-rect.left)/rect.width*img.naturalWidth,y:(y-rect.top)/rect.height*img.naturalHeight};
          fit=!fit;render();
          popup.scrollTo(fit?0:Math.max(0,point.x-x),fit?0:Math.max(0,point.y-y));
        };
        img.addEventListener('click',toggle);
        img.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
        render();img.src=popup.URL.createObjectURL(blob);
        doc.body.replaceChildren(img);
        return;
      }
      const lease=await acquireImage(id,true);
      if(anchor.hasAttribute('download')) {const a=document.createElement('a');a.href=lease.url;a.download=anchor.download||state.asset[id]?.name||'image';a.click();}
      else if(popup)popup.location.href=lease.url;
      setTimeout(lease.release,60000);
    } catch {if(popup)popup.close();alert('原图读取失败，请确认数据文件夹仍可访问。');}
  },true);

  function hydrateUrls() { for (const [id,blob] of memoryAssets) if (!urls.has(id)) urls.set(id,URL.createObjectURL(blob)); }
  async function installFolder(handle, fromImport = false) {
    folder = handle; assetFolder = await folder.getDirectoryHandle('assets', {create:true});
    thumbnailFolder = await folder.getDirectoryHandle('thumbnails', {create:true});
    let existing;
    try { existing = JSON.parse(await (await folder.getFileHandle('canvas.json')).getFile().then(f => f.text())); } catch {}
    if (existing && existing.format === 'light-canvas-html-v1') state = existing;
    else {
      state = clone(seed.state);
      if (fromImport) state = fromImport;
      for (const [id,b64] of Object.entries(seed.assets)) {
        const blob = new Blob([b64ToBytes(b64)],{type:state.asset[id]?.mime || 'application/octet-stream'});
        await writeFile(await assetFolder.getFileHandle(id,{create:true}),blob);
        // Originals remain on disk.
      }
      await save();
    }
    gate.hidden = true; readyResolve();
    // Remembering a folder is optional: browser storage must not block opening it.
    saveHandle(folder).catch(()=>{});
  }
  async function startMemory() {
    folder=null;assetFolder=null;thumbnailFolder=undefined;
    state = clone(seed.state);
    for (const [id,b64] of Object.entries(seed.assets)) memoryAssets.set(id,new Blob([b64ToBytes(b64)],{type:state.asset[id]?.mime || 'application/octet-stream'}));
    gate.hidden = true; readyResolve();
  }
  let choosingFolder=false;
  pickButton.addEventListener('click', async () => {
    if(choosingFolder)return;
    choosingFolder=true;pickButton.disabled=true;
    let phase='select';
    try {
      if (!window.showDirectoryPicker) { status.textContent = '此浏览器不能直接保存到文件夹。请用最新版 Chrome 或 Edge 打开。'; return; }
      status.textContent = '请在弹出窗口中选择 data 文件夹，并允许浏览器查看和编辑。';
      const handle = await showDirectoryPicker({id:'light-canvas-data',mode:'readwrite'});
      phase='permission';
      if(typeof handle.queryPermission==='function'&&typeof handle.requestPermission==='function') {
        if(await handle.queryPermission({mode:'readwrite'})!=='granted') {
          status.textContent='已选中文件夹，请在浏览器提示中允许查看和编辑文件。';
          if(await handle.requestPermission({mode:'readwrite'})!=='granted')throw new DOMException('未取得所选文件夹的读写权限','NotAllowedError');
        }
      }
      phase='write';status.textContent=`已选择 ${handle.name}，正在准备画布数据…`;
      await installFolder(handle);
    } catch (e) {
      const code=e.name||'Error';
      if(code==='AbortError'&&phase!=='write')status.textContent='未完成文件夹选择或读写授权。请重新选择 data，点击“选择文件夹”，再允许浏览器查看和编辑。';
      else if(code==='NotAllowedError')status.textContent='没有取得文件夹的读写权限。请重新选择 data 并允许查看和编辑；若没有授权提示，请检查浏览器是否禁止文件访问。';
      else if(code==='SecurityError')status.textContent='浏览器阻止了文件夹访问。请用本机 Chrome 或 Edge 打开 index.html，再点击“选择数据文件夹”。';
      else status.textContent=`${phase==='write'?'文件夹已选中，但创建或读取数据失败':'连接文件夹失败'}：${e.message||code}（${code}）`;
    } finally {choosingFolder=false;pickButton.disabled=false;}
  });
  downloadButton.addEventListener('click', async () => { await startMemory(); alert('当前为临时使用。保存新内容时，请在设置中下载完整备份。'); });
  importButton.addEventListener('click', () => importInput.click());
  importInput.addEventListener('change', async () => {
    try { const zip = await JSZip.loadAsync(importInput.files[0]); const raw = await zip.file('canvas.json').async('string'); const imported = JSON.parse(raw); assert(imported.format === 'light-canvas-html-v1','不是此版本的备份'); if (!window.showDirectoryPicker) throw new Error('请用 Chrome 或 Edge 导入'); const handle = await showDirectoryPicker({id:'light-canvas-data',mode:'readwrite'}); const images = await handle.getDirectoryHandle('assets',{create:true}); for (const [path,file] of Object.entries(zip.files)) if (path.startsWith('assets/') && !file.dir) await writeFile(await images.getFileHandle(path.slice(7),{create:true}), await file.async('blob')); await writeFile(await handle.getFileHandle('canvas.json',{create:true}),JSON.stringify(imported)); await installFolder(handle); } catch(e) { status.textContent = `导入失败：${e.message}`; }
  });
  (async () => {
    try {
      if (window.showDirectoryPicker) {
        const handle = await savedHandle();
        if (handle && handle.name === 'data' && await handle.queryPermission({mode:'readwrite'}) === 'granted') { await installFolder(handle); return; }
        if (handle && handle.name !== 'data') { status.textContent = '请选择 light-canvas 项目内的 data 文件夹，画布、图片与接口配置将保存在一起。'; return; }
        if (handle) status.textContent = '需要重新授权上次使用的数据文件夹。';
      } else status.textContent = '此浏览器无法自动写入文件夹。建议用 Chrome 或 Edge 打开。';
    } catch(e) { status.textContent = `请重新选择数据文件夹：${e.message}`; }
  })();
  function emitRun(run) { run.updatedAt = now(); run.seq = (run.seq || 0)+1; state.run[run.id] = clone(run); save(); eventBus.dispatchEvent(new CustomEvent('run',{detail:clone(run)})); }
  class LocalEvents {
    constructor(url) { this.url=url; this.closed=false; this.handlers=new Map(); this.listener=e=>{ if(this.closed) return; if(url.includes('/runs/') && !url.includes(`/runs/${e.detail.id}/`)) return; const msg={data:JSON.stringify(e.detail),lastEventId:String(e.detail.seq||0)}; for(const h of this.handlers.get('run')||[]) h(msg); if(this.onmessage) this.onmessage(msg); }; eventBus.addEventListener('run',this.listener); queueMicrotask(()=>{ if(this.closed)return; const runs=url.includes('/runs/')?[state.run[url.split('/')[3]]]:all('run'); for(const r of runs.filter(Boolean)) this.listener({detail:r}); this.onopen?.(); }); }
    addEventListener(name,handler){const list=this.handlers.get(name)||[];list.push(handler);this.handlers.set(name,list)}
    removeEventListener(name,handler){this.handlers.set(name,(this.handlers.get(name)||[]).filter(h=>h!==handler))}
    close(){this.closed=true;eventBus.removeEventListener('run',this.listener)}
  }
  window.EventSource = LocalEvents;
  const providerEndpoint = (p, suffix) => `${p.baseUrl.replace(/\/+$/,'')}/${suffix}`;
  const imagePlan=(model,params)=>window.LightCanvasSizing.plan(model,params);
  function context(workspaceId,nodeId) {
    const w=state.workspace[workspaceId], n=w?.nodes.find(x=>x.id===nodeId); assert(n?.data?.kind==='input','请选择输入节点');
    const d=n.data,p=state.provider[d.providerId]; assert(p,'请先配置 API 提供商'); assert(d.model,'请选择模型');
    const imageReferences=window.LightCanvasImages.resolve(w,nodeId,state.run,state.asset,true);
    const hasMentions=window.LightCanvasImages.mentions(d.prompt).length>0;
    const transmittedPrompt=hasMentions?window.LightCanvasImages.transmitted(d.prompt,imageReferences):d.prompt;
    const excluded=new Set(d.excludedImageIds||[]);
    const ids=new Set(), messages=[], sources=[]; const byId=id=>w.nodes.find(x=>x.id===id);
    const add=(role,text,assets=[],source)=>{for(const id of assets){assert(state.asset[id],'上下文引用的图片不存在');ids.add(id)} if(text||assets.length)messages.push({role,content:text||'',...(assets.length?{assetIds:[...assets]}:{})});if(source&&!sources.includes(source))sources.push(source)};
    const body=node=>{const r=state.run[node?.data?.runId];return {text:r?r.text:node?.data?.prompt||'',assetIds:r?r.assetIds:node?.data?.assetIds||[]}};
    const seen=new Set();function history(input){if(seen.has(input.id))throw Error('对话连线包含循环');seen.add(input.id);const e=w.edges.find(x=>x.target===input.id&&x.data?.kind==='history');if(e){const result=byId(e.source);if(result){const gen=w.edges.find(x=>x.target===result.id&&x.data?.kind==='generation');const previous=gen&&byId(gen.source);if(previous?.data.kind==='input'){history(previous);const r=state.run[result.data.runId],snap=r?.snapshot;add('user',snap?.transmittedPrompt??snap?.currentPrompt??(previous.data.prompt||''),snap?.currentAssetIds||previous.data.assetIds||[],previous.id)}const b=body(result);add('assistant',b.text,b.assetIds,result.id)}}seen.delete(input.id)}
    if(d.systemPrompt)add('system',d.systemPrompt);
    if(d.mode!=='image') history(n);
    for(const e of w.edges.filter(x=>x.target===n.id&&(x.data?.kind==='reference'||d.mode==='image'&&x.data?.kind==='history'))){const ref=byId(e.source);if(ref){const b=body(ref);add('user',d.mode==='image'&&b.assetIds.length?'':b.text,hasMentions?[]:b.assetIds.filter(id=>!excluded.has(id)),ref.id)}}
    add('user',transmittedPrompt,hasMentions?imageReferences.map(i=>i.assetId):(d.assetIds||[]).filter(id=>!excluded.has(id)),n.id);assert((d.prompt||'').length||ids.size,'请输入提示词或添加图片');
    const params=d.params||{}, plan=d.mode==='image'?imagePlan(d.model,params):null; let endpoint,request,transport='json';
    if(p.protocol==='mock'){endpoint=`local:demo/${d.mode}`;request={model:d.model,messages,mode:d.mode,params}}
    else if(d.mode==='image'){
      assert(p.protocol==='images','生图模式需要图片 API');assert(!messages.slice(0,-1).some(m=>m.content),'生图只发送当前提示词与图片；请清空引用文字');
      assert(!ids.size||p.imageEdit,'此接口未启用参考图编辑');
      endpoint=providerEndpoint(p,ids.size?'images/edits':'images/generations');
      const orderedIds=imageReferences.filter(i=>ids.has(i.assetId)).map(i=>i.assetId);
      request={model:d.model,prompt:transmittedPrompt,n:params.n||1,...(plan?.apiSize||params.size?{size:plan?.apiSize||params.size}:{}),...(params.quality?{quality:params.quality}:{}),...(ids.size?{images:orderedIds.map(id=>({...state.asset[id],assetId:id}))}:{})};
      if(ids.size)transport='multipart';
    }else{
      assert(p.protocol==='responses'||p.protocol==='chat-completions','聊天模式需要聊天 API');assert(!ids.size||p.imageInput,'此接口未启用图片输入');
      const isChat=p.protocol==='chat-completions';endpoint=providerEndpoint(p,isChat?'chat/completions':'responses');
      const render=m=>({role:m.role,content:m.assetIds?.length?[{type:isChat?'text':'input_text',text:m.content},...m.assetIds.map(id=>isChat?{type:'image_url',image_url:{url:`/api/assets/${id}`}}:{type:'input_image',image_url:`/api/assets/${id}`})]:m.content});
      request={model:d.model,[isChat?'messages':'input']:messages.map(render),stream:false};
      if(params.maxOutputTokens)request[isChat&&/^gpt-[5-9]/.test(d.model)?'max_completion_tokens':isChat?'max_tokens':'max_output_tokens']=params.maxOutputTokens;
      if(params.temperature!==undefined)request.temperature=params.temperature;
    }
    return {messages,request,endpoint,imageReferences,transmittedPrompt,...(plan?{imageDelivery:plan}:{}),providerName:p.name,providerId:p.id,protocol:p.protocol,model:d.model,mode:d.mode,contextCount:Math.max(0,sources.length-1),attachmentCount:ids.size,assetIds:[...ids],attachments:[...ids].map(id=>({...state.asset[id],assetId:id})),currentAssetIds:hasMentions?imageReferences.map(i=>i.assetId):[...(d.assetIds||[])],sourceNodeIds:sources,workspaceId,nodeId,currentPrompt:d.prompt,transport,currency:p.currency||'USD',...(d.mode==='image'?{imagePricing:window.LightCanvasCosts.pricing(d.model)}:{}),inputPrice:p.inputPrice??null,outputPrice:p.outputPrice??null,imagePrice:p.imagePrice??null};
  }
  async function renderImage(blob,plan,index) {
    const original=await addAsset(blob,`generated-${index+1}-original.png`,blob.type||'image/png');
    const bmp=await createImageBitmap(blob);
    const actualSize=`${bmp.width}x${bmp.height}`;
    const warning=plan?.apiSize&&plan.apiSize!==actualSize?`接口返回 ${actualSize}，与请求 ${plan.apiSize} 不一致；已保留接口原图。`:null;
    const detail={originalAssetId:original.id,finalAssetId:original.id,originalName:original.name,originalMime:original.mime,finalName:original.name,finalMime:original.mime,sourceWidth:bmp.width,sourceHeight:bmp.height,width:bmp.width,height:bmp.height,method:'native',...(plan?{aspectRatio:plan.aspectRatio,resolution:plan.resolution,apiSize:plan.apiSize}:{}),...(warning?{warning}:{})};bmp.close();return detail;
  }

  function providerPrices(p){const num=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0?v:null;return{inputPrice:num(p?.inputPrice),outputPrice:num(p?.outputPrice),imagePrice:num(p?.imagePrice)}}
  function estimateRunCost(run,p){
    if(run.mode==='image'){const quote=window.LightCanvasCosts.quote(run,p);return [quote.cost,quote];}
    const prices=providerPrices(p),usage=run.usage||{};
    const input=usage.input_tokens??usage.prompt_tokens,output=usage.output_tokens??usage.completion_tokens;
    let cost=null,basis=null;
    if(typeof input==='number'&&typeof output==='number'&&(prices.inputPrice!=null||prices.outputPrice!=null)){
      cost=((prices.inputPrice!=null?input*prices.inputPrice:0)+(prices.outputPrice!=null?output*prices.outputPrice:0))/1e6;
      basis={inputTokens:input,inputPrice:prices.inputPrice,outputTokens:output,outputPrice:prices.outputPrice};
    }else if(run.mode==='image'&&prices.imagePrice!=null){
      const images=Math.max(1,run.imageDelivery?.length||run.assetIds?.length||1);
      cost=prices.imagePrice*images;basis={images,imagePrice:prices.imagePrice};
    }
    if(cost==null)return[null,null];
    return[Math.round(cost*1e6)/1e6,{...basis,currency:p?.currency||'USD'}];
  }
  async function runJob(run) {
    const p=state.provider[run.snapshot.providerId],key=keyFor(p),controller=new AbortController();active.set(run.id,controller);run.status='running';emitRun(run);
    try{
      const s=run.snapshot;if(p.protocol==='mock'){
        if(s.mode==='chat')run.text=`本地演示 · 未调用外部 API\n\n${s.currentPrompt}`;
        else {const canvas=document.createElement('canvas');const [w,h]=(s.imageDelivery?.apiSize||'256x256').split('x').map(Number);canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='#e5e7eb';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#333';ctx.font='18px sans-serif';ctx.fillText('Light Canvas',52,128);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));const detail=await renderImage(blob,s.imageDelivery,0);run.assetIds.push(detail.finalAssetId);run.imageDelivery=[detail]}
      }else{
        assert(key,'此接口尚未配置 API 密钥');let payload=s.request,body,headers={Accept:'application/json',Authorization:`Bearer ${key}`};
        if(s.transport==='multipart'){const form=new FormData();for(const [name,value] of Object.entries(payload))if(name!=='images')form.append(name,String(value));for(const image of payload.images){const blob=await loadAsset(image.assetId);form.append(payload.images.length===1?'image':'image[]',blob,image.name)}body=form}
        else{payload=clone(payload);const materialize=async value=>{if(typeof value==='string'&&value.startsWith('/api/assets/')){const id=value.split('/').pop(),a=state.asset[id],blob=await loadAsset(id);return `data:${a.mime};base64,${bytesToB64(await readBlob(blob))}`}if(Array.isArray(value))return Promise.all(value.map(materialize));if(value&&typeof value==='object'){for(const k of Object.keys(value))value[k]=await materialize(value[k])}return value};payload=await materialize(payload);body=JSON.stringify(payload);headers['Content-Type']='application/json'}
        const res=await nativeFetch(s.endpoint,{method:'POST',headers,body,signal:controller.signal});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(`API 返回 ${res.status}：${data.error?.message||data.message||'请检查模型和参数'}`);
        if(s.mode==='image'){
          assert(Array.isArray(data.data)&&data.data.length,'图片 API 没有返回图片');run.imageDelivery=[];
          for(const [i,item] of data.data.entries()){let blob;if(item.b64_json)blob=new Blob([b64ToBytes(item.b64_json)],{type:'image/png'});else if(item.url){const remote=await nativeFetch(item.url);assert(remote.ok,'无法下载 API 返回的图片');blob=await remote.blob()}else throw Error('图片 API 返回内容无效');const detail=await renderImage(blob,s.imageDelivery,i);run.assetIds.push(detail.finalAssetId);run.imageDelivery.push(detail);emitRun(run)}
        }else if(s.protocol==='chat-completions')run.text=data.choices?.[0]?.message?.content||'';
        else run.text=data.output_text||data.output?.flatMap(item=>item.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('')||'';
        run.usage=data.usage||null;
        run.currency=s.mode==='image'?'USD':p.currency||'USD';
        const[estimate,basis]=estimateRunCost(run,p);run.cost=estimate;run.costBasis=basis;
      }
      if(run.status!=='cancelled')run.status='completed';emitRun(run);
    }catch(e){if(run.status!=='cancelled'){run.status='failed';run.error=e.name==='AbortError'?'已停止请求':escapeKey(e);emitRun(run)}}finally{active.delete(run.id)}
  }
  async function backup(){const zip=new JSZip();zip.file('canvas.json',JSON.stringify(state));for(const id of Object.keys(state.asset))zip.file(`assets/${id}`,await loadAsset(id));return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}})}
  async function deleteGeneratedImage(runId, assetId) {
    const run=state.run[runId];
    assert(run?.mode==='image' && run.assetIds?.includes(assetId),'图片已删除或不是生成结果');
    assert(!active.size && !all('run').some(r=>r.status==='queued'||r.status==='running'),'请等待正在运行的任务结束，或停止任务后再永久删除图片');
    const detail=run.imageDelivery?.find(item=>item.finalAssetId===assetId||item.originalAssetId===assetId);
    const ids=new Set([assetId,detail?.originalAssetId,detail?.finalAssetId].filter(Boolean));
    assert(![...ids].some(id=>deletingAssets.has(id)),'图片正在删除，请稍候');
    for(const id of ids)deletingAssets.add(id);
    const copies=[];let before;
    try {
      await saveChain;
      await Promise.all([...imagePending].filter(([key])=>ids.has(key.slice(key.indexOf(':')+1))).map(([,promise])=>promise.catch(()=>{})));
      for(const id of ids)for(const [directory,name] of [[assetFolder,id],[thumbnailFolder,id+'.webp']])if(directory) {
        try { const file=await directory.getFileHandle(name);copies.push({directory,name,blob:await file.getFile()}); }
        catch(error){if(error.name!=='NotFoundError')throw error;}
      }
      for(const copy of copies)await copy.directory.removeEntry(copy.name);
      before=clone(state);
      const matches=value=>typeof value==='string'&&(ids.has(value)||[...ids].some(id=>value===`/api/assets/${id}`||value===`#lc-asset=${encodeURIComponent(id)}`));
      const strip=value=>{
        if(matches(value))return undefined;
        if(Array.isArray(value))return value.map(strip).filter(item=>item!==undefined);
        if(value&&typeof value==='object') {
          if(ids.has(value.assetId)||ids.has(value.id))return undefined;
          return Object.fromEntries(Object.entries(value).filter(([key])=>!ids.has(key)).map(([key,item])=>[key,strip(item)]).filter(([,item])=>item!==undefined));
        }
        return value;
      };
      const removedRuns=new Set();
      for(const [id,r] of Object.entries(state.run)) {
        const affected=(r.assetIds||[]).some(id=>ids.has(id));
        const cleaned=strip(r);
        if(r.imageDelivery)cleaned.imageDelivery=r.imageDelivery.filter(item=>!ids.has(item.originalAssetId)&&!ids.has(item.finalAssetId)).map(strip);
        if(affected&&!(cleaned.assetIds||[]).length){delete state.run[id];removedRuns.add(id);}
        else state.run[id]=cleaned;
      }
      for(const [id,w] of Object.entries(state.workspace)) {
        const cleaned=strip(w);
        const labels=Object.entries(w.imageLabels||{}).filter(([id])=>ids.has(id)).map(([,label])=>label);
        for(const n of cleaned.nodes)if(n.data?.prompt)for(const label of labels){const digits=/^图(\d+)$/.exec(label)?.[1];if(digits)n.data.prompt=n.data.prompt.replace(new RegExp('@(?:图片|图)'+digits+'(?!\\d)','g'),'');}
        cleaned.nodes=cleaned.nodes.filter(n=>!removedRuns.has(n.data?.runId)&&!(n.data?.kind==='image'&&!n.data.runId&&w.nodes.find(old=>old.id===n.id)?.data?.assetIds?.some(id=>ids.has(id))&&!n.data.assetIds?.length));
        const nodeIds=new Set(cleaned.nodes.map(n=>n.id));cleaned.edges=cleaned.edges.filter(edge=>nodeIds.has(edge.source)&&nodeIds.has(edge.target));
        cleaned.version=(w.version||0)+1;cleaned.updatedAt=now();state.workspace[id]=cleaned;
      }
      for(const id of removedRuns)delete state.preferences['reader:'+id];
      for(const id of ids)delete state.asset[id];
      await save();
      for(const id of ids){memoryAssets.delete(id);URL.revokeObjectURL(urls.get(id));urls.delete(id);for(const key of ['thumb:'+id,'original:'+id]){const entry=imageCache.get(key);if(entry)URL.revokeObjectURL(entry.url);imageCache.delete(key);}}
      return {ok:true,removedAssetCount:ids.size,removedRunCount:removedRuns.size};
    } catch(error) {
      if(before)state=before;
      let rollbackError;
      for(const copy of copies)try{await writeFile(await copy.directory.getFileHandle(copy.name,{create:true}),copy.blob)}catch(e){rollbackError=e;}
      if(before)try{await save()}catch(e){rollbackError=e;}
      if(rollbackError)throw Error('删除未能完成，恢复文件失败，请检查数据文件夹的写入权限后重试。');
      throw error;
    } finally {for(const id of ids)deletingAssets.delete(id);}
  }

  async function route(url,options={}){
    await ready;const path=String(url).startsWith('/api/')?String(url).split('?')[0]:new URL(url,location.href).pathname,method=(options.method||'GET').toUpperCase();let b={};if(typeof options.body==='string')try{b=JSON.parse(options.body)}catch{}
    if(path==='/api/bootstrap'){for(const w of all('workspace'))state.workspace[w.id]=window.LightCanvasImages.assign(w,state.run);return response({version:'__LC_APP_VERSION__-html',dataDir:folder?.name||'临时使用',token:'local-file',workspaces:all('workspace'),providers:all('provider').map(publicProvider),runs:all('run'),assets:all('asset')});}
    if(path==='/api/preferences'&&method==='GET')return response(state.preferences||{});
    if(path==='/api/preferences'&&method==='PUT'){state.preferences[b.key]=b.value;await save();return response(state.preferences)}
    if(path==='/api/workspaces'&&method==='POST'){const w={id:crypto.randomUUID(),name:String(b.name||'新画布'),version:0,nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},updatedAt:now()};state.workspace[w.id]=w;await save();return response(w,201)}
    let m;if(m=/^\/api\/workspaces\/([^/]+)$/.exec(path)){const id=m[1];if(method==='PUT'){assert(b.id===id,'画布标识不一致');b.version=(state.workspace[id]?.version||0)+1;b.updatedAt=now();b.imageLabels=window.LightCanvasImages.assign(b,state.run).imageLabels;state.workspace[id]=b;await save();return response(b)}if(method==='DELETE'){delete state.workspace[id];for(const r of all('run'))if(r.workspaceId===id)delete state.run[r.id];await save();return response({ok:true})}}
    if(m=/^\/api\/providers\/([^/]+)\/(sync-models|models)$/.exec(path)){const p=state.provider[m[1]];assert(p,'接口不存在');const key=keyFor(p);assert(key||p.protocol==='mock','请配置 API 密钥');if(p.protocol==='mock')return response({models:p.models||[],provider:publicProvider(p)});const res=await nativeFetch(providerEndpoint(p,'models'),{headers:{Authorization:`Bearer ${key}`}});const data=await res.json();if(!res.ok)throw Error(`模型列表请求失败 (${res.status})`);const models=window.LightCanvasModels.sort((data.data||[]).map(x=>x.id).filter(Boolean).filter(x=>p.protocol==='images'?/image|dall-e/i.test(x):!/image|dall-e|audio|tts|whisper|transcribe|realtime|embedding|moderation/i.test(x)));if(m[2]==='sync-models'){p.models=models;await save()}return response({models,provider:publicProvider(p)})}
    if(m=/^\/api\/providers\/([^/]+)$/.exec(path)){const id=m[1];if(method==='PUT'){if(b.clearKey)delete state.keys[id];if(b.apiKey)state.keys[id]=b.apiKey;delete b.apiKey;delete b.clearKey;state.provider[id]=b;await save();return response(publicProvider(b))}if(method==='DELETE'){delete state.provider[id];delete state.keys[id];await save();return response({ok:true})}}
    if(path==='/api/assets'&&method==='POST'){assert(b.base64,'图片数据为空');return response(await addAsset(new Blob([b64ToBytes(b.base64)],{type:b.mime||'image/png'}),b.name,b.mime),201)}
    if(m=/^\/api\/assets\/([^/]+)$/.exec(path))return new Response(await loadAsset(m[1]),{headers:{'Content-Type':state.asset[m[1]]?.mime||'application/octet-stream'}});
    if(m=/^\/api\/runs\/([^/]+)\/images\/([^/]+)$/.exec(path)) {assert(method==='DELETE','仅支持永久删除请求');return response(await deleteGeneratedImage(decodeURIComponent(m[1]),decodeURIComponent(m[2])));}
    if(path==='/api/preview'&&method==='POST')return response(context(b.workspaceId,b.nodeId));
    if(path==='/api/runs'&&method==='POST'){if(state.run[b.id])return response(state.run[b.id]);const snap=context(b.workspaceId,b.nodeId);const run={id:b.id,workspaceId:b.workspaceId,inputNodeId:b.nodeId,mode:snap.mode,status:'queued',text:'',assetIds:[],createdAt:now(),updatedAt:now(),model:snap.model,providerName:snap.providerName,usage:null,cost:null,currency:snap.currency,snapshot:snap,seq:1};state.run[run.id]=run;await save();queueMicrotask(()=>runJob(run));return response(run,201)}
    if(m=/^\/api\/runs\/([^/]+)\/cancel$/.exec(path)){const r=state.run[m[1]];assert(r,'任务不存在');r.status='cancelled';r.error='已停止本地等待，并尝试取消上游请求。';active.get(r.id)?.abort();emitRun(r);return response(r)}
    if(m=/^\/api\/runs\/([^/]+)$/.exec(path)){const r=state.run[m[1]];return r?response(r):failure('任务不存在',404)}
    if(path==='/api/backup'){return new Response(await backup(),{headers:{'Content-Type':'application/zip'}})}
    if(path==='/api/restore'&&method==='POST'){const zip=await JSZip.loadAsync(options.body);const imported=JSON.parse(await zip.file('canvas.json').async('string'));assert(imported.format==='light-canvas-html-v1','备份格式不匹配');const ids=[];for(const w of Object.values(imported.workspace)){const id=crypto.randomUUID();ids.push(id);state.workspace[id]={...w,id,name:`${w.name}（导入）`,version:0}}for(const [id,p] of Object.entries(imported.provider))if(!state.provider[id])state.provider[id]=p;for(const [id,a] of Object.entries(imported.asset)){if(!state.asset[id]){const file=zip.file(`assets/${id}`);if(file){const blob=await file.async('blob');if(assetFolder)await writeFile(await assetFolder.getFileHandle(id,{create:true}),blob);if(!assetFolder)memoryAssets.set(id,blob);state.asset[id]=a}}}await save();return response({workspaceIds:ids},201)}
    if(path==='/api/cleanup/preview'||path==='/api/cleanup'){const used=new Set();for(const w of all('workspace'))for(const n of w.nodes)for(const id of n.data?.assetIds||[])used.add(id);for(const r of all('run')){for(const id of r.assetIds||[])used.add(id);for(const id of r.snapshot?.assetIds||[])used.add(id);for(const a of r.snapshot?.attachments||[])used.add(a.assetId||a.id);for(const item of r.imageDelivery||[]) {if(item.originalAssetId)used.add(item.originalAssetId);if(item.finalAssetId)used.add(item.finalAssetId);}}const removable=all('asset').filter(a=>!used.has(a.id));if(path==='/api/cleanup'){for(const a of removable){delete state.asset[a.id];memoryAssets.delete(a.id);URL.revokeObjectURL(urls.get(a.id));urls.delete(a.id);if(assetFolder)await assetFolder.removeEntry(a.id).catch(()=>{});if(thumbnailFolder)await thumbnailFolder.removeEntry(a.id+'.webp').catch(()=>{})}await save()}return response({assetCount:removable.length,bytes:removable.reduce((n,a)=>n+a.size,0),removedAssetCount:path==='/api/cleanup'?removable.length:0})}
    return failure('本地接口不存在',404);
  }
  window.fetch=(url,options)=>String(url).startsWith('/api/')?route(url,options).catch(e=>failure(escapeKey(e))):nativeFetch(url,options);
  window.__lcBackend={ready,route,backup,getState:()=>state,loadAsset};
})();
