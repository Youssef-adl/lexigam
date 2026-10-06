import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ChevronLeft,ChevronRight,Plus,Minus} from 'lucide-react';
import api from '../axios';
import {useLanguage} from '../i18n/LanguageContext';
import useEditorialMotion from '../hooks/useEditorialMotion';

const slides=[
 {k:'01',img:'/webpImage/image-10.avif'},
 {k:'02',img:'/webpImage/image-19.avif'},
 {k:'03',img:'/webpImage/image-26.avif'}
];
const fallback=[
 {id:'demo1',nom:'NOCTURNE OVERSHIRT',prix:890,image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85'},
 {id:'demo2',nom:'ARCHIVE TROUSER',prix:690,image:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85'},
 {id:'demo3',nom:'AFTER DARK JACKET',prix:1190,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85'},
 {id:'demo4',nom:'DAILY UNIFORM TEE',prix:390,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'},
 {id:'demo5',nom:'DISTRICT OVERSHIRT',prix:690,image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85'},
 {id:'demo6',nom:'HEAVYWEIGHT HOODIE',prix:590,image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85'},
 {id:'demo7',nom:'WIDE CARGO TROUSER',prix:640,image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'},
 {id:'demo8',nom:'CORE TEE / 02',prix:290,image:'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=85'}
];
const archiveImages=['/webpImage/image-20.avif','/webpImage/image-21.avif','/webpImage/image-22.avif','/webpImage/image-23.avif','/webpImage/image-24.avif','/webpImage/image-25.avif'];
function ProductCard({p}){const image=p.image?.startsWith('http')?p.image:p.image||'/webpImage/image-20.avif';return <Link className="ma-product" data-motion="reveal" to={'/product/'+p.id}><div className="ma-product-image"><img src={image} alt={p.nom}/><span>NEW</span><b><ArrowUpRight size={16}/></b></div><div className="ma-product-info"><strong>{p.nom}</strong><em>{p.prix} DH</em></div></Link>}

export default function Home(){
 const {t,language}=useLanguage();
 useEditorialMotion();
 const [products,setProducts]=useState(fallback),[slide,setSlide]=useState(0);
 useEffect(()=>{api.get('/produits').then(r=>{const x=r.data?.data||r.data||[];if(Array.isArray(x)&&x.length)setProducts(x.slice(0,8))}).catch(()=>{})},[]);
 useEffect(()=>{const timer=setInterval(()=>setSlide(s=>(s+1)%slides.length),6500);return()=>clearInterval(timer)},[]);
 const hero=slides[slide];
 return <div className={'ma-home '+(language==='ar'?'home-ar':'')}><div className="ma-intro-curtain"><span>LEXIGAM® / 2026</span></div>
  <div className="ma-ticker"><span>{t.ticker}</span><span>{t.ticker}</span><span>{t.ticker}</span></div>
  <section className="ma-hero" data-motion="reveal">{slides.map((s,i)=><img key={s.k} className={i===slide?'is-active':''} data-motion="parallax" data-depth="0.08" src={s.img} alt="LEXIGAM campaign"/>)}<div className="ma-hero-shade"/><div className="ma-hero-copy"><span>{t.heroEyebrow}</span><h1>{hero.k} / {t.heroTitle}</h1><p>{t.heroText}</p><Link className="ma-button" to="/shop">{t.shopCollection}<ArrowUpRight size={16}/></Link></div><div className="ma-hero-footer"><span>{hero.k} / 03</span><div>{slides.map((s,i)=><button aria-label={'Slide '+(i+1)} key={s.k} className={i===slide?'active':''} onClick={()=>setSlide(i)}/>)}</div><span>LEXIGAM® / 2026</span></div><button className="ma-hero-nav ma-left" aria-label="Previous" onClick={()=>setSlide((slide-1+slides.length)%slides.length)}><ChevronLeft size={20}/></button><button className="ma-hero-nav ma-right" aria-label="Next" onClick={()=>setSlide((slide+1)%slides.length)}><ChevronRight size={20}/></button></section>

  <section className="ma-section" data-motion="reveal"><div className="ma-section-head" data-motion="reveal"><div><small>{t.new}</small><h2>{t.newTitle}</h2></div><Link to="/shop">{t.allProducts}<ArrowUpRight size={14}/></Link></div><div className="ma-product-grid ma-grid-4">{products.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}</div></section>

  <section className="ma-paper-break" data-motion="reveal"><div className="ma-paper-label">01 / {t.archive}</div><div className="ma-paper-copy"><span>LEXIGAM / FIELD 01</span><h2>{language==='ar'?'أرشيف المدينة':'ARCHIVE OF THE CITY'}</h2><p>{t.archiveText}</p></div><Link to="/blog" className="ma-paper-button">ENTER ARCHIVE<ArrowUpRight size={15}/></Link></section>

  <section className="ma-photo" data-motion="reveal"><img data-motion="parallax" data-depth="0.14" src="/webpImage/image-27.avif" alt="LEXIGAM PhotoBook"/><div className="ma-photo-overlay"/><div className="ma-photo-copy"><small>{t.photobook}</small><h2>{t.photobookTitle}</h2><p>{t.photobookText}</p><Link className="ma-outline-button" to="/blog">{t.readStory}<ArrowUpRight size={15}/></Link></div></section>

  <section className="ma-section"><div className="ma-section-head"><div><small>{t.featured}</small><h2>{t.featuredTitle}</h2></div><Link to="/shop">{t.allProducts}<ArrowUpRight size={14}/></Link></div><div className="ma-product-grid ma-grid-4">{products.slice(0,8).map((p,i)=><ProductCard key={p.id} p={p}/>)}</div></section>

  <section className="ma-map-story" data-motion="reveal"><div className="ma-map-top"><div><small>02 / {t.field}</small><h2>{language==='ar'?'خريطة المراجع':'REFERENCE MAP'}</h2><p>{t.fieldText}</p></div><div className="ma-map-tools"><span>MAP</span><button aria-label="Zoom in"><Plus size={15}/></button><button aria-label="Zoom out"><Minus size={15}/></button></div></div><div className="ma-map-canvas"><div className="map-lines"/><div className="map-route map-route-a"/><div className="map-route map-route-b"/>{archiveImages.map((img,i)=><article key={img} className={'map-card map-card-'+i} data-motion="map-card" data-depth={0.25+i*0.05}><img src={img} alt={'Archive reference '+(i+1)}/><span>0{i+1} / FIELD</span></article>)}<div className="map-pin map-pin-a">CASABLANCA</div><div className="map-pin map-pin-b">NIGHT / STUDY</div><div className="map-pin map-pin-c">MATERIAL / FORM</div></div></section>

  <section className="ma-story" data-motion="reveal"><div className="ma-story-image"><img data-motion="parallax" data-depth="0.1" src="/webpImage/image-28.avif" alt="LEXIGAM studio"/></div><div className="ma-story-copy"><small>{t.theHouse}</small><h2>{t.houseTitle}</h2><p>{t.houseText}</p><Link className="ma-text-link" to="/about">{t.aboutLink}<ArrowUpRight size={15}/></Link></div></section>

  <section className="ma-field-notes" data-motion="reveal"><div className="ma-field-intro"><small>{t.field}</small><h2>{t.fieldTitle}</h2><p>{t.fieldText}</p></div><div className="ma-note-grid">{archiveImages.map((img,i)=><article key={img} className={i===0?'wide':''}><img src={img} alt={'LEXIGAM field note '+(i+1)}/><div><span>0{i+1}</span><strong>{['CONCRETE','NIGHT','TEXTURE','MOVEMENT','STUDIO','STREET'][i]}</strong></div></article>)}</div></section>

  <section className="ma-category" data-motion="reveal"><div className="ma-section-head"><div><small>{t.worlds}</small><h2>{t.worldsTitle}</h2></div></div><div className="ma-category-grid"><Link to="/men"><img src="/webpImage/image-30.avif" alt={t.men}/><span>{t.men}<ArrowUpRight size={15}/></span></Link><Link to="/women"><img src="/webpImage/image-31.avif" alt={t.women}/><span>{t.women}<ArrowUpRight size={15}/></span></Link><Link to="/shop"><img src="/webpImage/image-34.avif" alt={t.objects}/><span>{t.objects}<ArrowUpRight size={15}/></span></Link></div></section>

  <section className="ma-service" data-motion="reveal"><div><small>{t.service}</small><h2>{t.serviceTitle}</h2></div><div className="ma-service-grid"><article><span>01</span><h3>{t.delivery}</h3><p>{language==='ar'?'نحضّر الطلبات بسرعة مع معلومات توصيل واضحة.':'Commandes préparées rapidement avec des informations de livraison claires.'}</p></article><article><span>02</span><h3>{t.payment}</h3><p>{language==='ar'?'خيارات دفع آمنة ومعلومات واضحة قبل تأكيد الطلب.':'Des options de paiement sécurisées et transparentes avant validation.'}</p></article><article><span>03</span><h3>{t.support}</h3><p>{language==='ar'?'أسئلة حول المقاس أو المخزون أو الطلب؟ تواصل مباشرة مع LEXIGAM.':'Une question sur la taille, le stock ou une commande ? Contacte directement LEXIGAM.'}</p></article></div></section>

  <section className="ma-newsletter" data-motion="reveal"><div><small>{t.newsletter}</small><h2>{t.newsletterTitle}</h2></div><form onSubmit={e=>e.preventDefault()}><label>{t.email}</label><div><input type="email" placeholder={language==='ar'?'your@email.com':'votre@email.com'}/><button>{t.join}<ArrowUpRight size={15}/></button></div></form></section>
 </div>
}