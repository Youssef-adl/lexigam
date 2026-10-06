import {useEffect} from 'react';

export default function SEO({title,description,image,type='website',product}){
 useEffect(()=>{
  const full=title?title+' — LEXIGAM':'LEXIGAM — Independent Clothing / Casablanca';
  document.title=full;
  const set=(name,content)=>{let el=document.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement('meta');el.name=name;document.head.appendChild(el)}el.content=content||''};
  set('description',description||'Vêtements indépendants, objets graphiques et journal visuel depuis Casablanca.');
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=window.location.href.split('#')[0];
  const ldId='lexigam-jsonld';document.getElementById(ldId)?.remove();
  if(product){
   const script=document.createElement('script');script.id=ldId;script.type='application/ld+json';script.textContent=JSON.stringify({
    '@context':'https://schema.org','@type':'Product','name':product.nom,'description':product.description||'','image':image?[image]:[],'offers':{'@type':'Offer','priceCurrency':'MAD','price':product.prix,'availability':Number(product.stock)>0?'https://schema.org/InStock':'https://schema.org/OutOfStock','url':window.location.href}
   });document.head.appendChild(script);
  }
  return()=>document.getElementById(ldId)?.remove();
 },[title,description,image,product]);
 return null;
}
