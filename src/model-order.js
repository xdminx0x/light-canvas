/* Stable display order; never changes a node's selected model. */
window.LightCanvasModels=(()=>{
  function describe(id){
    const match=/^(gpt-image-|gpt-|o|dall-e-)(\d+(?:\.\d+)*)(.*)$/.exec(id);
    if(!match)return {family:null,version:[],date:0};
    const date=/(20\d{2}-\d{2}-\d{2})$/.exec(id);
    return {family:match[1],version:match[2].split('.').map(Number),date:date?Number(date[1].replaceAll('-','')):Infinity};
  }
  function sort(models=[]){
    const groups=new Map();for(const id of models){const key=describe(id).family;if(key&&!groups.has(key))groups.set(key,groups.size);}
    return [...models].sort((a,b)=>{
      const x=describe(a),y=describe(b);
      if(x.family!==y.family){if(!x.family)return y.family?1:0;if(!y.family)return -1;return groups.get(x.family)-groups.get(y.family);}
      if(!x.family)return 0;
      for(let i=0;i<Math.max(x.version.length,y.version.length);i++){const delta=(y.version[i]||0)-(x.version[i]||0);if(delta)return delta;}
      if(x.date!==y.date)return y.date>x.date?1:-1;
      return a.localeCompare(b,undefined,{numeric:true});
    });
  }
  return {sort};
})();
