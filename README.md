# 轻画布

可双击打开的本地 AI 节点画布。当前版本 2.2.0。

代码仓库：https://github.com/xdminx0x/light-canvas

## 使用

1. 下载项目或克隆仓库。
2. 使用 Chrome 或 Edge 打开“轻画布.html”。
3. 在电脑上新建“画布数据”文件夹，并在页面中选择它。
4. 在设置里填写这台电脑使用的供应商、模型和 API 密钥。

仓库不含任何用户画布、图片或 API 配置。桌面旧版已配置的用户，可选择原来的“画布数据”文件夹继续使用。数据文件夹保存原图及密钥，请勿上传。

## 修改与构建

- 修改源码/client-readable.js、client.css、browser-backend.js 等源码。
- 使用 Python 3 执行：

```sh
python 源码/rebuild.py
```

构建无需联网。重新打开 HTML 检查效果，将源码、生成的 HTML 和更新日志一起提交。不要在 HTML 内嵌个人数据或配置。

## 开发检查

安装 Node.js 和 Python 3，然后：

```sh
cd 源码
npm install
npx playwright install chromium
npm test
```

测试使用临时数据和模拟接口，完成后删除临时数据，不调用付费 API。也可设置 LC_BROWSER 使用已有 Chrome/Edge。

## 换电脑继续修改

先克隆仓库；每次修改前拉取更新，修改后构建、检查并提交推送。API 配置在各台电脑单独填写。需要迁移画布时，另行私下复制数据文件夹；Git 不负责同步画布。

变更记录见“更新日志.md”，实现约束见“AI开发交接.md”。
