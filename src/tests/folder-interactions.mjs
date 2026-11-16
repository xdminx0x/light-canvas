const {chromium}=await import(process.env.LC_PLAYWRIGHT || 'playwright');
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER || undefined,headless:true});
try {
const page=await browser.newPage({viewport:{width:1280,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
 const files=new Map();window.__testFiles=files;
 const dir=(prefix='')=>({name:'Test Data',queryPermission:async()=> 'granted',getDirectoryHandle:async name=>dir(prefix+name+'/'),getFileHandle:async(name,options={})=>{const key=prefix+name;if(!options.create&&!files.has(key))throw new Error('not found');return {createWritable:async()=>{let chunks=[];return {write:async data=>{await new Promise(r=>setTimeout(r,75));chunks.push(data)},close:async()=>files.set(key,new Blob(chunks))}},getFile:async()=>files.get(key)}},removeEntry:async name=>files.delete(prefix+name)});
 window.showDirectoryPicker=async()=>dir();
});
await page.goto(pathToFileURL(path.resolve(process.argv[2]||fileURLToPath(new URL('../../index.html',import.meta.url)))).href);
await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();
await page.locator('.app-shell').waitFor();
await page.getByRole('button',{name:'新建画布',exact:true}).first().click();
await page.waitForFunction(()=>document.querySelectorAll('.prompt-input').length===0);
await page.getByRole('button',{name:'画布操作',exact:true}).click();
 await page.getByRole('button',{name:'新建输入',exact:true}).first().click();
const field=page.getByRole('textbox',{name:'提示词',exact:true}).first();
await field.click();await field.pressSequentially('Testing persistence',{delay:60});await page.keyboard.insertText(' 持久保存');
await page.waitForTimeout(1500);
assert.equal(await page.evaluate(async()=>{const s=JSON.parse(await window.__testFiles.get('canvas.json').text());return Object.values(s.workspace).at(-1).nodes.find(n=>n.data.kind==='input').data.prompt;}),'Testing persistence 持久保存');
await field.evaluate(async element=>{
 const canvas=document.createElement('canvas');canvas.width=2;canvas.height=2;const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));
 const dt=new DataTransfer();dt.items.add(new File([blob],'saved.png',{type:'image/png'}));
 element.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));
});
await page.getByTestId('node-reference-image').waitFor();await page.waitForTimeout(1500);
const saved=await page.evaluate(async()=>{
 const s=JSON.parse(await window.__testFiles.get('canvas.json').text()),w=Object.values(s.workspace).at(-1),image=w.nodes.find(n=>n.data.kind==='image');
 return {connected:w.edges.some(e=>e.source===image.id&&e.data.kind==='reference'),imageSaved:window.__testFiles.has('assets/'+image.data.assetIds[0]),nodeCount:w.nodes.length,prompt:w.nodes.find(n=>n.data.kind==='input').data.prompt};
});
assert.equal(saved.connected,true);assert.equal(saved.imageSaved,true);assert.equal(saved.nodeCount,2);assert.equal(saved.prompt,'Testing persistence 持久保存');assert.deepEqual(errors,[]);
await field.fill('参考@图1，保留原文');await page.waitForTimeout(1300);
const mentions=await page.evaluate(async()=>{const s=JSON.parse(await window.__testFiles.get('canvas.json').text()),w=Object.values(s.workspace).at(-1);return {labels:Object.values(w.imageLabels||{}),prompt:w.nodes.find(n=>n.data.kind==='input').data.prompt};});
assert.deepEqual(mentions.labels,['图1']);assert.equal(mentions.prompt,'参考@图1，保留原文');
console.log(JSON.stringify({passed:true,folderMode:'canvas text and original pasted image saved, reference connection persisted',errors}));
} finally {await browser.close();}
