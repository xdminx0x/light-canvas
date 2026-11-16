// Shared native image dimensions. Never replace an unsupported ratio silently.
window.LightCanvasSizing = (() => {
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  function plan(model,params={}) {
    const ratio=params.imageAspectRatio||'auto',tier=params.imageResolution||'auto';
    if(ratio==='auto'&&tier==='auto')return null;
    if(ratio==='auto')throw Error('请选择画面比例后再指定分辨率。');
    const parts=ratio.split(':').map(Number),edge={'auto':1024,'1k':1024,'2k':2048,'4k':3840}[tier];
    if(parts.length!==2||!parts.every(n=>Number.isSafeInteger(n)&&n>0&&n<=100)||!edge)throw Error('图片比例或分辨率无效。');
    let [w,h]=parts;const factor=gcd(w,h);w=w/factor*16;h=h/factor*16;
    let apiSize;
    if(/^gpt-image-1(?:$|[.-])/.test(model)) {
      apiSize={'1:1':'1024x1024','3:2':'1536x1024','2:3':'1024x1536'}[ratio];
      if(!apiSize||!['auto','1k'].includes(tier))throw Error('此模型仅支持 1K 的 1:1、3:2、2:3，请更换设置或模型。');
    }else{
      const k=Math.max(Math.round(edge/Math.max(w,h)),Math.ceil(Math.sqrt(655360/(w*h))));
      const max=Math.min(Math.floor(3840/Math.max(w,h)),Math.floor(Math.sqrt(8294400/(w*h))));
      if(k>max||Math.max(w,h)/Math.min(w,h)>3)throw Error('此比例的所选分辨率超出原生尺寸限制，请降低分辨率。');
      apiSize=`${w*k}x${h*k}`;
    }
    const verified=/^gpt-image-2(?:$|-|\.5(?:$|[.-]))/.test(model);
    return {aspectRatio:ratio,resolution:tier==='auto'?'1k':tier,requestedSize:apiSize,apiSize,method:'native',verified,note:verified?'按此尺寸请求 API 原图，不放大、不补边。':'按此尺寸请求原图；此型号的自定义尺寸支持待接口确认，失败时显示接口错误。'};
  }
  function preview(model,params){try{return plan(model,params)}catch(error){return {error:error.message}}}
  return {plan,preview};
})();
