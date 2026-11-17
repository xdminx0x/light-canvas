const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import assert from 'node:assert/strict';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {readFileSync,mkdtempSync,writeFileSync,unlinkSync,rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {runInNewContext} from 'node:vm';
const shared=runInNewContext(readFileSync(new URL('../image-references.js',import.meta.url),'utf8')+';window.LightCanvasImages',{window:{}});
const example=shared.assign({nodes:[{id:'one',data:{assetIds:['a','b']}},{id:'input',data:{kind:'input',prompt:'参考@图2的颜色，保留@图1的构图',assetIds:[]}}],edges:[]});
const references=shared.resolve(example,'input',{}, {a:{name:'a'},b:{name:'b'}},true);
assert.equal(references.length,2);assert.equal(shared.transmitted(example.nodes[1].data.prompt,references),'参考第2张参考图的颜色，保留第1张参考图的构图');
assert.throws(()=>shared.transmitted('@图999',references));
const native=process.env.LC_NATIVE_CLIPBOARD==='1';
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER||undefined,headless:!native,args:native?['--window-position=-32000,-32000']:[]});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 if(native)await context.grantPermissions(['clipboard-read','clipboard-write']);
 const page=await context.newPage(),errors=[],requests=[];
 page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
   const request=route.request();if(!request.url().startsWith('https:'))return route.continue();requests.push({url:request.url(),headers:request.headers(),body:request.postDataBuffer()});
   if(request.url().endsWith('/images/edits')){
     const base64=await page.evaluate(async()=>{const canvas=document.createElement('canvas');canvas.width=4;canvas.height=3;return canvas.toDataURL('image/png').split(',')[1];});
     return route.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({data:[{b64_json:base64}]})});
   }
   if(request.url().endsWith('/chat/completions'))return route.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({choices:[{message:{content:'test reply'}}]})});
   return route.abort();
 });
 await page.goto(pathToFileURL(process.argv[2]||fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 await page.getByRole('button',{name:'临时打开',exact:true}).click();await page.locator('.app-shell').waitFor();
 await page.getByRole('button',{name:'新建画布',exact:true}).first().click();await page.waitForFunction(()=>document.querySelectorAll('.prompt-input').length===0);
 await page.getByRole('button',{name:'画布操作',exact:true}).click();
 await page.getByRole('button',{name:'新建输入',exact:true}).first().click();
 const field=page.getByRole('textbox',{name:'提示词',exact:true});await field.fill('用于多图引用');
 await page.waitForTimeout(750);
 const wid=await page.evaluate(()=>Object.values(window.__lcBackend.getState().workspace).at(-1).id);
 const pngs=await page.evaluate(()=>['red','blue'].map(color=>{const canvas=document.createElement('canvas');canvas.width=4;canvas.height=3;const ctx=canvas.getContext('2d');ctx.fillStyle=color;ctx.fillRect(0,0,4,3);return canvas.toDataURL('image/png').split(',')[1];}));
 // Synthetic events cover batches and capture routing without touching the OS clipboard.
 const paste=async(count,target='body')=>page.evaluate(({pngs,count,target})=>{
   const dt=new DataTransfer();for(let i=0;i<count;i++)dt.items.add(new File([Uint8Array.from(atob(pngs[i%pngs.length]),c=>c.charCodeAt(0))],`image-${i}.png`,{type:'image/png'}));
   const element=target==='field'?document.querySelector('.prompt-input'):target==='toolbar'?document.querySelector('.toolbar-main'):document.body;
   element.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));
 },{pngs,count,target});
 if(native){
   await page.evaluate(async base64=>{const blob=new Blob([Uint8Array.from(atob(base64),c=>c.charCodeAt(0))],{type:'image/png'});await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);},pngs[0]);
   await page.getByRole('button',{name:'平移模式',exact:true}).click();
   await page.keyboard.press(process.platform==='darwin'?'Meta+v':'Control+v');
 }else await paste(1,'toolbar');
 await page.waitForFunction(id=>window.__lcBackend.getState().workspace[id].nodes.filter(n=>n.data.kind==='image'&&!n.data.runId).length===1,wid);
 if(native){await page.evaluate(()=>document.activeElement?.blur());await page.keyboard.press(process.platform==='darwin'?'Meta+v':'Control+v');}else await paste(1);
 await page.waitForFunction(id=>window.__lcBackend.getState().workspace[id].nodes.filter(n=>n.data.kind==='image'&&!n.data.runId).length===2,wid);
 // Multiple copied files become separate image nodes in one action.
 if(native&&process.platform==='win32'){
   const temporary=mkdtempSync(path.join(tmpdir(),'light-canvas-paste-')),paths=pngs.map((base64,index)=>{const file=path.join(temporary,`test-${index}.png`);writeFileSync(file,Buffer.from(base64,'base64'));return file;});
   try{execFileSync('powershell.exe',['-STA','-NoProfile','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./set-clipboard-files.ps1',import.meta.url)),...paths]);await page.evaluate(()=>document.activeElement?.blur());await page.keyboard.press('Control+v');await page.waitForFunction(id=>window.__lcBackend.getState().workspace[id].nodes.filter(n=>n.data.kind==='image'&&!n.data.runId).length===4,wid).catch(async error=>{console.log('native file paste nodes',await page.getByTestId('node-reference-image').count());throw error;});}finally{for(const file of paths)unlinkSync(file);rmdirSync(temporary);}
 }else{await paste(2);await page.waitForFunction(id=>window.__lcBackend.getState().workspace[id].nodes.filter(n=>n.data.kind==='image'&&!n.data.runId).length===4,wid);}
 // Multiple file import has the same behavior, without needing clipboard permissions.
 await page.getByLabel('导入多张图片').setInputFiles(pngs.map((base64,index)=>({name:`import-${index}.png`,mimeType:'image/png',buffer:Buffer.from(base64,'base64')})));
 await page.waitForFunction(id=>window.__lcBackend.getState().workspace[id].nodes.filter(n=>n.data.kind==='image'&&!n.data.runId).length===6,wid);
 await page.waitForFunction(id=>Object.values(window.__lcBackend.getState().workspace[id]?.imageLabels||{}).length===6,wid).catch(async error=>{console.log(JSON.stringify(await page.evaluate(()=>({workspaces:Object.values(window.__lcBackend.getState().workspace).map(w=>({id:w.id,nodes:w.nodes.length,labels:Object.keys(w.imageLabels||{}).length})),status:document.querySelector('.save-indicator')?.innerText,toast:document.querySelector('.toast')?.innerText}))));throw error;});
 let workspace=await page.evaluate(id=>window.__lcBackend.getState().workspace[id],wid);
 assert.equal(new Set(Object.values(workspace.imageLabels)).size,6);
 // @ picker works for images not previously connected to the prompt.
 await page.getByRole('button',{name:'适合全部节点',exact:true}).click();await page.waitForTimeout(300);
 await page.waitForFunction(()=>document.querySelectorAll('[data-testid="node-reference-image"]').length===6);
 await field.fill('颜色取自');await field.pressSequentially('@');
 await page.getByRole('listbox',{name:'选择参考图片'}).waitFor();
 const choice=page.getByRole('option').nth(1),label=(await choice.locator('strong').innerText()).slice(1);
 await field.press('ArrowDown');await field.press('Enter');assert.ok((await field.inputValue()).includes('@'+label));
 await field.pressSequentially('形状取自');await field.pressSequentially('@');await page.getByRole('option').first().click();
 await page.waitForTimeout(800);
 workspace=await page.evaluate(id=>window.__lcBackend.getState().workspace[id],wid);
 const input=workspace.nodes.find(n=>n.data.kind==='input');
 assert.equal(workspace.edges.filter(e=>e.target===input.id).length,2);
 const preview=await page.evaluate(async({wid,nid})=>window.__lcBackend.route('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:wid,nodeId:nid})}).then(r=>r.json()),{wid,nid:input.id});
 assert.equal(preview.imageReferences.length,2);assert.equal(preview.attachmentCount,2);assert.equal(preview.currentPrompt,await field.inputValue());
 assert.ok(preview.transmittedPrompt.includes('第2张参考图'));assert.ok(preview.transmittedPrompt.includes('第1张参考图'));
 // Replace the in-memory API key with a fake test key, and intercept the network request.
 const imageOption=await page.evaluate(async()=>{const p=window.__lcBackend.getState().provider['openai-images'];await fetch('/api/providers/'+p.id,{method:'PUT',body:JSON.stringify({...p,baseUrl:'https://light-canvas-test.invalid/v1',apiKey:'test-key'})});return p.id+'::'+p.models[0];});
 await page.getByRole('button',{name:'生图',exact:true}).click();await page.locator('details.node-configuration').evaluate(e=>e.open=true);
 await page.getByRole('combobox',{name:'节点模型'}).selectOption(imageOption);
 const modelList=await page.getByRole('combobox',{name:'节点模型'}).locator('optgroup').first().locator('option').allTextContents();assert.ok(modelList.indexOf('gpt-image-2.6-flare')<modelList.indexOf('gpt-image-2'),'newer model versions are shown first');
 await field.press('Control+Enter');
 await page.waitForFunction(id=>Object.values(window.__lcBackend.getState().run).some(r=>r.workspaceId===id&&r.status==='completed'),wid).catch(async error=>{console.log(JSON.stringify(await page.evaluate(id=>({runs:Object.values(window.__lcBackend.getState().run).filter(r=>r.workspaceId===id).map(r=>({status:r.status,error:r.error})),toast:document.querySelector('.toast')?.innerText}),wid)));console.log('intercepted requests',requests.length,'page errors',errors);throw error;});
 assert.equal(requests.length,1);assert.equal(requests[0].headers.authorization,'Bearer test-key');
 const form=await new Response(requests[0].body,{headers:{'Content-Type':requests[0].headers['content-type']}}).formData();
 assert.equal(form.get('prompt'),preview.transmittedPrompt);const files=form.getAll('image[]');assert.equal(files.length,2);
 for(const [index,ref]of preview.imageReferences.entries()){
   const bytes=await page.evaluate(async id=>Array.from(new Uint8Array(await (await window.__lcBackend.loadAsset(id)).arrayBuffer())),ref.assetId);
   assert.deepEqual(Buffer.from(await files[index].arrayBuffer()),Buffer.from(bytes));
 }
 // Unknown @ references are rejected before any paid request can be made.
 await field.fill('使用@图999999');await field.press('Control+Enter');await page.waitForTimeout(900);assert.equal(requests.length,1);
 // Image mode only offers incoming references, not the new unconnected output.
 await field.fill('@');assert.equal(await page.getByRole('listbox',{name:'选择参考图片'}).getByRole('option').count(),2);
 // The same reference mapping works in the chat JSON protocol.
 await field.fill('对比@图1和@图2，保留我的原句');
 const chatOption=await page.evaluate(async()=>{const p=window.__lcBackend.getState().provider['openai-chat'];await fetch('/api/providers/'+p.id,{method:'PUT',body:JSON.stringify({...p,baseUrl:'https://light-canvas-test.invalid/v1',apiKey:'test-key'})});return p.id+'::'+p.models[0];});
 await page.getByRole('button',{name:'聊天',exact:true}).click();await page.locator('details.node-configuration').evaluate(e=>e.open=true);
 await page.getByRole('combobox',{name:'节点模型'}).selectOption(chatOption);await field.press('Control+Enter');
 await page.waitForFunction(id=>Object.values(window.__lcBackend.getState().run).filter(r=>r.workspaceId===id&&r.status==='completed').length===2,wid);
 assert.equal(requests.length,2);
 const chat=JSON.parse(requests[1].body.toString()),content=chat.messages.at(-1).content;
 assert.equal(content[0].text,'对比第1张参考图和第2张参考图，保留我的原句');assert.equal(content.filter(item=>item.type==='image_url').length,2);
 await page.getByRole('button',{name:'移除 图2',exact:true}).click();await page.waitForTimeout(750);
 const removed=await page.evaluate(async({wid,nid})=>window.__lcBackend.route('/api/preview',{method:'POST',body:JSON.stringify({workspaceId:wid,nodeId:nid})}).then(r=>r.json()),{wid,nid:input.id});
 assert.equal(removed.attachmentCount,1);assert.equal((await field.inputValue()).includes('@图2'),false);
 // Ctrl+Enter sends a complete @ token even while its suggestions are open.
 await field.fill('仅参考@图1');await field.press('Control+Enter');
 await page.waitForFunction(id=>Object.values(window.__lcBackend.getState().run).filter(r=>r.workspaceId===id&&r.status==='completed').length===3,wid);
 assert.equal(requests.length,3);assert.equal(JSON.parse(requests[2].body.toString()).messages.at(-1).content[0].text,'仅参考第1张参考图');
 assert.deepEqual(errors,[]);
 if(process.env.LC_SCREENSHOT_PATH){
   await page.locator('.canvas-container').focus();await page.keyboard.press('Escape');
   await page.locator('.input-card .node-drag-handle').click();await page.keyboard.press('Shift+f');await page.waitForTimeout(300);
   await field.fill('参考@');const bounds=await page.getByRole('listbox',{name:'选择参考图片'}).boundingBox();assert.ok(bounds.y>=0&&bounds.y+bounds.height<=1000);await page.screenshot({path:process.env.LC_SCREENSHOT_PATH});
 }
 console.log(JSON.stringify({passed:true,nativeClipboard:native,clipboard:'toolbar/body focus, two-image paste, two-file import',mentions:'picker, stable IDs, exact multipart bytes, numbered prompt, missing reference validation',upstreamRequestsIntercepted:requests.length}));
}finally{await browser.close();}
