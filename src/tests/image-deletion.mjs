const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**',r=>r.abort());
 await page.addInitScript(()=>{
  const files=new Map();window.deleteTestFiles=files;
  const dir=(prefix='')=>({name:'data',getDirectoryHandle:async n=>dir(prefix+n+'/'),getFileHandle:async(n,o={})=>{const key=prefix+n;if(!o.create&&!files.has(key))throw new DOMException('missing','NotFoundError');return {getFile:async()=>files.get(key),createWritable:async()=>({write:async value=>files.set(key,new Blob([value])),close:async()=>{}})}},removeEntry:async n=>{if(window.failDeleteName===n){window.failDeleteName=null;throw new DOMException('denied','NotAllowedError')}if(!files.has(prefix+n))throw new DOMException('missing','NotFoundError');files.delete(prefix+n)}});
  window.showDirectoryPicker=async()=>dir();
 });
 await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 await page.evaluate(async()=>{
  const c=document.createElement('canvas');c.width=c.height=64;c.getContext('2d').fillRect(0,0,64,64);const image=await new Promise(resolve=>c.toBlob(resolve));
  const ids=['image-one','image-one-original','image-two','reference-image','other-image'];for(const id of ids){window.deleteTestFiles.set('assets/'+id,image);window.deleteTestFiles.set('thumbnails/'+id+'.webp',image)}
  const run={id:'r1',workspaceId:'w',mode:'image',status:'completed',text:'',model:'test-image',providerName:'Test',createdAt:'2026-11-16T02:00:00Z',assetIds:['image-one','image-two'],imageDelivery:[{originalAssetId:'image-one-original',finalAssetId:'image-one',finalName:'one.png'},{originalAssetId:'image-two',finalAssetId:'image-two',finalName:'two.png'}],snapshot:{assetIds:['reference-image'],attachments:[{assetId:'reference-image',name:'reference.png'}],currentPrompt:'test prompt'}};
  const nodes=[{id:'result-node',type:'canvas',position:{x:100,y:100},data:{kind:'image',runId:'r1',label:'Result'}},{id:'ref-node',type:'canvas',position:{x:400,y:100},data:{kind:'image',assetIds:['image-one'],label:'Reference'}},{id:'prompt-node',type:'canvas',position:{x:700,y:100},data:{kind:'input',mode:'image',prompt:'参考 @图1',assetIds:['image-one'],label:'Input',params:{}}}];
  const state={format:'light-canvas-html-v1',workspace:{w:{id:'w',name:'Deletion test',nodes,edges:[{id:'e',source:'ref-node',target:'prompt-node'}],viewport:{x:0,y:0,zoom:1},version:0,imageLabels:{'image-one':'图1','image-two':'图2'}},w2:{id:'w2',name:'Other canvas',nodes:[{id:'other-ref',type:'canvas',position:{x:0,y:0},data:{kind:'image',assetIds:['image-one-original'],label:'Reference'}}],edges:[],version:0}},provider:{},run:{r1:run,r2:{...run,id:'r2',workspaceId:'w2',assetIds:['other-image'],imageDelivery:[],snapshot:{assetIds:['image-one'],attachments:[{assetId:'image-one',name:'one.png'}],messages:[{assetIds:['image-one']}]}}},asset:Object.fromEntries(ids.map(id=>[id,{id,mime:'image/png',name:id==='image-one'?'one.png':id==='image-two'?'two.png':id+'.png'}])),keys:{},envKeys:{},preferences:{'reader:r1':{top:1}}};
  window.deleteTestFiles.set('canvas.json',new Blob([JSON.stringify(state)]));
 });
 await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();await page.getByRole('button',{name:'生图历史',exact:true}).click();
 const removeOne=()=>page.getByRole('button',{name:'永久删除图片：one.png',exact:true});
 page.once('dialog',d=>d.dismiss());await removeOne().click();assert.equal(await page.locator('.history-result').count(),2);
 const blocked=await page.evaluate(async()=>{const state=window.__lcBackend.getState();state.run.busy={id:'busy',status:'running'};const r=await fetch('/api/runs/r1/images/image-one',{method:'DELETE'});delete state.run.busy;return r.status});assert.equal(blocked,400);
 // Simulate a filesystem failure after the first file has been removed; all bytes and records must be restored.
 await page.evaluate(()=>{window.failDeleteName='image-one-original'});page.once('dialog',d=>d.accept());await removeOne().click();await page.locator('.history-delete-error').waitFor();
 assert.equal(await page.locator('.history-result').count(),2);assert.equal(await page.evaluate(()=>window.deleteTestFiles.has('assets/image-one')&&window.deleteTestFiles.has('assets/image-one-original')),true);
 page.once('dialog',d=>d.accept());await removeOne().click();await page.waitForFunction(()=>document.querySelectorAll('.history-result').length===1);
 const first=await page.evaluate(async()=>({state:JSON.parse(await window.deleteTestFiles.get('canvas.json').text()),files:[...window.deleteTestFiles.keys()],undoDisabled:document.querySelector('[aria-label="撤销"]').disabled}));
 assert.deepEqual(first.state.run.r1.assetIds,['image-two']);assert.equal(first.state.run.r1.imageDelivery.length,1);assert.equal(first.state.run.r1.imageDelivery[0].finalName,'two.png');
 assert.ok(!JSON.stringify(first.state).includes('image-one'));assert.ok(!first.files.some(n=>n.includes('image-one')));assert.ok(first.files.includes('assets/reference-image'));assert.equal(first.undoDisabled,true);assert.equal(first.state.workspace.w.nodes.find(n=>n.id==='prompt-node').data.prompt,'参考 ');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'永久删除图片：two.png',exact:true}).click();await page.getByText('还没有生成的图片',{exact:true}).waitFor();
 const last=await page.evaluate(async()=>({state:JSON.parse(await window.deleteTestFiles.get('canvas.json').text()),files:[...window.deleteTestFiles.keys()]}));assert.equal(last.state.run.r1,undefined);assert.equal(last.state.preferences['reader:r1'],undefined);assert.ok(!last.state.workspace.w.nodes.some(n=>n.id==='result-node'));assert.ok(last.state.run.r2);assert.ok(last.files.includes('assets/reference-image'));assert.ok(!last.files.some(n=>n.includes('image-two')));
 // Saved state is authoritative after reopening the folder.
 const saved=await page.evaluate(async()=>Promise.all([...window.deleteTestFiles].map(async([name,blob])=>[name,[...new Uint8Array(await blob.arrayBuffer())]])));
 await page.addInitScript(saved=>{for(const [name,bytes] of saved)window.deleteTestFiles.set(name,new Blob([new Uint8Array(bytes)]));},saved);await page.reload();await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.getByRole('button',{name:'生图历史',exact:true}).click();await page.getByText('还没有生成的图片',{exact:true}).waitFor();assert.deepEqual(errors,[]);
 console.log('Image deletion passed: cancel, rollback, source/final/thumbnail files, records, shared references, sibling results, undo reset and persistence.');
}finally{await browser.close()}
