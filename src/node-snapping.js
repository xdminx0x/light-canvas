// Neighbor-edge snapping inspired by PureRef; enabled without modifier keys.
window.LightCanvasSnapping=(()=>{
  const size=n=>({width:n.measured?.width||n.width||350,height:n.measured?.height||n.height||300});
  function snap(nodes,ids,zoom=1){
    const moving=new Set(ids),active=nodes.filter(n=>moving.has(n.id));
    if(!active.length)return {nodes,guides:[]};
    const bounds=list=>{const x=Math.min(...list.map(n=>n.position.x)),y=Math.min(...list.map(n=>n.position.y));return{x,y,width:Math.max(...list.map(n=>n.position.x+size(n).width))-x,height:Math.max(...list.map(n=>n.position.y+size(n).height))-y}};
    const box=bounds(active),threshold=8/Math.max(0.1,zoom);let bestX=null,bestY=null;
    const anchors=(b,axis)=>axis==='x'?[b.x,b.x+b.width,b.x+b.width/2]:[b.y,b.y+b.height,b.y+b.height/2];
    for(const node of nodes){
      if(moving.has(node.id)||node.hidden)continue;
      const target={...node.position,...size(node)};
      for(const axis of ['x','y']){
        const from=anchors(box,axis),to=anchors(target,axis);
        for(let i=0;i<3;i++)for(let j=0;j<3;j++){
          if((i===2)!==(j===2))continue; // Centers align to centers; edges to edges.
          const delta=to[j]-from[i],current=axis==='x'?bestX:bestY;
          if(Math.abs(delta)<=threshold&&(!current||Math.abs(delta)<Math.abs(current.delta))){
            const value={delta,axis,value:to[j],target};if(axis==='x')bestX=value;else bestY=value;
          }
        }
      }
    }
    const dx=bestX?.delta||0,dy=bestY?.delta||0;
    const moved={...box,x:box.x+dx,y:box.y+dy},margin=12/zoom;
    const guides=[bestX,bestY].filter(Boolean).map(({axis,value,target})=>axis==='x'?{axis,value,start:Math.min(moved.y,target.y)-margin,end:Math.max(moved.y+moved.height,target.y+target.height)+margin}:{axis,value,start:Math.min(moved.x,target.x)-margin,end:Math.max(moved.x+moved.width,target.x+target.width)+margin});
    return {nodes:dx||dy?nodes.map(n=>moving.has(n.id)?{...n,position:{x:n.position.x+dx,y:n.position.y+dy}}:n):nodes,guides};
  }
  return {snap};
})();
