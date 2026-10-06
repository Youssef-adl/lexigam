import {useEffect} from 'react';

export default function useEditorialMotion(){
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal=document.querySelectorAll('[data-motion="reveal"]');
  const parallax=document.querySelectorAll('[data-motion="parallax"]');
  const mapCards=document.querySelectorAll('[data-motion="map-card"]');
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')});
  },{threshold:0.12,rootMargin:'0px 0px -7% 0px'});
  reveal.forEach((el,i)=>{el.style.setProperty('--reveal-delay',Math.min(i%8,7)*70+'ms');observer.observe(el)});
  if(reduced){return()=>observer.disconnect()}
  let raf=0;
  const update=()=>{
   raf=0;
   const vh=window.innerHeight;
   const max=Math.max(1,document.documentElement.scrollHeight-vh);
   document.documentElement.style.setProperty('--scroll-progress',String(window.scrollY/max));
   parallax.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.bottom<0||rect.top>vh)return;
    const depth=Number(el.dataset.depth||el.dataset.speed||0.12);
    const center=vh/2-(rect.top+rect.height/2);
    el.style.setProperty('--parallax-y',center*depth+'px');
    el.style.setProperty('--parallax-scale',String(1+Math.min(0.035,Math.abs(center)/vh*0.02)));
   });
   mapCards.forEach((el,i)=>{
    const rect=el.getBoundingClientRect();
    if(rect.bottom<0||rect.top>vh)return;
    const depth=Number(el.dataset.depth||0.35);
    const center=(vh/2-(rect.top+rect.height/2))/(vh/2);
    el.style.setProperty('--map-y',center*42*depth+'px');
    el.style.setProperty('--map-r',center*(i%2?-2.2:2.2)*depth+'deg');
   });
  };
  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
  update();
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  return()=>{observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(raf)cancelAnimationFrame(raf)};
 },[]);
}