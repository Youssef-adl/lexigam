import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ChevronDown,Plus,Minus} from 'lucide-react';
import api from '../axios';
import {useLanguage} from '../i18n/LanguageContext';
import useEditorialMotion from '../hooks/useEditorialMotion';

const editorial=['/webpImage/image-20.avif','/webpImage/image-21.avif','/webpImage/image-22.avif','/webpImage/image-23.avif','/webpImage/image-24.avif','/webpImage/image-25.avif'];
const productsFallback=[
 {id:'demo1',nom:'NOCTURNE OVERSHIRT',prix:890,image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo2',nom:'ARCHIVE TROUSER',prix:690,image:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo3',nom:'AFTER DARK JACKET',prix:1190,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo4',nom:'DAILY UNIFORM TEE',prix:390,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo5',nom:'DISTRICT OVERSHIRT',prix:690,image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo6',nom:'HEAVYWEIGHT HOODIE',prix:590,image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo7',nom:'WIDE CARGO TROUSER',prix:640,image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90'},
 {id:'demo8',nom:'CORE TEE / 02',prix:290,image:'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=90'}
];

function ProductCard({p,index}){const img=p.image?.startsWith('http')?p.image:p.image?.startsWith('/')?p.image:'/webpImage/image-20.avif';return <Link className={'cin-product c'+index} data-motion='reveal' to={'/product/'+p.id}><div className='cin-product-photo'><img src={img} alt={p.nom}/><span>0{index+1}</span><b><ArrowUpRight size={17}/></b></div><div className='cin-product-meta'><strong>{p.nom}</strong><em>{p.prix} DH</em></div></Link>}

export default function Home(){
 const {t,language}=useLanguage();
 useEditorialMotion();
 const [products,setProducts]=useState(productsFallback);
 useEffect(()=>{api.get('/produits').then(r=>{const x=r.data?.data||r.data||[];if(Array.isArray(x)&&x.length)setProducts(x)}).catch(()=>{})},[]);
 const productSet=products.slice(0,8);
 return <div className={'cinematic-home '+(language==='ar'?'home-ar':'')}>
  <div className='cin-progress'/><div className='cin-intro'><div className='cin-intro-noise'/><span>LEXIGAM® / 2026</span><strong>THE<br/><i>ARCHIVE</i></strong><small>{language==='ar'?'اسحب للأسفل للدخول':'SCROLL TO ENTER'}</small><ChevronDown size={17}/></div>

  <section className='cin-scene cin-hero-scene'>
   <div className='cin-hero-bg'><img src='/webpImage/image-10.avif' alt='LEXIGAM visual'/><div className='cin-hero-grain'/></div>
   <div className='cin-hero-copy'><small>01 / {t.heroEyebrow}</small><h1>LEXIGAM<br/><i>FIELD</i> / 026</h1><p>{t.heroText}</p><Link to='/shop' className='cin-button'>{t.shopCollection}<ArrowUpRight size={15}/></Link></div>
   <div className='cin-hero-coord'>33°34′N / 7°36′W</div><div className='cin-hero-index'>01—03</div>
  </section>

  <section className='cin-paper-scene' data-motion='reveal'><div className='cin-paper-grid'/><div className='cin-torn top'/><div className='cin-torn bottom'/><span>FIELD NOTE / 01</span><h2>{language==='ar'?'أرشيف المدينة':'ARCHIVE OF<br/>THE CITY'}</h2><p>{t.archiveText}</p><div className='cin-paper-mark'>LEXIGAM / CASABLANCA</div><Link to='/blog' className='cin-paper-link'>{language==='ar'?'دخول الأرشيف':'ENTER ARCHIVE'} <ArrowUpRight size={14}/></Link></section>

  <section className='cin-editorial-sequence'><div className='cin-seq-sticky'><div className='cin-seq-copy'><small>02 / VISUAL STUDY</small><h2>STREET<br/><i>STUDY.</i></h2><p>{t.photobookText}</p></div><div className='cin-seq-images'>{editorial.slice(0,4).map((img,i)=><img key={img} className={'seq-img s'+i} src={img} alt={'LEXIGAM visual '+(i+1)}/>)}</div><div className='cin-seq-caption'>FRAME <span>00 / 04</span></div></div></section>

  <section className='cin-product-stage' data-motion='stage'><div className='cin-stage-sticky'><div className='cin-stage-head'><div><small>03 / COLLECTION 026</small><h2>{t.featuredTitle}</h2></div><Link to='/shop'>{t.allProducts}<ArrowUpRight size={14}/></Link></div><div className='cin-stage-rail'>{productSet.map((p,i)=><ProductCard key={p.id} p={p} index={i}/>)}</div><div className='cin-stage-count'>SCROLL / 08 PIECES</div></div></section>

  <section className='cin-map-stage' data-motion='stage'><div className='cin-map-sticky'><div className='cin-map-head'><div><small>04 / {t.field}</small><h2>{language==='ar'?'خريطة المراجع':'REFERENCE MAP'}</h2><p>{t.fieldText}</p></div><div className='cin-map-tools'><span>MAP</span><button><Plus size={14}/></button><button><Minus size={14}/></button></div></div><div className='cin-map'><div className='cin-map-paper'/><div className='cin-route r1'/><div className='cin-route r2'/><div className='cin-route r3'/>{editorial.map((img,i)=><article key={img} className={'cin-pin pin'+i} style={{'--pin':i}}><img src={img} alt={'Map archive '+i}/><span>0{i+1} / FIELD</span></article>)}<div className='cin-label l1'>CASABLANCA</div><div className='cin-label l2'>NIGHT / STUDY</div><div className='cin-label l3'>FORM / MATERIAL</div></div></div></section>

  <section className='cin-split-scene' data-motion='reveal'><div className='cin-split-image'><img data-motion='parallax' data-depth='0.08' src='/webpImage/image-28.avif' alt='LEXIGAM studio'/></div><div className='cin-split-copy'><small>05 / THE HOUSE</small><h2>{t.houseTitle}</h2><p>{t.houseText}</p><Link to='/about' className='cin-button dark'>{t.aboutLink}<ArrowUpRight size={15}/></Link></div></section>

  <section className='cin-archive-grid' data-motion='reveal'><div className='cin-archive-heading'><small>06 / {t.field}</small><h2>{t.fieldTitle}</h2><p>{t.fieldText}</p></div><div className='cin-grid'>{editorial.map((img,i)=><div className={'cin-grid-card g'+i} key={img}><img src={img} alt={'Field note '+i}/><span>0{i+1}</span><strong>{['CONCRETE','NIGHT','TEXTURE','MOVEMENT','STUDIO','STREET'][i]}</strong></div>)}</div></section>

  <section className='cin-final' data-motion='reveal'><div className='cin-final-bg'><img src='/webpImage/image-26.avif' alt='LEXIGAM world'/><div/></div><div className='cin-final-copy'><small>07 / THE WORLD</small><h2>WEAR<br/><i>YOUR</i><br/>VERSION.</h2><div><Link to='/men'>MEN <ArrowUpRight size={14}/></Link><Link to='/women'>WOMEN <ArrowUpRight size={14}/></Link><Link to='/shop'>OBJECTS <ArrowUpRight size={14}/></Link></div></div></section>

  <section className='cin-end'><small>08 / CLOSE THE LOOP</small><h2>{t.newsletterTitle}</h2><form onSubmit={e=>e.preventDefault()}><input type='email' placeholder={language==='ar'?'بريدك الإلكتروني':'votre@email.com'}/><button>{t.join}<ArrowUpRight size={15}/></button></form></section>
 </div>
}