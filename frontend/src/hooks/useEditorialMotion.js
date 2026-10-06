import {useEffect} from 'react';

export default function useEditorialMotion(){
 useEffect(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal=document.querySelectorAll('[data-motion="reveal"]');
  const stages=document.querySelectorAll('[data-motion="stage"]');
  const parallax=document.querySelectorAll('[data-motion="parallax"]');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:0.1,rootMargin:'0px 0px -8%'});
  reveal.forEach((el,i)=>{el.style.setProperty('--reveal-delay',(i%6)*80+'ms');observer.observe(el)});
  let raf=0;
  const update=()=>{
   raf=0;
   const vh=window.innerHeight;
   const max=Math.max(1,document.documentElement.scrollHeight-vh);
   document.documentElement.style.setProperty('--scroll-progress',String(window.scrollY/max));
   stages.forEach(stage=>{
    const rect=stage.getBoundingClientRect();
    const total=Math.max(1,stage.offsetHeight-vh);
    const p=Math.min(1,Math.max(0,-rect.top/total));
    stage.style.setProperty('--stage-progress',p);
   });
   if(reduce)return;
   parallax.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.bottom<0||rect.top>vh)return;
    const depth=Number(el.dataset.depth||0.1);
    const center=vh/2-(rect.top+rect.height/2);
    el.style.setProperty('--parallax-y',center*depth+'px');
   });
  };
  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
  update();
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
  return()=>{observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(raf)cancelAnimationFrame(raf)};
 },[]);
}