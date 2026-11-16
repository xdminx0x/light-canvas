const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import {pathToFileURL,fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER||undefined,headless:true});
try {
 const page=await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://**',r=>r.abort());
 await page.addInitScript(()=>{
  const files=new Map();window.testFiles=files;window.assetReads=0;
  const dir=(prefix='')=>({name:'Test',getDirectoryHandle:async n=>dir(prefix+n+'/'),getFileHandle:async(n,o={})=>{const k=prefix+n;if(!o.create&&!files.has(k))throw Error('missing');return {getFile:async()=>{if(k.startsWith('assets/'))window.assetReads++;return files.get(k)},createWritable:async()=>({write:async d=>files.set(k,new Blob([d])),close:async()=>{}})}},removeEntry:async n=>files.delete(prefix+n)});
  window.showDirectoryPicker=async()=>dir();
 });
 await page.goto(pathToFileURL(process.argv[2]||fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 await page.evaluate(async()=>{
  const state={format:'light-canvas-html-v1',workspace:{},provider:{},run:{},asset:{one:{id:'one',mime:'image/png',name:'original.png'}},keys:{},envKeys:{},preferences:{}};
  window.testFiles.set('canvas.json',new Blob([JSON.stringify(state)]));
  const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;canvas.getContext('2d').fillRect(0,0,2048,1024);
  window.testFiles.set('assets/one',await new Promise(r=>canvas.toBlob(r)));
 });
 await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();
 const stats=await page.evaluate(async()=>{
  const initialReads=window.assetReads;
  const [a,b]=await Promise.all([window.__lcAcquireImage('one'),window.__lcAcquireImage('one')]);
  const bitmap=await createImageBitmap(await fetch(a.url).then(r=>r.blob()));const previewSize=[bitmap.width,bitmap.height];bitmap.close();
  const shared=a.url===b.url;a.release();b.release();
  const original=await window.__lcAcquireImage('one',true);const url=original.url;
  const same=await fetch(url).then(r=>r.arrayBuffer()).then(async bytes=>{const expected=await window.testFiles.get('assets/one').arrayBuffer();return bytes.byteLength===expected.byteLength&&new Uint8Array(bytes).every((v,i)=>v===new Uint8Array(expected)[i]);});
  original.release();let revoked=false;try{await fetch(url)}catch{revoked=true;}
  return {initialReads,previewSize,shared,same,revoked,thumbnailSaved:window.testFiles.has('thumbnails/one.webp'),...window.__lcImageStats()};
 });
 assert.equal(stats.initialReads,0);assert.deepEqual(stats.previewSize,[768,384]);assert.equal(stats.shared,true);assert.equal(stats.same,true);assert.equal(stats.revoked,true);assert.equal(stats.thumbnailSaved,true);assert.equal(stats.active,0);assert.equal(stats.memoryAssets,0);assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,...stats,errors}));
}finally{await browser.close();}
