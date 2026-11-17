import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));await page.route('https://**',r=>r.abort());
 await page.addInitScript(()=>{
  const files=new Map();window.controlFiles=files;window.externalCalls=0;
  const dir=(prefix='')=>({name:'data',queryPermission:async()=> 'granted',getDirectoryHandle:async name=>dir(prefix+name+'/'),getFileHandle:async(name,opts={})=>{const key=prefix+name;if(!opts.create&&!files.has(key))throw Error('missing');return {getFile:async()=>files.get(key),createWritable:async()=>({write:async value=>files.set(key,new Blob([value])),close:async()=>{}})}},removeEntry:async name=>files.delete(prefix+name)});window.showDirectoryPicker=async()=>dir();
  const native=window.fetch.bind(window);window.fetch=(url,init)=>{if(String(url).startsWith('https://'))window.externalCalls++;return native(url,init)};
 });
 await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 await page.evaluate(async()=>{
  const node=(id,x,y,data)=>({id,type:'canvas',position:{x,y},data:{prompt:'',params:{},assetIds:[],...data}}),canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;canvas.getContext('2d').fillRect(0,0,640,360);const blob=await new Promise(r=>canvas.toBlob(r));
  for(const id of ['ref','first','second'])window.controlFiles.set('assets/'+id,blob);
  const run=(id,asset,date)=>({id,workspaceId:'w',inputNodeId:'input',mode:'image',status:'completed',providerName:'Images test',model:'gpt-image-2',createdAt:date,updatedAt:date,assetIds:[asset],text:'',snapshot:{currentPrompt:'Prompt '+id},imageDelivery:[{finalAssetId:asset,finalName:asset+'.png',method:'native',width:640,height:360}]});
  const state={format:'light-canvas-html-v1',workspace:{w:{id:'w',name:'Controls test',nodes:[node('input',500,100,{kind:'input',mode:'image',providerId:'test',model:'gpt-image-2',prompt:'Original prompt',params:{imageAspectRatio:'16:9',imageResolution:'1k'}}),node('ref',70,100,{kind:'image',label:'Reference',assetIds:['ref']}),node('result',950,100,{kind:'image',label:'Result',runId:'r1'})],edges:[],version:0,viewport:{x:0,y:0,zoom:1}}},provider:{test:{id:'test',name:'Images test',protocol:'images',baseUrl:'https://mock.invalid/v1',models:['gpt-image-2','gpt-image-2.6-flare'],imageEdit:true}},asset:Object.fromEntries(['ref','first','second'].map(id=>[id,{id,name:id+'.png',mime:'image/png',size:blob.size}])),run:{r1:run('r1','first','2026-11-16T00:00:00Z'),r2:run('r2','second','2026-11-17T00:00:00Z'),orphan:{id:'orphan',workspaceId:'w',inputNodeId:'old-input',mode:'image',status:'running',createdAt:'2026-11-17T01:00:00Z',updatedAt:'2026-11-17T01:00:00Z',seq:2,assetIds:[],text:'',snapshot:{currentPrompt:'preserved original'}}},keys:{test:'test-placeholder'},envKeys:{},preferences:{}};
  window.controlFiles.set('canvas.json',new Blob([JSON.stringify(state)]));
 });
 await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();
 const recovery=await page.evaluate(async()=>JSON.parse(await window.controlFiles.get('canvas.json').text()).run.orphan);
 assert.equal(recovery.status,'unknown');assert.equal(recovery.seq,3);assert.equal(recovery.snapshot.currentPrompt,'preserved original');assert.equal(recovery.assetIds.length,0);assert.ok(recovery.error.includes('重新加载'));
 const input=page.locator('[data-id="input"]'),result=page.locator('[data-id="result"]'),ref=page.locator('[data-id="ref"]');
 // Detail is the native quality parameter, reflected in the collapsed summary.
 await input.getByLabel('模型与图片设置',{exact:true}).click();await input.getByLabel('细节等级',{exact:true}).selectOption('high');
 await page.waitForFunction(()=>window.__lcBackend.getState().workspace.w.nodes.find(n=>n.id==='input').data.params.quality==='high');
 const plan=await page.evaluate(()=>fetch('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:'w',nodeId:'input'})}).then(r=>r.json()));assert.equal(plan.request.quality,'high');assert.equal(plan.request.prompt,'Original prompt');assert.ok(await input.locator('.node-configuration-current').textContent().then(t=>t.includes('细节 高')));
 const options=await input.getByLabel('细节等级',{exact:true}).locator('option').evaluateAll(o=>o.map(x=>x.value));assert.deepEqual(options,['','auto','low','medium','high']);
 await input.getByLabel('节点模型',{exact:true}).selectOption('test::gpt-image-2.6-flare');assert.ok((await input.getByLabel('细节等级',{exact:true}).locator('option').evaluateAll(o=>o.map(x=>x.value))).includes('max'));await input.getByLabel('节点模型',{exact:true}).selectOption('test::gpt-image-2');await input.getByLabel('模型与图片设置',{exact:true}).click();
 // Existing click-to-open remains, while the selected frame becomes visibly darker.
 await page.mouse.click(1360,850);await page.waitForFunction(()=>!document.querySelector('[data-id="result"] .canvas-card')?.classList.contains('is-selected'));
 const ordinary=await result.locator('.canvas-card').evaluate(e=>getComputedStyle(e).backgroundColor);
 await result.locator('.image-preview').click();await page.locator('.image-result-caption').waitFor();await page.getByRole('button',{name:'关闭阅读窗',exact:true}).click();
 assert.equal(await result.locator('.canvas-card').evaluate(e=>e.classList.contains('is-selected')),true);assert.notEqual(await result.locator('.canvas-card').evaluate(e=>getComputedStyle(e).backgroundColor),ordinary);
 const popupPromise=page.waitForEvent('popup');await ref.locator('.reference-image-preview').click();const popup=await popupPromise;await popup.waitForURL(url=>url.protocol==='blob:');await popup.close();assert.equal(await ref.locator('.canvas-card').evaluate(e=>e.classList.contains('is-selected')),true);
 if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/image-selection.png'});
 // Gallery arrows cross generation runs, clamp at either end and preserve matching details.
 await page.getByRole('button',{name:'生图历史',exact:true}).click();await page.getByRole('button',{name:'查看图片结果：first.png',exact:true}).click();await page.locator('.image-result-caption').waitFor();
 assert.equal(await page.getByRole('button',{name:'下一张图片',exact:true}).isDisabled(),true);await page.keyboard.press('ArrowLeft');await page.waitForFunction(()=>document.querySelector('.image-result-caption>span')?.textContent==='second.png');
 assert.equal(await page.locator('.generation-prompt').textContent(),'Prompt r2');assert.equal(await page.getByRole('button',{name:'上一张图片',exact:true}).isDisabled(),true);await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.image-result-caption>span').textContent(),'second.png');
 await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.image-result-caption>span')?.textContent==='first.png');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.image-result-caption>span').textContent(),'first.png');
 await page.getByRole('button',{name:'上一张图片',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.image-result-caption>span')?.textContent==='second.png');
 await page.evaluate(()=>{const input=document.createElement('input');input.id='keyboard-test';document.querySelector('.lc-reader').append(input);input.focus()});await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.image-result-caption>span').textContent(),'second.png');await page.locator('#keyboard-test').evaluate(e=>e.remove());
 await page.setViewportSize({width:390,height:844});assert.equal(await page.locator('.history-viewer-navigation').evaluate(e=>e.scrollWidth<=e.clientWidth),true);
 if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/history-navigation.png'});
 await page.getByRole('button',{name:'关闭阅读窗',exact:true}).click();await page.locator('.image-history-grid').waitFor();assert.equal(await page.locator('.history-result').count(),2);
 assert.equal(await page.evaluate(()=>window.externalCalls),0,'opening, navigation and recovery never resend an API request');assert.deepEqual(errors,[]);
 console.log('Image controls passed: quality payload/capabilities/summary, click-to-open with darker selection, cross-run gallery arrows and boundaries, editable-field guard, responsive navigation, interrupted-run recovery without resubmission.');
}finally{await browser.close()}
