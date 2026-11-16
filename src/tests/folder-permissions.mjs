const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import {pathToFileURL,fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{
  const files=new Map();window.permissionFiles=files;window.permissionMode='abort';window.permissionRequests=0;
  Object.defineProperty(window,'indexedDB',{configurable:true,value:{open:()=>({})}}); // Blocked browser storage must not block a manually selected folder.
  const dir=(prefix='')=>({
   name:'data',queryPermission:async()=> 'prompt',
   requestPermission:async()=>{window.permissionRequests++;return window.permissionMode==='denied'?'denied':'granted'},
   getDirectoryHandle:async name=>{if(window.permissionMode==='disk-error')throw new DOMException('disk write failed','NotReadableError');return dir(prefix+name+'/')},
   getFileHandle:async(name,opts={})=>{
    const key=prefix+name;if(!opts.create&&!files.has(key))throw new DOMException('not found','NotFoundError');
    return {getFile:async()=>files.get(key),createWritable:async()=>({write:async data=>files.set(key,new Blob([data])),close:async()=>{}})};
   }
  });
  window.showDirectoryPicker=async()=>{if(window.permissionMode==='abort')throw new DOMException('cancelled or not authorized','AbortError');return dir()};
 });
 await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 const pick=page.getByRole('button',{name:'选择数据文件夹',exact:true}),status=page.locator('#folder-status');
 await pick.click();await page.waitForFunction(()=>document.querySelector('#folder-status').textContent.includes('未完成文件夹选择或读写授权'));assert.equal(await page.locator('.app-shell').count(),0);
 await page.evaluate(()=>{window.permissionMode='denied'});await pick.click();await page.waitForFunction(()=>document.querySelector('#folder-status').textContent.includes('没有取得文件夹的读写权限'));assert.equal(await page.evaluate(()=>window.permissionFiles.size),0);assert.equal(await page.evaluate(()=>window.permissionRequests),1);
 await page.evaluate(()=>{window.permissionMode='disk-error'});await pick.click();await page.waitForFunction(()=>document.querySelector('#folder-status').textContent.includes('NotReadableError'));assert.ok((await status.textContent()).includes('创建或读取数据失败'));
 await page.evaluate(()=>{window.permissionMode='granted'});await pick.click();await page.locator('.app-shell').waitFor({timeout:8000});
 assert.equal(await page.evaluate(()=>window.permissionFiles.has('canvas.json')),true);assert.equal(await page.evaluate(()=>window.__lcBackend.getState().format==='light-canvas-html-v1'),true);assert.deepEqual(errors,[]);
 // A failed folder connection can still fall back to a genuine memory-only session.
 const fallback=await browser.newPage();fallback.on('dialog',d=>d.accept());await fallback.addInitScript(()=>{window.showDirectoryPicker=async()=>({name:'data',getDirectoryHandle:async()=>{throw new DOMException('denied','NotAllowedError')}})});await fallback.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);await fallback.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await fallback.waitForFunction(()=>document.querySelector('#folder-status').textContent.includes('没有取得文件夹'));
 await fallback.getByRole('button',{name:'临时打开',exact:true}).click();await fallback.locator('.app-shell').waitFor();const response=await fallback.evaluate(()=>fetch('/api/workspaces',{method:'POST',body:JSON.stringify({name:'Memory fallback'})}).then(async r=>({ok:r.ok,data:await r.json()})));assert.equal(response.ok,true);assert.equal(response.data.name,'Memory fallback');
 console.log('Folder permissions passed: cancelled/denied/write-error messages, retry, empty folder creation, stalled IndexedDB tolerance and memory fallback.');
}finally{await browser.close()}
