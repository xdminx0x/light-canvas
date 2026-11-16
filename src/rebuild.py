"""Rebuild the self-contained Light Canvas HTML from this package's editable sources.

Requires Python 3 only. Run from any working directory:
    python src/rebuild.py

The current HTML supplies the initial, user-owned seed data. Never print its keys.
"""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parent.parent
source = Path(__file__).resolve().parent
output = root / 'index.html'
version = json.loads((source / 'package.json').read_text(encoding='utf-8'))['version']
old = output.read_text(encoding='utf-8')
match = re.search(r'<script id="lc-seed" type="application/json">(.*?)</script>', old, re.S)
if not match:
    raise SystemExit('Existing index.html is required to preserve initial data and API settings.')
seed = match.group(1)
client = (source / 'client-readable.js').read_text(encoding='utf-8')
client = client.replace('location.pathname.match(/^\\/reader\\/([^/]+)$/)', 'location.hash.match(/^#reader=([^/]+)$/)')
client = client.replace('`/reader/${l.runId}`', '`${location.href.split("#")[0]}#reader=${l.runId}`')
client = client.replace('`/reader/${encodeURIComponent(e12)}`', '`${location.href.split("#")[0]}#reader=${encodeURIComponent(e12)}`')
client = re.sub(r'`/api/assets/\$\{([^}]+)\}(?:\?download=1)?`', r'window.__lcAssetUrl(\1)', client)
client = client.replace('"/api/assets/"+ref.id', 'window.__lcAssetUrl(ref.id)')
client = client.replace('"/api/assets/"+item.originalAssetId', 'window.__lcAssetUrl(item.originalAssetId)')
client = client.replace('src: a, alt: o || "返回的图片"', 'src: window.__lcAssetUrl(a.split("/").pop()), alt: o || "返回的图片"')
client = client.replace('"本地服务响应超时，请检查启动窗口。任务不会自动重发。"', '"本地处理超时，请刷新页面后重试。任务不会自动重发。"')
css = (source / 'client.css').read_text(encoding='utf-8')
gate_css = '\n' + (source / 'folder-gate.css').read_text(encoding='utf-8')
jszip = (source / 'vendor' / 'jszip.min.js').read_text(encoding='utf-8')
backend = (source / 'browser-backend.js').read_text(encoding='utf-8').replace('__LC_APP_VERSION__', version)
backend = (source / 'image-costs.js').read_text(encoding='utf-8') + '\n' + (source / 'image-sizing.js').read_text(encoding='utf-8') + '\n' + (source / 'model-order.js').read_text(encoding='utf-8') + '\n' + (source / 'image-references.js').read_text(encoding='utf-8') + '\n' + backend
html = f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f7f7f7"><title>轻画布 {version} · 本地 HTML</title><style>{css}\n{gate_css}</style></head><body><div id="root"></div><div id="folder-gate"><div id="folder-panel"><h1>打开轻画布</h1><p>选择项目中的“data”文件夹，并允许浏览器查看和编辑。首次使用会自动创建数据；已有文件夹会读取原有画布与 API 配置。以后打开这个页面，选回同一文件夹即可继续。</p><button id="choose-folder">选择数据文件夹</button><button id="import-data">导入备份到文件夹</button><button id="download-data">临时打开</button><input id="import-file" type="file" accept=".zip" hidden><div id="folder-status"></div></div></div><script id="lc-seed" type="application/json">{seed}</script><script>{jszip}</script><script>{backend}</script><script>{client}</script></body></html>'''
output.write_text(html, encoding='utf-8')
print(f'Rebuilt {output.name} ({output.stat().st_size:,} bytes)')
