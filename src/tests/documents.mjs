import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.setDefaultTimeout(12000);page.on('pageerror',e=>errors.push(e.message));await page.route('https://**',r=>r.abort());
await page.addInitScript(()=>{
 const files=new Map();window.documentFiles=files;window.documentRequests=[];const dir=(prefix='')=>({name:'data',queryPermission:async()=> 'granted',getDirectoryHandle:async name=>dir(prefix+name+'/'),getFileHandle:async(name,opts={})=>{const key=prefix+name;if(!opts.create&&!files.has(key))throw Error('missing');return {getFile:async()=>files.get(key),createWritable:async()=>({write:async value=>files.set(key,new Blob([value])),close:async()=>{}})}},removeEntry:async name=>files.delete(prefix+name)});window.showDirectoryPicker=async()=>dir();
 const original=window.fetch.bind(window);window.fetch=async(url,init)=>{
  if(String(url).startsWith('https://documents.invalid/')){window.documentRequests.push(JSON.parse(init.body));return new Response(JSON.stringify({output:[{type:'message',content:[{type:'output_text',text:'Document response'}]}],usage:{input_tokens:10,output_tokens:10,total_tokens:20}}),{headers:{'Content-Type':'application/json'}})}
  return original(url,init);
 };
});
await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);
await page.evaluate(()=>{
 const state={format:'light-canvas-html-v1',workspace:{w:{id:'w',name:'Document test',nodes:[{id:'input',type:'canvas',position:{x:680,y:100},data:{kind:'input',label:'Chat',mode:'chat',prompt:'Read the documents',assetIds:[],providerId:'test',model:'gpt-6.1-sol',params:{}}}],edges:[],version:0,viewport:{x:0,y:0,zoom:1}}},provider:{test:{id:'test',name:'Responses test',protocol:'responses',baseUrl:'https://documents.invalid/v1',models:['gpt-6.1-sol'],imageInput:true}},asset:{},run:{},keys:{test:'test-placeholder'},envKeys:{},preferences:{}};
 window.documentFiles.set('canvas.json',new Blob([JSON.stringify(state)]));
});
await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();
const md=Buffer.from('# 文档标题\r\n\r\n原文 **加粗**。\r\n<script>window.injected=true</script>\r\n![外链](https://documents.invalid/tracker.png)\r\n');
const docx=Buffer.from(await page.evaluate(async()=>{const zip=new JSZip();zip.file('[Content_Types].xml','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/></Types>');zip.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Word 正文 &amp; 原文</w:t><w:tab/><w:t>第二列</w:t></w:r></w:p><w:p><w:r><w:t>第二段</w:t></w:r></w:p></w:body></w:document>');return [...await zip.generateAsync({type:'uint8array'})]}));
const pdf=(()=>{const stream='BT /F1 24 Tf 72 700 Td (Original PDF document) Tj ET';const objects=['<</Type/Catalog/Pages 2 0 R>>','<</Type/Pages/Count 1/Kids[3 0 R]>>','<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>','<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>',`<</Length ${stream.length}>>\nstream\n${stream}\nendstream`];let body='%PDF-1.4\n',offsets=[0];for(const [i,o] of objects.entries()){offsets.push(Buffer.byteLength(body));body+=`${i+1} 0 obj\n${o}\nendobj\n`;}const xref=Buffer.byteLength(body);body+=`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(o=>String(o).padStart(10,'0')+' 00000 n ').join('\n')}\ntrailer<</Size 6/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;return Buffer.from(body);})();
const doc=Buffer.from([0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1,0,1,2,3]);
const fixtures=[{name:'说明.md',mimeType:'',buffer:md},{name:'正文.docx',mimeType:'application/octet-stream',buffer:docx},{name:'资料.pdf',mimeType:'application/pdf',buffer:pdf},{name:'旧版.doc',mimeType:'application/msword',buffer:doc}];
const input=page.locator('.react-flow__node[data-id="input"]');
await input.getByLabel('选择节点附件').setInputFiles(fixtures);await page.waitForFunction(()=>window.__lcBackend.getState().workspace.w.nodes.find(n=>n.id==='input').data.documentIds?.length===4);
assert.equal(await input.locator('.document-attachments li').count(),4);assert.equal(await input.locator('.reference-image-thumb').count(),0);
await input.getByRole('button',{name:'发送',exact:true}).click();await page.waitForFunction(()=>Object.values(window.__lcBackend.getState().run).some(r=>r.status==='completed'));
const request=await page.evaluate(()=>window.documentRequests[0]);const parts=request.input.flatMap(m=>Array.isArray(m.content)?m.content:[]).filter(p=>p.type==='input_file');assert.equal(parts.length,4);
for(const f of fixtures){const part=parts.find(p=>p.filename===f.name);assert.deepEqual(Buffer.from(part.file_data.split(',')[1],'base64'),f.buffer);assert.ok(part.file_data.startsWith('data:'));}
assert.equal(request.input.at(-1).content[0].text,'Read the documents');
// Local previews, original download, keyboard close and responsive sizing.
await input.locator('.document-name').filter({hasText:'说明.md'}).click();await page.getByRole('heading',{name:'文档标题',exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.injected),undefined);assert.equal(await page.locator('.document-prose img').count(),0);
assert.equal(await page.getByRole('link',{name:'下载原文件',exact:true}).getAttribute('download'),'说明.md');
if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/document-desktop.png'});
await page.setViewportSize({width:390,height:844});assert.equal(await page.locator('.document-viewer').evaluate(e=>e.scrollWidth<=e.clientWidth),true);
if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/document-narrow.png'});
await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:1000});
await input.locator('.document-name').filter({hasText:'正文.docx'}).click();await page.waitForFunction(()=>document.querySelector('.document-prose pre')?.textContent.includes('第二段'));
assert.equal(await page.locator('.document-prose pre').textContent(),'Word 正文 & 原文\t第二列\n\n第二段');await page.getByRole('button',{name:'关闭文档预览'}).click();
await input.locator('.document-name').filter({hasText:'资料.pdf'}).click();await page.locator('.document-viewer iframe').waitFor();const previewBytes=await page.locator('.document-viewer iframe').evaluate(async e=>[...new Uint8Array(await fetch(e.src).then(r=>r.arrayBuffer()))]);assert.deepEqual(Buffer.from(previewBytes),pdf);await page.getByRole('button',{name:'关闭文档预览'}).click();
await input.locator('.document-name').filter({hasText:'旧版.doc'}).click();await page.getByText('浏览器无法预览旧版 .doc 正文，请下载原文件后用 Word 打开。',{exact:true}).waitFor();await page.mouse.click(4,4);await page.locator('.document-viewer').waitFor({state:'detached'});
// Removal excludes a document immediately, while prior generation snapshots retain original attachments.
for(const f of fixtures)await input.getByRole('button',{name:'移除文档：'+f.name,exact:true}).click();
await page.waitForFunction(()=>window.__lcBackend.getState().workspace.w.nodes.find(n=>n.id==='input').data.documentIds?.length===0);
const preview=async()=>page.evaluate(async()=>{const r=await fetch('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:'w',nodeId:'input'})});return {status:r.status,body:await r.json()}});
assert.equal((await preview()).body.documentIds.length,0);
assert.equal(await page.evaluate(()=>Object.values(window.__lcBackend.getState().run)[0].snapshot.documentIds.length),4);
// File clipboard creates standalone reference nodes at the current mouse location.
await page.mouse.move(450,360);
const paste=async files=>page.evaluate(files=>{const dt=new DataTransfer();for(const f of files)dt.items.add(new File([new Uint8Array(f.bytes)],f.name,{type:f.mime||''}));document.body.dispatchEvent(new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:dt}));},files);
await paste([{name:'画布参考.md',bytes:[...md]}]);await page.locator('[data-testid="node-document"]').waitFor();
const docNodeId=await page.locator('.react-flow__node:has([data-testid="node-document"])').getAttribute('data-id');
await page.locator('.document-node-open').click();await page.getByRole('heading',{name:'文档标题',exact:true}).waitFor();await page.keyboard.press('Escape');
// Connect using actual port drag, then disconnect through the attachment chip.
const source=page.locator(`.react-flow__node[data-id="${docNodeId}"] .react-flow__handle.source`),target=input.locator('.react-flow__handle.target');
const connect=async()=>{const a=await source.boundingBox(),b=await target.boundingBox();await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:12});await page.mouse.up();await input.getByRole('button',{name:'断开文档：画布参考.md',exact:true}).waitFor();await page.waitForFunction(()=>window.__lcBackend.getState().workspace.w.edges.some(e=>e.target==='input'&&e.data?.kind==='reference'));};
await connect();assert.equal((await preview()).body.documentIds.length,1);assert.equal((await preview()).body.currentDocumentIds.length,1);
await input.getByRole('button',{name:'断开文档：画布参考.md',exact:true}).click();await page.waitForFunction(()=>!window.__lcBackend.getState().workspace.w.edges.some(e=>e.target==='input'&&e.data?.kind==='reference'));assert.equal((await preview()).body.documentIds.length,0);assert.equal(await input.locator('.document-attachments').count(),0);
await connect();assert.equal((await preview()).body.documentIds.length,1);
if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/document-canvas.png'});
await input.getByRole('textbox',{name:'提示词',exact:true}).fill('');assert.equal(await input.getByRole('button',{name:'发送',exact:true}).isEnabled(),true,'linked document alone enables sending');
await input.getByRole('button',{name:'断开文档：画布参考.md',exact:true}).click();assert.equal(await input.getByRole('button',{name:'发送',exact:true}).isEnabled(),false,'disconnecting the last file disables an empty input');
await input.getByRole('textbox',{name:'提示词',exact:true}).fill('Read the documents');await connect();
// Persist and reload with the saved reference; disk cleanup must retain documents and historical copies.
await page.evaluate(()=>fetch('/api/cleanup',{method:'POST'}));
const saved=await page.evaluate(async()=>Promise.all([...window.documentFiles].map(async([name,blob])=>[name,[...new Uint8Array(await blob.arrayBuffer())]])));
await page.addInitScript(saved=>{for(const [name,bytes] of saved)window.documentFiles.set(name,new Blob([new Uint8Array(bytes)]));},saved);
await page.reload();await page.getByRole('button',{name:'选择数据文件夹',exact:true}).click();await page.locator('.app-shell').waitFor();await input.getByRole('button',{name:'断开文档：画布参考.md',exact:true}).waitFor();
assert.equal((await preview()).body.documentIds.length,1);
// Replace a disconnected reference with a different pasted file and delete its node.
await input.getByRole('button',{name:'断开文档：画布参考.md',exact:true}).click();await page.waitForFunction(()=>!window.__lcBackend.getState().workspace.w.edges.some(e=>e.target==='input'&&e.data?.kind==='reference'));
await paste([{name:'新参考.pdf',bytes:[...pdf],mime:'application/pdf'},{name:'新参考.docx',bytes:[...docx]},{name:'新参考.doc',bytes:[...doc]}]);
await page.waitForFunction(()=>window.__lcBackend.getState().workspace.w.nodes.filter(n=>n.data.kind==='document').length===4);
const swapped=await page.evaluate(async()=>{
 const s=window.__lcBackend.getState(),w=structuredClone(s.workspace.w),node=w.nodes.find(n=>s.asset[n.data.documentIds?.[0]]?.name==='新参考.pdf');
 w.edges.push({id:'replacement-edge',source:node.id,target:'input',data:{kind:'reference'}});await fetch('/api/workspaces/w',{method:'PUT',body:JSON.stringify(w)});
 const get=()=>fetch('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:'w',nodeId:'input'})}).then(r=>r.json());const before=await get();
 w.nodes=w.nodes.filter(n=>n.id!==node.id);w.edges=w.edges.filter(e=>e.source!==node.id);await fetch('/api/workspaces/w',{method:'PUT',body:JSON.stringify(w)});const after=await get();
 return {before:before.documentAttachments.map(a=>a.name),after:after.documentIds};
});assert.deepEqual(swapped.before,['新参考.pdf']);assert.deepEqual(swapped.after,[]);
// Prior-turn documents remain in the explicit conversation history, not stale current-node attachments.
const history=await page.evaluate(async()=>{
 const s=window.__lcBackend.getState(),w=structuredClone(s.workspace.w),run=Object.values(s.run)[0],result=w.nodes.find(n=>n.data.runId===run.id);
 w.nodes.push({id:'follow-test',position:{x:0,y:0},data:{kind:'input',mode:'chat',providerId:'test',model:'gpt-6.1-sol',prompt:'Follow up',assetIds:[],params:{}}});w.edges.push({id:'follow-history',source:result.id,target:'follow-test',data:{kind:'history'}});
 await fetch('/api/workspaces/w',{method:'PUT',body:JSON.stringify(w)});return fetch('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:'w',nodeId:'follow-test'})}).then(r=>r.json());
});assert.equal(history.documentIds.length,4);assert.equal(history.request.input.flatMap(m=>Array.isArray(m.content)?m.content:[]).filter(p=>p.type==='input_file').length,4);
// Unsupported protocol/mode and file-size validation fail before any upstream request.
const validation=await page.evaluate(()=>{const D=window.LightCanvasDocuments,errors=[];for(const f of [{name:'bad.exe',size:1},{name:'bad.constructor',size:1},{name:'empty.md',size:0},{name:'negative.md',size:-1},{name:'large.pdf',size:50*1024*1024}])try{D.validate(f)}catch(e){errors.push(e.message)};for(const [protocol,mode] of [['chat-completions','chat'],['responses','image']])try{D.validateRequest(['a'],{a:{name:'test.md',size:10}},protocol,mode)}catch(e){errors.push(e.message)};try{D.validateRequest(['a','a'],{a:{name:'test.pdf',size:30*1024*1024}},'responses','chat')}catch(e){errors.push(e.message)};return errors});assert.equal(validation.length,8);
assert.deepEqual(errors,[]);console.log('Documents passed: original bytes for MD/DOC/DOCX/PDF, local previews, file clipboard nodes, live connect/disconnect/reconnect, persistence, history and cleanup retention, responsive layout, strict protocol/size validation.');
}finally{await browser.close()}
