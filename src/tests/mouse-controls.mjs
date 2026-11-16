const {chromium}=await import(process.env.LC_PLAYWRIGHT||'playwright');
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url)),temp=await mkdtemp(join(tmpdir(),'lc-mouse-'));
const version=JSON.parse(await readFile(join(root,'src/package.json'),'utf8')).version;
const html=await readFile(join(root,'index.html'),'utf8'),match=html.match(/<script id="lc-seed" type="application\/json">([\s\S]*?)<\/script>/),seed=JSON.parse(match[1]);
seed.state.workspace={w:{id:'w',name:'Mouse controls',version:0,viewport:{x:0,y:0,zoom:1},edges:[],nodes:[{id:'a',type:'canvas',position:{x:140,y:140},data:{kind:'note',label:'便签',prompt:'鼠标测试',assetIds:[],params:{}}},{id:'b',type:'canvas',position:{x:550,y:140},data:{kind:'note',label:'便签二',prompt:'第二张',assetIds:[],params:{}}}]}};
const fixture=join(temp,'fixture.html');await writeFile(fixture,html.replace(match[1],JSON.stringify(seed)));
const browser=await chromium.launch({executablePath:process.env.LC_BROWSER,headless:true});
try{
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());await page.route('https://**',r=>r.abort());await page.goto(pathToFileURL(fixture).href);await page.getByRole('button',{name:'临时打开',exact:true}).click();await page.locator('.react-flow__node').first().waitFor();
assert.ok((await page.title()).includes(version));assert.equal(await page.evaluate(()=>window.__lcAppVersion),version);assert.equal(await page.evaluate(()=>fetch('/api/bootstrap').then(r=>r.json()).then(x=>x.version)),version+'-html');
const viewport=()=>page.locator('.react-flow__viewport').evaluate(e=>e.style.transform);
const before=await viewport(),a=await page.locator('[data-id="a"]').boundingBox(),b=await page.locator('[data-id="b"]').boundingBox();
await page.mouse.move(a.x-22,a.y-22);await page.mouse.down({button:'left'});await page.mouse.move(b.x+b.width+22,Math.max(a.y+a.height,b.y+b.height)+22,{steps:16});await page.mouse.up({button:'left'});
assert.equal(await page.locator('.react-flow__node.selected').count(),2,'left drag selects both nodes');assert.equal(await viewport(),before,'left drag does not pan');
await page.mouse.move(1250,750);await page.mouse.down({button:'middle'});await page.mouse.move(1170,690,{steps:12});await page.mouse.up({button:'middle'});assert.notEqual(await viewport(),before,'middle drag pans');
assert.equal(await page.getByRole('button',{name:'平移模式',exact:true}).count(),0);
await page.reload();await page.getByRole('button',{name:'临时打开',exact:true}).click();await page.locator('.react-flow__node').first().waitFor();const reloaded=await viewport(),node=await page.locator('[data-id="a"]').boundingBox();await page.mouse.move(node.x-20,node.y-20);await page.mouse.down();await page.mouse.move(node.x+node.width+20,node.y+node.height+20,{steps:12});await page.mouse.up();assert.equal(await page.locator('[data-id="a"].selected').count(),1);assert.equal(await viewport(),reloaded);assert.deepEqual(errors,[]);console.log('Mouse controls passed: left drag selects, middle drag pans, reload preserves behavior; versions agree.');
}finally{await browser.close();await rm(temp,{recursive:true,force:true})}
