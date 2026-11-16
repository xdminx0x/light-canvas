import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const context={window:{}};vm.runInNewContext(await readFile(new URL('../model-order.js',import.meta.url),'utf8'),context);const sort=context.window.LightCanvasModels.sort;
const original=['gpt-image-1-mini','chatgpt-image-latest','gpt-image-2','gpt-image-2.5-sunburst-2026-08-01','gpt-image-2.6-sunburst','gpt-image-2.5-sunburst-2026-09-08','gpt-image-2.5-sunburst','gpt-image-2.10-flare'];
const before=[...original];assert.deepEqual(Array.from(sort(original)),['gpt-image-2.10-flare','gpt-image-2.6-sunburst','gpt-image-2.5-sunburst','gpt-image-2.5-sunburst-2026-09-08','gpt-image-2.5-sunburst-2026-08-01','gpt-image-2','gpt-image-1-mini','chatgpt-image-latest']);assert.deepEqual(original,before,'sorting must not mutate provider configuration or selected models');
assert.deepEqual(Array.from(sort(['custom-b','custom-a'])),['custom-b','custom-a']);assert.deepEqual(Array.from(sort(['gpt-5','gpt-6.1-sol','gpt-6-sol'])),['gpt-6.1-sol','gpt-6-sol','gpt-5']);
console.log('Model order passed: semantic versions, snapshot dates, latest aliases, unknown models and immutable input.');
