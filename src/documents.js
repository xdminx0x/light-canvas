/* Native document attachments. Original bytes stay in the selected data folder. */
window.LightCanvasDocuments=(()=>{
  const types={md:'text/markdown',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',pdf:'application/pdf'};
  const limit=50*1024*1024;
  const mime=name=>{const ext=String(name||'').toLowerCase().split('.').pop();return Object.hasOwn(types,ext)?types[ext]:'';};
  const linked=(workspace,nodeId)=>(workspace?.edges||[]).filter(edge=>edge.target===nodeId&&edge.data?.kind==='reference').flatMap(edge=>(workspace.nodes.find(node=>node.id===edge.source)?.data.documentIds||[]).map(id=>({id,key:edge.id+id,edgeId:edge.id})));
  function validate(file){
    if(!mime(file.name))throw Error('请选择 Markdown（.md）、Word（.doc、.docx）或 PDF 文档。');
    if(!Number.isFinite(file.size)||file.size<=0)throw Error('文档为空，请选择有内容的文件。');
    if(file.size>=limit)throw Error('单个文档须小于 50 MB。');
  }
  function validateRequest(ids,assets,protocol,mode){
    if(!ids.length)return;
    if(mode!=='chat')throw Error('文档仅用于聊天，请切换到聊天或移除文档。');
    if(protocol!=='responses')throw Error('发送文档需要 Responses 聊天接口，请在聊天模型中选择 OpenAI 聊天。');
    for(const id of ids){if(!assets[id])throw Error('文档不存在，请重新添加。');validate(assets[id]);}
    if(ids.reduce((sum,id)=>sum+assets[id].size,0)>=limit)throw Error('本次对话中的文档总大小须小于 50 MB，请移除部分文档或新建聊天。');
  }
  async function wordText(blob){
    const zip=await JSZip.loadAsync(blob),entry=zip.file('word/document.xml');
    if(!entry)throw Error('不是可读取的 Word 文档，缺少正文。');
    if((entry._data?.uncompressedSize||0)>20*1024*1024)throw Error('Word 正文过大，请下载原文件查看。');
    const xml=await entry.async('string');if(xml.length>20*1024*1024)throw Error('Word 正文过大，请下载原文件查看。');
    const doc=new DOMParser().parseFromString(xml,'application/xml');if(doc.getElementsByTagName('parsererror').length)throw Error('Word 正文损坏，无法预览。');
    const ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    return Array.from(doc.getElementsByTagNameNS(ns,'p'),p=>{
      let text='';const walk=node=>{if(node.namespaceURI===ns&&node.localName==='t'){text+=node.textContent;return}if(node.namespaceURI===ns&&node.localName==='tab')text+='\t';if(node.namespaceURI===ns&&['br','cr'].includes(node.localName))text+='\n';for(const child of node.childNodes)walk(child)};walk(p);return text;
    }).join('\n\n');
  }
  const size=bytes=>bytes<1024?`${bytes} B`:bytes<1024*1024?`${(bytes/1024).toFixed(1)} KB`:`${(bytes/1024/1024).toFixed(1)} MB`;
  return {mime,linked,validate,validateRequest,wordText,size,accept:'.md,.doc,.docx,.pdf'};
})();
