import assert from 'node:assert/strict';import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';import vm from 'node:vm';import {tmpdir} from 'node:os';import {join} from 'node:path';import {pathToFileURL} from 'node:url';
const ctx={window:{}};vm.runInNewContext(await readFile(new URL('../node-snapping.js',import.meta.url),'utf8'),ctx);const snap=ctx.window.LightCanvasSnapping.snap;
const node=(id,x,y,w=100,h=100)=>({id,position:{x,y},measured:{width:w,height:h},data:{kind:'note',label:id,prompt:id,assetIds:[],params:{}}});
const target=node('target',100,100),check=(source,zoom=1)=>snap([target,source],['moving'],zoom);
let r=check(node('moving',105,400));assert.equal(r.nodes[1].position.x,100);assert.ok(r.guides.some(g=>g.axis==='x'));assert.equal(target.position.x,100);
r=check(node('moving',109,400));assert.equal(r.nodes[1].position.x,109,'outside screen threshold stays free');
r=check(node('moving',113,400),0.5);assert.equal(r.nodes[1].position.x,100,'threshold scales with zoom');
r=check(node('moving',105,400),2);assert.equal(r.nodes[1].position.x,105,'no oversized magnetic radius at high zoom');
r=check(node('moving',5,400,200));assert.equal(r.nodes[1].position.x,0,'right edges align');
r=check(node('moving',51,400,200));assert.equal(r.nodes[1].position.x,50,'centers align');
r=check(node('moving',201,400));assert.equal(r.nodes[1].position.x,200,'neighbor edges meet');
r=snap([target,node('a',205,500),node('b',305,600)],['a','b']);assert.equal(r.nodes[1].position.x,200);assert.equal(r.nodes[2].position.x-r.nodes[1].position.x,100,'group geometry preserved');
assert.equal(snap([node('a',0,0)],['a']).guides.length,0,'no self snap');
const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright'),temp=await mkdtemp(join(tmpdir(),'lc-snap-'));const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
 const html=await readFile(new URL('../../index.html',import.meta.url),'utf8'),match=html.match(/<script id="lc-seed" type="application\/json">(.*?)<\/script>/s),seed=JSON.parse(match[1]);
 seed.state.workspace={w:{id:'w',name:'Snap test',version:0,viewport:{x:0,y:0,zoom:1},nodes:[node('a',140,130,350,300),node('b',590,380,350,300)],edges:[]}};
 const file=join(temp,'fixture.html');await writeFile(file,html.replace(match[1],JSON.stringify(seed)));const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('dialog',d=>d.accept());page.on('pageerror',e=>{errors.push(e.message);console.log(e.message)});await page.route('https://**',route=>route.abort());
 await page.goto(pathToFileURL(file).href);await page.getByRole('button',{name:'临时打开',exact:true}).click();await page.locator('[data-id="a"]').waitFor({timeout:8000});assert.equal(await page.locator('.canvas-toolbar').count(),0);assert.equal(await page.getByRole('button',{name:'自动对齐',exact:true}).count(),0);
 const position=async id=>page.evaluate(id=>window.__lcBackend.getState().workspace.w.nodes.find(n=>n.id===id).position,id);
 const drag=async(dx,dy,alt=false)=>{const box=await page.locator('[data-id="b"] .node-drag-handle').boundingBox();if(alt)await page.keyboard.down('Alt');await page.mouse.move(box.x+100,box.y+24);await page.mouse.down();await page.mouse.move(box.x+102,box.y+24);await page.mouse.move(box.x+102+dx,box.y+24+dy,{steps:20});await page.waitForTimeout(100);return async()=>{await page.mouse.up();if(alt)await page.keyboard.up('Alt');await page.waitForTimeout(650)}};
 let stop=await drag(0,-244);await page.locator('.canvas-snap-guides line').first().waitFor({state:'attached',timeout:5000});if(process.env.LC_SCREENSHOT_DIR)await page.screenshot({path:process.env.LC_SCREENSHOT_DIR+'/snap-drag.png'});await stop();assert.equal((await position('b')).y,130,'drag automatically aligns top edges');assert.equal(await page.locator('.canvas-snap-guides').count(),0,'guides clear on release');
 await page.getByRole('button',{name:'画布操作',exact:true}).click();await page.getByRole('button',{name:'撤销',exact:true}).click();await page.waitForTimeout(650);assert.equal((await position('b')).y,380,'one undo restores pre-drag position');
 stop=await drag(0,-244,true);await stop();assert.equal((await position('b')).y,136,'Alt temporarily bypasses snapping');
 await page.getByRole('button',{name:'画布操作',exact:true}).click();await page.getByRole('button',{name:'导入图片',exact:true}).waitFor();await page.keyboard.press('Escape');assert.equal(await page.locator('.canvas-command-menu').evaluate(e=>e.open),false);
 assert.deepEqual(errors,[]);console.log('Neighbor snapping passed: edges/centers, pixel threshold across zoom levels, immutable groups, toolbar removed, visible drag guides, undo, Alt bypass and command menu.');
}finally{await browser.close();await rm(temp,{recursive:true,force:true})}
