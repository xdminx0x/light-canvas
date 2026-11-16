/* Light Canvas local-file backend. All state and image bytes live in the chosen folder. */
(() => {
  'use strict';
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
  let readyResolve;
  const ready = new Promise(resolve => { readyResolve = resolve; });
  const eventBus = new EventTarget();
  const now = () => new Date().toISOString();
  const clone = value => structuredClone(value);
  const response = (value, code = 200) => new Response(JSON.stringify(value), {status: code, headers: {'Content-Type': 'application/json; charset=utf-8'}});
  const failure = (message, code = 400) => response({error: message}, code);
  const all = kind => Object.values(state[kind] || {});
  const keyFor = provider => state.keys[provider.id] || (provider.apiKeyEnv && state.envKeys[provider.apiKeyEnv]) || '';
  const publicProvider = p => ({...p, hasKey: !!keyFor(p), keyHint: keyFor(p) ? '已配置' : ''});
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
    const popup=anchor.hasAttribute('download')?null:window.open('about:blank','_blank');
    try {
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
    await saveHandle(folder).catch(()=>{});
    gate.hidden = true; readyResolve();
  }
  async function startMemory() {
    state = clone(seed.state);
    for (const [id,b64] of Object.entries(seed.assets)) memoryAssets.set(id,new Blob([b64ToBytes(b64)],{type:state.asset[id]?.mime || 'application/octet-stream'}));
    gate.hidden = true; readyResolve();
  }
  pickButton.addEventListener('click', async () => {
    try {
      if (!window.showDirectoryPicker) { status.textContent = '此浏览器不能直接保存到文件夹。请用最新版 Chrome 或 Edge 打开。'; return; }
      status.textContent = '正在连接文件夹并导入现有画布…';
      const handle = await showDirectoryPicker({id:'light-canvas-data',mode:'readwrite'});
      await installFolder(handle);
    } catch (e) { status.textContent = e.name === 'AbortError' ? '尚未选择文件夹。' : `连接失败：${e.message}`; }
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
  function imagePlan(model,params) {
    const ratio=params.imageAspectRatio||'auto', tier=params.imageResolution||'auto';
    if (tier==='auto' && ratio==='auto') return null;
    const edge={ '1k':1024,'2k':2048,'4k':3840 }[tier==='auto'?'1k':tier];
    const parts=ratio==='auto'?null:ratio.split(':').map(Number);
    const r=parts?parts[0]/parts[1]:1;
    const target=parts ? r>=1?{width:edge,height:Math.round(edge/r)}:{width:Math.round(edge*r),height:edge}:null;
    const requestedSize=target?`${target.width}x${target.height}`:'auto';
    const flexible=/^gpt-image-2(?:$|[.5-])/.test(model) && !/^gpt-image-2\.6/.test(model);
    const valid=s=>{const [w,h]=s.split('x').map(Number);return w%16===0&&h%16===0&&Math.max(w,h)<=3840&&Math.max(w,h)/Math.min(w,h)<=3&&w*h>=655360&&w*h<=8294400};
    let apiSize=requestedSize;
    if (target && (!flexible||!valid(requestedSize))) apiSize=r===1?'1024x1024':r>1?'1536x1024':'1024x1536';
    if (!target) apiSize='auto';
    return {aspectRatio:ratio,resolution:tier==='auto'?'1k':tier,requestedSize,apiSize,method:requestedSize===apiSize?'native':'local-resize',verified:flexible,note:requestedSize===apiSize?'直接使用模型原生尺寸。':'API 返回后本地调整尺寸，保留原图；不会再次调用 API。'};
  }
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
    return {messages,request,endpoint,imageReferences,transmittedPrompt,...(plan?{imageDelivery:plan}:{}),providerName:p.name,providerId:p.id,protocol:p.protocol,model:d.model,mode:d.mode,contextCount:Math.max(0,sources.length-1),attachmentCount:ids.size,assetIds:[...ids],attachments:[...ids].map(id=>({...state.asset[id],assetId:id})),currentAssetIds:hasMentions?imageReferences.map(i=>i.assetId):[...(d.assetIds||[])],sourceNodeIds:sources,workspaceId,nodeId,currentPrompt:d.prompt,transport,currency:p.currency||'USD'};
  }
  async function renderImage(blob,plan,index) {
    const original=await addAsset(blob,`generated-${index+1}-original.png`,blob.type||'image/png');
    const bmp=await createImageBitmap(blob);const edge={'1k':1024,'2k':2048,'4k':3840}[plan?.resolution];let target;
    if(edge){let ratio=plan.aspectRatio==='auto'?bmp.width/bmp.height:Number(plan.aspectRatio.split(':')[0])/Number(plan.aspectRatio.split(':')[1]);target=ratio>=1?{width:edge,height:Math.round(edge/ratio)}:{width:Math.round(edge*ratio),height:edge}}
    let final=original,method='native';
    if(target&&(target.width!==bmp.width||target.height!==bmp.height)){
      const canvas=document.createElement('canvas');canvas.width=target.width;canvas.height=target.height;const ctx=canvas.getContext('2d');const scale=Math.min(target.width/bmp.width,target.height/bmp.height);const width=Math.round(bmp.width*scale),height=Math.round(bmp.height*scale);ctx.drawImage(bmp,Math.round((target.width-width)/2),Math.round((target.height-height)/2),width,height);
      const result=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));final=await addAsset(result,`generated-${index+1}-${plan.resolution}-${target.width}x${target.height}.png`,'image/png');method='local-resize';
    }
    const detail={originalAssetId:original.id,finalAssetId:final.id,originalName:original.name,originalMime:original.mime,finalName:final.name,finalMime:final.mime,sourceWidth:bmp.width,sourceHeight:bmp.height,width:target?.width||bmp.width,height:target?.height||bmp.height,method,...(plan?{aspectRatio:plan.aspectRatio,resolution:plan.resolution,apiSize:plan.apiSize}:{})};bmp.close();return detail;
  }
  async function runJob(run) {
    const p=state.provider[run.snapshot.providerId],key=keyFor(p),controller=new AbortController();active.set(run.id,controller);run.status='running';emitRun(run);
    try{
      const s=run.snapshot;if(p.protocol==='mock'){
        if(s.mode==='chat')run.text=`本地演示 · 未调用外部 API\n\n${s.currentPrompt}`;
        else {const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#e5e7eb';ctx.fillRect(0,0,256,256);ctx.fillStyle='#333';ctx.font='18px sans-serif';ctx.fillText('Light Canvas',52,128);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));const detail=await renderImage(blob,s.imageDelivery,0);run.assetIds.push(detail.finalAssetId);run.imageDelivery=[detail]}
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
      }
      if(run.status!=='cancelled')run.status='completed';emitRun(run);
    }catch(e){if(run.status!=='cancelled'){run.status='failed';run.error=e.name==='AbortError'?'已停止请求':escapeKey(e);emitRun(run)}}finally{active.delete(run.id)}
  }
  async function backup(){const zip=new JSZip();zip.file('canvas.json',JSON.stringify(state));for(const id of Object.keys(state.asset))zip.file(`assets/${id}`,await loadAsset(id));return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}})}
  async function route(url,options={}){
    await ready;const path=String(url).startsWith('/api/')?String(url).split('?')[0]:new URL(url,location.href).pathname,method=(options.method||'GET').toUpperCase();let b={};if(typeof options.body==='string')try{b=JSON.parse(options.body)}catch{}
    if(path==='/api/bootstrap'){for(const w of all('workspace'))state.workspace[w.id]=window.LightCanvasImages.assign(w,state.run);return response({version:'2.2.0-html',dataDir:folder?.name||'临时使用',token:'local-file',workspaces:all('workspace'),providers:all('provider').map(publicProvider),runs:all('run'),assets:all('asset')});}
    if(path==='/api/preferences'&&method==='GET')return response(state.preferences||{});
    if(path==='/api/preferences'&&method==='PUT'){state.preferences[b.key]=b.value;await save();return response(state.preferences)}
    if(path==='/api/workspaces'&&method==='POST'){const w={id:crypto.randomUUID(),name:String(b.name||'新画布'),version:0,nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},updatedAt:now()};state.workspace[w.id]=w;await save();return response(w,201)}
    let m;if(m=/^\/api\/workspaces\/([^/]+)$/.exec(path)){const id=m[1];if(method==='PUT'){assert(b.id===id,'画布标识不一致');b.version=(state.workspace[id]?.version||0)+1;b.updatedAt=now();b.imageLabels=window.LightCanvasImages.assign(b,state.run).imageLabels;state.workspace[id]=b;await save();return response(b)}if(method==='DELETE'){delete state.workspace[id];for(const r of all('run'))if(r.workspaceId===id)delete state.run[r.id];await save();return response({ok:true})}}
    if(m=/^\/api\/providers\/([^/]+)\/(sync-models|models)$/.exec(path)){const p=state.provider[m[1]];assert(p,'接口不存在');const key=keyFor(p);assert(key||p.protocol==='mock','请配置 API 密钥');if(p.protocol==='mock')return response({models:p.models||[],provider:publicProvider(p)});const res=await nativeFetch(providerEndpoint(p,'models'),{headers:{Authorization:`Bearer ${key}`}});const data=await res.json();if(!res.ok)throw Error(`模型列表请求失败 (${res.status})`);const models=(data.data||[]).map(x=>x.id).filter(Boolean).filter(x=>p.protocol==='images'?/image|dall-e/i.test(x):!/image|dall-e|audio|tts|whisper|transcribe|realtime|embedding|moderation/i.test(x));if(m[2]==='sync-models'){p.models=models;await save()}return response({models,provider:publicProvider(p)})}
    if(m=/^\/api\/providers\/([^/]+)$/.exec(path)){const id=m[1];if(method==='PUT'){if(b.clearKey)delete state.keys[id];if(b.apiKey)state.keys[id]=b.apiKey;delete b.apiKey;delete b.clearKey;state.provider[id]=b;await save();return response(publicProvider(b))}if(method==='DELETE'){delete state.provider[id];delete state.keys[id];await save();return response({ok:true})}}
    if(path==='/api/assets'&&method==='POST'){assert(b.base64,'图片数据为空');return response(await addAsset(new Blob([b64ToBytes(b.base64)],{type:b.mime||'image/png'}),b.name,b.mime),201)}
    if(m=/^\/api\/assets\/([^/]+)$/.exec(path))return new Response(await loadAsset(m[1]),{headers:{'Content-Type':state.asset[m[1]]?.mime||'application/octet-stream'}});
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
