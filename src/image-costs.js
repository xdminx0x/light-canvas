// OpenAI Standard USD prices checked 2026-11-16. Values are per million tokens.
// Source: https://developers.openai.com/api/docs/pricing#images
window.LightCanvasCosts=(()=>{
  const source='https://developers.openai.com/api/docs/pricing#images',asOf='2026-11-16';
  const rates={
    'gpt-image-2.6-sunburst':{textInput:5,imageInput:8,imageOutput:30},
    'gpt-image-2.6-flare':{textInput:5,imageInput:8,imageOutput:30},
    'gpt-image-2.5-sunburst':{textInput:5,imageInput:8,imageOutput:30},
    'gpt-image-2.5-flare':{textInput:5,imageInput:8,imageOutput:30},
    'gpt-image-2':{textInput:5,imageInput:8,imageOutput:30},
    'gpt-image-1.5':{textInput:5,imageInput:8,imageOutput:32,textOutput:10},
    'gpt-image-1-mini':{textInput:2,imageInput:2.5,imageOutput:8},
    'chatgpt-image-latest':{textInput:5,imageInput:8,imageOutput:32,textOutput:10}
  };
  const count=n=>Number.isSafeInteger(n)&&n>=0;
  const price=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
  function pricing(model){
    const family=(model||'').replace(/-\d{4}-\d{2}-\d{2}$/,'');
    return rates[family]?{model,family,rates:{...rates[family]},source,asOf,currency:'USD',label:'OpenAI 官方标准参考价'}:null;
  }
  function quote(run,provider){
    const snap=run.snapshot||{},model=run.model||snap.model,usage=run.usage;
    const frozen=snap.imagePricing,p=frozen?.rates&&frozen.model===model&&frozen.currency==='USD'?frozen:pricing(model);
    const rows=[],notes=[],missing=[];
    const add=(key,label,tokens,rate)=>{
      if(!count(tokens)){missing.push(`${label} Token 用量缺失`);return}
      if(!price(rate)){if(tokens>0)missing.push(`${label}单价未收录`);return}
      rows.push({key,label,tokens,rate,cost:tokens*rate/1e6});
    };
    if(!p){
      // Keep existing manually priced non-OpenAI integrations in USD only.
      const custom=Object.prototype.hasOwnProperty.call(snap,'inputPrice')?snap:provider||snap;
      if(custom.currency==='USD'&&usage&&count(usage.input_tokens)&&count(usage.output_tokens)&&price(custom.inputPrice)&&price(custom.outputPrice)){
        add('input','输入',usage.input_tokens,custom.inputPrice);add('output','输出',usage.output_tokens,custom.outputPrice);
        return {status:'complete',cost:rows.reduce((s,r)=>s+r.cost,0),currency:'USD',rows,notes,pricing:{model,label:'手动接口单价'}};
      }
      const images=run.imageDelivery?.length||run.assetIds?.length||0;
      if(custom.currency==='USD'&&price(custom.imagePrice)&&images>0){
        const cost=images*custom.imagePrice;rows.push({key:'images',label:'生成图片',tokens:images,rate:custom.imagePrice,cost,unit:'image'});
        return {status:'complete',cost,currency:'USD',rows,notes,pricing:{model,label:'手动每张图片单价'}};
      }
      return {status:'unavailable',cost:null,currency:'USD',rows,notes,reason:'未收录此模型的美元价格，无法自动估算。'};
    }
    if(!usage)return {status:'unavailable',cost:null,currency:'USD',rows,notes,pricing:p,reason:'API 未返回 Token 用量，无法估算。'};
    function split(total,details,kind){
      let text=details?.text_tokens,image=details?.image_tokens;
      if(!count(total)){missing.push(`${kind} Token 总量缺失`);return {}}
      if(total===0)return {text:0,image:0};
      if(count(text)&&!count(image))image=total-text;
      if(count(image)&&!count(text))text=total-image;
      if(!count(text)||!count(image)||text+image!==total){missing.push(`${kind}文本/图片 Token 分类缺失或不一致`);return {}}
      return {text,image};
    }
    const input=split(usage.input_tokens,usage.input_tokens_details,'输入');
    // Raster Images API output_tokens are image output when no split is returned.
    const output=usage.output_tokens_details?split(usage.output_tokens,usage.output_tokens_details,'输出'):{image:usage.output_tokens,text:0};
    if(count(input.text))add('text-input','文本输入',input.text,p.rates.textInput);
    if(count(input.image))add('image-input','图片输入',input.image,p.rates.imageInput);
    add('image-output','图片输出',output.image,p.rates.imageOutput);
    if(count(output.text)&&output.text>0)add('text-output','文本输出',output.text,p.rates.textOutput);
    if(usage.input_tokens_details?.cached_tokens>0||usage.input_tokens_details?.cached_tokens_details){notes.push('按标准输入价估算，未扣除无法核验的缓存优惠。')}
    const subtotal=rows.reduce((s,r)=>s+r.cost,0);
    return {status:missing.length?'partial':'complete',cost:missing.length?null:subtotal,subtotal,currency:'USD',pricing:p,rows,notes,reason:[...new Set(missing)].join('；')};
  }
  const usd=value=>`USD ${value.toLocaleString('en-US',{minimumFractionDigits:6,maximumFractionDigits:8})}`;
  return {pricing,quote,usd};
})();
