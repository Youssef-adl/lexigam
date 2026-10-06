import React,{useEffect,useState}from'react';
import {Link}from'react-router-dom';
import {ArrowUpRight,ChevronRight}from'lucide-react';
import api from'../axios';
import {useLanguage}from'../i18n/LanguageContext';
import useEditorialMotion from'../hooks/useEditorialMotion';

const fallback=[
 {id:'demo1',nom:'NOCTURNE OVERSHIRT',prix:890,image:'/webpImage/image-1.jpg'},
 {id:'demo2',nom:'ARCHIVE TROUSER',prix:690,image:'/webpImage/image-2.jpg'},
 {id:'demo3',nom:'AFTER DARK JACKET',prix:1190,image:'/webpImage/image-3.jpg'},
 {id:'demo4',nom:'DAILY UNIFORM TEE',prix:390,image:'/webpImage/image-5.jpg'},
 {id:'demo5',nom:'DISTRICT OVERSHIRT',prix:690,image:'/webpImage/image-6.jpg'},
 {id:'demo6',nom:'HEAVYWEIGHT HOODIE',prix:590,image:'/webpImage/image-7.jpg'},
 {id:'demo7',nom:'WIDE CARGO TROUSER',prix:640,image:'/webpImage/image-8.jpg'},
 {id:'demo8',nom:'CORE TEE / 02',prix:290,image:'/webpImage/image-11.jpg'}
];
function Card({p,i}){const image=p.image?.startsWith('http')?p.image:p.image?.startsWith('/')?p.image:'/webpImage/image-20.jpg';return <Link className='pb-product-card' data-motion='reveal' to={'/product/'+p.id}><div className='pb-product-img'><img src={image} alt={p.nom}/>{i<4&&<span className='pb-badge'>NEW</span>}<button onClick={e=>e.preventDefault()} aria-label='Wishlist'><ArrowUpRight size={14}/></button></div><div className='pb-product-meta'><div><strong>{p.nom}</strong><small>{i%3===0?'Relaxed fit':'Regular fit'}</small></div><b>{p.prix} DH</b></div></Link>}
function ArrowRightIcon(){return <ChevronRight size={15}/>}

export default function Home(){
 const {t,language}=useLanguage();useEditorialMotion();
 const [products,setProducts]=useState(fallback);
 useEffect(()=>{api.get('/produits').then(r=>{const x=r.data?.data||r.data||[];if(Array.isArray(x)&&x.length)setProducts(x.slice(0,8))}).catch(()=>{})},[]);
 return <main className='pb-home'>
  <section className='pb-hero pb-hero-editorial'><div className='pb-hero-image'><img src='/webpImage/image-19.jpg' alt='LEXIGAM campaign'/><div/></div><div className='pb-hero-copy'><small>LEXIGAM / AUTUMN WINTER 2026</small><h1>Wear<br/><i>the</i> everyday.</h1><p>{t.heroText}</p><Link to='/shop' className='pb-btn'>SHOP THE COLLECTION <ArrowUpRight size={16}/></Link></div><div className='pb-hero-count'>01 / 03</div></section>
  <div className='pb-promo-strip'>{t.freeDelivery}<Link to='/shop'>SHOP <ArrowUpRight size={12}/></Link></div>
  <section className='pb-new-block' data-motion='reveal'><div className='pb-new-heading'><small>NOUVEAU / NEW</small><h2>{language==='ar'?'الجديد': 'NOUVEAUTÉS'}</h2><Link to='/new-arrivals'>VIEW ALL PRODUCTS <ChevronRight size={14}/></Link></div><div className='pb-grid-4'>{products.slice(0,4).map((p,i)=><Card p={p} i={i} key={p.id}/>)}</div></section>
  <section className='pb-editorial-feature' data-motion='reveal'><img src='/webpImage/image-20.jpg' alt='LEXIGAM PhotoBook'/><div className='pb-editorial-copy'><small>PHOTOBOOK</small><h2>URBEX<br/><i>026.</i></h2><p>{t.photobookText}</p><Link to='/blog' className='pb-text-link'>{t.readStory}<ArrowUpRight size={15}/></Link></div></section>
  <section className='pb-section pb-featured' data-motion='reveal'><div className='pb-section-title'><div><small>03 / FEATURED</small><h2>{t.featuredTitle}</h2></div><Link to='/shop'>{t.allProducts}<ArrowRightIcon/></Link></div><div className='pb-grid-4'>{products.slice(4,8).map((p,i)=><Card p={p} i={i+4} key={p.id}/>)}</div></section>
  <section className='pb-flagship-visual' data-motion='reveal'><div className='pb-flagship-image'><img src='/webpImage/image-21.jpg' alt='LEXIGAM flagship Casablanca'/></div><div className='pb-flagship-copy'><small>04 / FLAGSHIP STORE</small><h2>MADE IN<br/><i>CASABLANCA.</i></h2><p>From first sketch to final garment, LEXIGAM grows from the streets, materials and people around the city.</p><Link to='/about' className='pb-text-link'>{t.aboutLink}<ArrowUpRight size={15}/></Link></div></section>
  <section className='pb-art-prints' data-motion='reveal'><div><small>05 / ART PRINTS</small><h2>WEAR IT.<br/><i>FRAME IT.</i></h2><p>Visual objects and pieces extending the world of the collection.</p><Link to='/shop' className='pb-text-link'>EXPLORE ART & OBJECTS <ArrowUpRight size={15}/></Link></div><img src='/webpImage/image-26.jpg' alt='LEXIGAM art prints'/></section>
  <section className='pb-service' data-motion='reveal'><div className='pb-section-title'><div><small>06 / SERVICE</small><h2>EVERYTHING YOU NEED.<br/>NOTHING EXTRA.</h2></div></div><div className='pb-service-grid pb-service-grid-visual'><article><img src='/webpImage/image-23.jpg' alt='Delivery visual'/><b>01</b><h3>FAST DELIVERY</h3><p>Prepared quickly with clear delivery information at checkout.</p></article><article><img src='/webpImage/image-24.jpg' alt='Payment visual'/><b>02</b><h3>SECURE PAYMENT</h3><p>Simple checkout with secure payment options for your order.</p></article><article><img src='/webpImage/image-25.jpg' alt='Support visual'/><b>03</b><h3>DIRECT SUPPORT</h3><p>Questions about sizing, stock or orders? Talk directly to LEXIGAM.</p></article></div></section>
  <section className='pb-newsletter' data-motion='reveal'><div><small>07 / NEWSLETTER</small><h2>{t.newsletterTitle}</h2></div><form onSubmit={e=>e.preventDefault()}><label>{t.email}</label><div><input type='email' placeholder={language==='ar'?'البريد الإلكتروني':'votre@email.com'}/><button>{t.join}<ArrowUpRight size={15}/></button></div></form></section>
 </main>;}
