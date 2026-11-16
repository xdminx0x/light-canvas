const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));await page.route('https://**',r=>r.abort());
await page.addInitScript(()=>{
 const files=new Map();window.historyFiles=files;
 const dir=(prefix='')=>({name:'data',queryPermission:async()=> 'granted',getDirectoryHandle:async name=>dir(prefix+name+'/'),getFileHandle:async(name,opts={})=>{const key=prefix+name;if(!opts.create&&!files.has(key))throw Error('missing');return {getFile:async()=>files.get(key),createWritable:async()=>({write:async value=>files.set(key,new Blob([value])),close:async()=>{}})}},removeEntry:async name=>files.delete(prefix+name)});
 window.showDirectoryPicker=async()=>dir();
});
await page.goto(pathToFileURL(fileURLToPath(new URL('../../轻画布.html',import.meta.url))).href);
await page.evaluate(async()=>{
 const c=document.createElement('canvas');c.width=c.height=64;c.getContext('2d').fillRect(0,0,64,64);const blob=await new Promise(r=>c.toBlob(r));
 for(const id of ['ref','result','original'])window.historyFiles.set('assets/'+id,blob);
 const run={id:'run1',workspaceId:'w',mode:'image',status:'completed',text:'',model:'demo-image',providerName:'本地演示',createdAt:'2026-11-16T02:00:00Z',assetIds:['result'],snapshot:{transmittedPrompt:'请按照参考图生成一只兔子',assetIds:['ref'],attachments:[{assetId:'ref',name:'兔子参考.png'}]},imageDelivery:[{originalAssetId:'original',finalAssetId:'result',finalName:'兔子结果.png'}]};
 const state={format:'light-canvas-html-v1',workspace:{w:{id:'w',name:'历史测试',nodes:[{id:'n',type:'canvas',position:{x:0,y:0},data:{kind:'image',label:'结果',runId:'run1'}}],edges:[],version:0}},provider:{},run:{run1:run,other:{...run,id:'other',workspaceId:'other',snapshot:{currentPrompt:'其他画布提示词'}}},asset:Object.fromEntries(['ref','result','original'].map(id=>[id,{id,mime:'image/png',name:id==='result'?'兔子结果.png':'兔子参考.png'}])),keys:{},envKeys:{},preferences:{}};
 window.historyFiles.set('canvas.json',new Blob([JSON.stringify(state)]));
});
await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();
await page.getByRole('button',{name:'生图历史',exact:true}).click();
await page.getByText('请按照参考图生成一只兔子',{exact:true}).waitFor();assert.equal(await page.getByText('其他画布提示词').count(),0);
assert.equal(await page.locator('.generation-references figcaption').textContent(),'兔子参考.png');
await page.locator('.generation-references img').evaluate(img=>new Promise((resolve,reject)=>{if(img.complete&&img.naturalWidth)resolve();else{img.onload=resolve;img.onerror=reject}}));
if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/history-desktop.png'});
await page.getByRole('button',{name:'展开图片结果',exact:true}).click();await page.locator('.lc-reader .generation-prompt').waitFor();assert.equal(await page.locator('.lc-reader .generation-references figcaption').textContent(),'兔子参考.png');
await page.getByRole('button',{name:'关闭阅读窗',exact:true}).click();
await page.evaluate(async()=>{const s=window.__lcBackend.getState();await fetch('/api/workspaces/w',{method:'PUT',body:JSON.stringify({...s.workspace.w,nodes:[],edges:[]})});await fetch('/api/cleanup',{method:'POST'});});
const saved=await page.evaluate(async()=>Promise.all([...window.historyFiles].map(async([name,blob])=>[name,[...new Uint8Array(await blob.arrayBuffer())]])));
await page.addInitScript(saved=>{for(const [name,bytes] of saved)window.historyFiles.set(name,new Blob([new Uint8Array(bytes)]));},saved);
await page.reload();await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();
await page.getByRole('button',{name:'生图历史',exact:true}).click();await page.locator('.history-result').waitFor();
assert.equal(await page.locator('.image-history-entry').count(),1);assert.equal(await page.evaluate(()=>window.historyFiles.has('assets/ref')&&window.historyFiles.has('assets/original')),true);
await page.setViewportSize({width:600,height:850});await page.locator('.generation-references img').evaluate(img=>new Promise(resolve=>{if(img.complete&&img.naturalWidth)resolve();else img.onload=resolve}));if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/history-narrow.png'});assert.deepEqual(errors,[]);console.log('Image history: scope, prompt, thumbnails, reader, deletion/reload and cleanup preservation passed');
}finally{await browser.close()}
