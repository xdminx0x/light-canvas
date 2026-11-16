/* Shared, deterministic image numbering. No model calls and no prompt polishing. */
window.LightCanvasImages=(()=>{
  const idsOf=(node,runs)=>node?.data?.runId?(runs[node.data.runId]?.assetIds||[]):(node?.data?.assetIds||[]);
  function assign(workspace,runs={}){
    const imageLabels={...(workspace.imageLabels||{})};
    let next=Math.max(0,...Object.values(imageLabels).map(label=>Number(/^图(\d+)$/.exec(label)?.[1])||0))+1;
    for(const node of workspace.nodes)for(const id of idsOf(node,runs))if(!imageLabels[id])imageLabels[id]=`图${next++}`;
    return {...workspace,imageLabels};
  }
  function catalog(workspace,runs={},assets={}){
    if(!workspace)return[];
    const labels=assign(workspace,runs).imageLabels,seen=new Set(),images=[];
    for(const node of workspace.nodes)for(const id of idsOf(node,runs))if(!seen.has(id)){seen.add(id);images.push({assetId:id,label:labels[id],nodeId:node.id,name:assets[id]?.name||node.data.label||'图片'});}
    return images.sort((a,b)=>Number(a.label.slice(1))-Number(b.label.slice(1)));
  }
  function candidates(workspace,nodeId,runs={},assets={}){
    const images=catalog(workspace,runs,assets),node=workspace?.nodes.find(n=>n.id===nodeId);
    if(node?.data.mode!=='image')return images;
    const sources=new Map();
    for(const edge of workspace.edges.filter(e=>e.target===nodeId&&e.data?.kind!=='generation'))
      for(const id of idsOf(workspace.nodes.find(n=>n.id===edge.source),runs))if(!sources.has(id))sources.set(id,edge.source);
    for(const id of node.data.assetIds||[])sources.set(id,nodeId);
    return images.filter(image=>sources.has(image.assetId)).map(image=>({...image,nodeId:sources.get(image.assetId)}));
  }
  const mentions=prompt=>Array.from((prompt||'').matchAll(/@(?:图片|图)([1-9]\d*)(?!\d)/g),m=>({token:m[0],label:`图${m[1]}`}));
  function resolve(workspace,nodeId,runs={},assets={},strict=false){
    const node=workspace.nodes.find(n=>n.id===nodeId);if(!node)return[];
    const available=candidates(workspace,nodeId,runs,assets),byId=new Map(available.map(i=>[i.assetId,i])),byLabel=new Map(available.map(i=>[i.label,i]));
    const included=new Map(),excluded=new Set(node.data.excludedImageIds||[]);
    for(const edge of workspace.edges.filter(e=>e.target===nodeId&&e.data?.kind!=='generation'))for(const id of idsOf(workspace.nodes.find(n=>n.id===edge.source),runs))if(byId.has(id)&&!excluded.has(id))included.set(id,{...byId.get(id),edgeId:edge.id});
    for(const id of node.data.assetIds||[])if(byId.has(id)&&!excluded.has(id))included.set(id,{...byId.get(id),own:true});
    for(const mention of mentions(node.data.prompt)){
      const image=byLabel.get(mention.label);
      if(!image){if(strict)throw new Error(node.data.mode==='image'?`${mention.token} 未连接到当前节点，请先连接参考图。`:`${mention.token} 对应的图片已不存在，请重新选择参考图。`);continue;}
      included.set(image.assetId,{...included.get(image.assetId),...image,mentioned:true});
    }
    return [...included.values()].sort((a,b)=>Number(a.label.slice(1))-Number(b.label.slice(1))).map((image,index)=>({...image,inputIndex:index+1}));
  }
  function transmitted(prompt,references){
    return (prompt||'').replace(/@(?:图片|图)([1-9]\d*)(?!\d)/g,(token,number)=>{
      const ref=references.find(i=>i.label===`图${number}`);
      if(!ref)throw new Error(`${token} 对应的图片已不存在，请重新选择参考图。`);
      return `第${ref.inputIndex}张参考图`;
    });
  }
  return {idsOf,assign,catalog,candidates,mentions,resolve,transmitted};
})();
