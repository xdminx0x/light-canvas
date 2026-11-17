/* Shared, deterministic image numbering. No model calls and no prompt polishing. */
window.LightCanvasImages=(()=>{
  const idsOf=(node,runs)=>{
    if(!node?.data?.runId)return node?.data?.assetIds||[];
    const run=runs[node.data.runId],ids=run?.assetIds||[];
    if(!Number.isInteger(node.data.resultIndex))return ids;
    const id=run?.outputAssets?run.outputAssets[node.data.resultIndex]:ids[node.data.resultIndex];
    return id&&ids.includes(id)?[id]:[];
  };
  function links(workspace,node,runs){
    const ids=new Set(node?.data?.assetIds||[]),single=new Set();
    for(const edge of workspace.edges||[])if(edge.target===node.id&&edge.data?.kind!=='generation'){
      const assets=idsOf(workspace.nodes.find(n=>n.id===edge.source),runs);
      for(const id of assets)ids.add(id);if(assets.length===1)single.add(assets[0]);
    }
    return {ids:[...ids],single};
  }
  function assign(workspace,runs={},previous){
    const imageLabels={...(workspace.imageLabels||{})};
    let next=Math.max(0,...Object.values(imageLabels).map(label=>Number(/^图(\d+)$/.exec(label)?.[1])||0))+1;
    for(const node of workspace.nodes)for(const id of idsOf(node,runs))if(!imageLabels[id])imageLabels[id]=`图${next++}`;
    const nodes=workspace.nodes.map(node=>{
      if(node.data.kind!=='input'||node.data.mode!=='image')return node;
      const current=links(workspace,node,runs),before=previous?.nodes.find(n=>n.id===node.id),old=before?links(previous,before,runs):null;
      const restored=new Set(current.single);
      if(previous)for(const edge of workspace.edges.filter(e=>e.target===node.id&&!previous.edges.some(old=>old.id===e.id)))for(const id of idsOf(workspace.nodes.find(n=>n.id===edge.source),runs))restored.add(id);
      const excluded=(node.data.excludedImageIds||[]).filter(id=>!restored.has(id));
      const available=current.ids.filter(id=>!excluded.includes(id)),labels=available.map(id=>imageLabels[id]);
      const detached=new Set(node.data.detachedImageLabels||[]);
      if(old)for(const id of old.ids)if(!current.ids.includes(id)&&imageLabels[id])detached.add(imageLabels[id]);
      const graphChanged=!previous||!!old&&(old.ids.length!==current.ids.length||old.ids.some(id=>!current.ids.includes(id)))||excluded.length!==(node.data.excludedImageIds||[]).length;
      let prompt=node.data.prompt||'';
      const stale=[...new Set(mentions(prompt).map(m=>m.label).filter(label=>!labels.includes(label)))];
      if(graphChanged&&stale.length===1&&labels.length===1&&mentions(prompt).every(m=>m.label===stale[0])){
        const known=new Set(detached);
        for(const run of Object.values(runs))if(run.inputNodeId===node.id)for(const id of run.snapshot?.assetIds||[])if(imageLabels[id])known.add(imageLabels[id]);
        if(known.has(stale[0])){const oldLabel=stale[0];prompt=prompt.replace(/@(?:图片|图)([1-9]\d*)(?!\d)/g,(token,n)=>`图${n}`===oldLabel?'@'+labels[0]:token);detached.delete(oldLabel);}
      }
      const pending=[...detached].filter(label=>mentions(prompt).some(m=>m.label===label));
      if(prompt===node.data.prompt&&excluded.length===(node.data.excludedImageIds||[]).length&&JSON.stringify(pending)===JSON.stringify(node.data.detachedImageLabels||[]))return node;
      return {...node,data:{...node.data,prompt,excludedImageIds:excluded,detachedImageLabels:pending}};
    });
    return {...workspace,nodes,imageLabels};
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
