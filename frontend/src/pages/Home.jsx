import React from 'react';
import SEO from '../components/SEO';
import {useEffect,useState}from'react';
import {Link}from'react-router-dom';
import {ArrowUpRight,ChevronRight,ChevronLeft}from'lucide-react';
import api from'../axios';
import {useLanguage}from'../i18n/LanguageContext';
import useEditorialMotion from'../hooks/useEditorialMotion';

const heroSlides=['/webpImage/image-20.jpg','/webpImage/image-22.jpg','/webpImage/image-21.jpg'];
const artPrints=[
 ['/webpImage/image-11.jpg','01 / LANDSCAPE'],
 ['/webpImage/image-14 copy.jpg','02 / FIGURE'],
 ['/webpImage/image-16.jpg','03 / COLOR STUDY'],
 ['/webpImage/image-21 copy.jpg','04 / BIRDS'],
 ['/webpImage/image-22.jpg','05 / OBJECT'],
 ['/webpImage/image-26 copy.jpg','06 / BLUE STUDY'],
 ['/webpImage/image-26.jpg','07 / FORM'],
 ['/webpImage/image-3 copy.jpg','08 / GEOMETRY'],
 ['/webpImage/image-8.jpg','09 / BIRDS / 02'],
];
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

function Card({p,i}){
 const image=p.image?.startsWith('http')?p.image:p.image?.startsWith('/')?p.image:'/webpImage/image-1.jpg';
 return <article className='pb-product-card' data-motion='reveal'>
  <div className='pb-product-img'>
   <Link to={'/product/'+p.id} aria-label={p.nom}><img src={image} alt={p.nom} loading='lazy' decoding='async'/></Link>
   {i<4&&<span className='pb-badge'>NEW</span>}
   <button onClick={e=>e.preventDefault()} aria-label='Wishlist'><ArrowUpRight size={14}/></button>
  </div>
  <div className='pb-product-meta'><div><Link to={'/product/'+p.id}><strong>{p.nom}</strong></Link><small>{i%3===0?'Relaxed fit':'Regular fit'}</small></div><b>{p.prix} DH</b></div>
 </article>
}
function ArrowRightIcon(){return <ChevronRight size={15}/>}

export default function Home(){
 const {t,language}=useLanguage();useEditorialMotion();
 const [products,setProducts]=useState(fallback),[hero,setHero]=useState(0),[artSlide,setArtSlide]=useState(1);
 useEffect(()=>{api.get('/produits').then(r=>{const x=r.data?.data||r.data||[];if(Array.isArray(x)&&x.length)setProducts(x.slice(0,8))}).catch(()=>{})},[]);
 useEffect(()=>{const id=setInterval(()=>setHero(v=>(v+1)%heroSlides.length),5500);return()=>clearInterval(id)},[]);
 return <><SEO title="Independent Clothing / Casablanca" description="Vêtements indépendants, objets graphiques et journal visuel depuis Casablanca."/><main className='pb-home'>
  <section className='pb-hero pb-hero-editorial'><div className='pb-hero-image'><img src={heroSlides[hero]} alt='LEXIGAM campaign'/><div/></div><div className='pb-hero-copy'><small>LEXIGAM / AUTUMN WINTER 2026</small><h1>Wear<br/><i>the</i> everyday.</h1><p>{t.heroText}</p><Link to='/shop' className='pb-btn'>SHOP THE COLLECTION <ArrowUpRight size={16}/></Link></div><div className='pb-hero-count'><span>{String(hero+1).padStart(2,'0')} / 03</span><div><button onClick={()=>setHero((hero+2)%3)}><ChevronLeft size={13}/></button><button onClick={()=>setHero((hero+1)%3)}><ChevronRight size={13}/></button></div></div></section>
  <div className='pb-promo-strip'>{t.freeDelivery}<Link to='/shop'>SHOP <ArrowUpRight size={12}/></Link></div>
  <section className='pb-new-block' data-motion='reveal'><div className='pb-new-heading'><small>NOUVEAU / NEW</small><h2>{language==='ar'?'الجديد':'NOUVEAUTÉS'}</h2><Link to='/new-arrivals'>VIEW ALL PRODUCTS <ChevronRight size={14}/></Link></div><div className='pb-grid-4'>{products.slice(0,4).map((p,i)=><Card p={p} i={i} key={p.id}/>)}</div></section>
  <section className='pb-editorial-feature' data-motion='reveal'><img src='/webpImage/image-22.jpg' alt='LEXIGAM PhotoBook'/><div className='pb-editorial-copy'><small>PHOTOBOOK / URBEX 026</small><h2>Urbex<br/><i>026.</i></h2><p>{t.photobookText}</p><Link to='/blog' className='pb-text-link'>{t.readStory}<ArrowUpRight size={15}/></Link></div></section>
  <section className='pb-section pb-featured' data-motion='reveal'><div className='pb-section-title'><div><small>03 / FEATURED</small><h2>{t.featuredTitle}</h2></div><Link to='/shop'>{t.allProducts}<ArrowRightIcon/></Link></div><div className='pb-grid-4'>{products.slice(4,8).map((p,i)=><Card p={p} i={i+4} key={p.id}/>)}</div></section>
  <section className='pb-flagship-visual' data-motion='reveal'><div className='pb-flagship-image'><img src='/webpImage/image-21.jpg' alt='LEXIGAM flagship Casablanca'/></div><div className='pb-flagship-copy'><small>04 / FLAGSHIP STORE</small><h2>MADE IN<br/><i>CASABLANCA.</i></h2><p>From first sketch to final garment, LEXIGAM grows from the streets, materials and people around the city.</p><Link to='/about' className='pb-text-link'>{t.aboutLink}<ArrowUpRight size={15}/></Link></div></section>
  <section className='pb-visual-journal' data-motion='reveal'><div className='pb-visual-journal-head'><small>05 / VISUAL JOURNAL</small><h2>STREET.<br/><i>STUDIO. OBJECT.</i></h2><p>Additional fragments from the LEXIGAM world, arranged as an editorial sequence.</p></div><div className='pb-visual-journal-grid'><figure className='vj-large'><img src='/webpImage/image-20 copy.jpg' alt='Street archive'/><figcaption>01 / STREET ARCHIVE</figcaption></figure><figure><img src='/webpImage/image-22 copy.jpg' alt='Night texture'/><figcaption>02 / NIGHT TEXTURE</figcaption></figure><figure><img src='/webpImage/image-29.jpg' alt='City reference'/><figcaption>03 / CITY REFERENCE</figcaption></figure><figure><img src='/webpImage/image-12 copy.jpg' alt='Material study'/><figcaption>04 / MATERIAL STUDY</figcaption></figure><figure className='vj-wide'><img src='/webpImage/image-17 copy.jpg' alt='Campaign study'/><figcaption>05 / CAMPAIGN STUDY</figcaption></figure><figure><img src='/webpImage/image-16.png' alt='Garment detail'/><figcaption>06 / GARMENT DETAIL</figcaption></figure><figure><img src='/webpImage/image-15.png' alt='City study'/><figcaption>07 / CITY STUDY</figcaption></figure></div></section>
  <section className='pb-art-prints pb-art-prints-showcase' data-motion='reveal'>
   <div className='pb-art-topline'><small>06 / ART PRINTS</small><span>VISUAL EDITIONS / LEXIGAM ARCHIVE</span></div>
   <div className='pb-art-stage'>
    <button className='pb-art-arrow left' type='button' aria-label='Previous art print' onClick={()=>setArtSlide(v=>(v-1+artPrints.length)%artPrints.length)}><ChevronLeft size={17}/></button>
    <div className='pb-art-track'>{[-1,0,1].map(offset=>{const index=(artSlide+offset+artPrints.length)%artPrints.length;const [src,label]=artPrints[index];return <figure key={src} className={'pb-art-frame '+(offset===0?'active':'')}><div><img src={src} alt={label} loading='lazy'/></div><figcaption>{label}</figcaption></figure>})}</div>
    <button className='pb-art-arrow right' type='button' aria-label='Next art print' onClick={()=>setArtSlide(v=>(v+1)%artPrints.length)}><ChevronRight size={17}/></button>
   </div>
   <div className='pb-art-bottom'><div className='pb-art-dots'>{artPrints.map((_,dot)=><button type='button' key={dot} className={dot===artSlide?'active':''} aria-label={'Go to art print '+(dot+1)} onClick={()=>setArtSlide(dot)}/>)}</div><Link to='/shop' className='pb-art-pill'>ART PRINTOVI <ArrowUpRight size={13}/></Link></div>
  </section>

  <section className='reference-services' data-motion='reveal'>
   <div className='reference-services-grid'>
    <article className='reference-service-card'>
      <img src='/webpImage/image-4.png' alt='' aria-hidden='true'/>
      <div><h3>OPCIJE DOSTAVE BRZOM POŠTOM</h3><p>Opcija dostave brzom poštom je dostupna za sve isporuke unutar Bosne i Hercegovine. Vrijeme isporuke putem kurirske službe BiH PostExpress je u roku 24–48 sati. Cijena poštarine iznosi 7,00 KM dok za narudžbe preko 100,00 KM poštarina je besplatna.</p></div>
    </article>
    <article className='reference-service-card'>
      <img src='/webpImage/image-10.png' alt='' aria-hidden='true'/>
      <div><h3>SIGURNO PLAĆANJE</h3><p>Monri predstavlja brz i siguran online sistem plaćanja narudžbi. Garantuje 100% sigurne transakcije i sigurnost podataka koje pošaljete. Podaci nikad neće biti dostupni trećim licima, a sigurnost Vaše kartice je garantovana najnaprednijom tehnologijom enkripcije zahvaljujući SSL protokolu.</p></div>
    </article>
   </div>
  </section>

  <section className='reference-support-strip' data-motion='reveal'>
    <div className='reference-support-card'><img src='/webpImage/image-4.png' alt=''/><span>DELIVERY</span></div>
    <div className='reference-support-card'><img src='/webpImage/image-9.png' alt=''/><span>PAYMENT</span></div>
    <div className='reference-support-card'><img src='/webpImage/image-9.png' alt=''/><span>SECURE</span></div>
    <div className='reference-support-card'><img src='/webpImage/image-4.png' alt=''/><span>STUDIO</span></div>
  </section>

  <section className='pb-newsletter pb-newsletter-retail' data-motion='reveal'>
   <div className='pb-newsletter-copy'><small>08 / NEWSLETTER</small><h2>{language==='ar'?'كون أول من يعرف.':'STAY IN THE LOOP.'}</h2><p>{language==='ar'?'اكتشف الجديد، التخفيضات والإصدارات قبل الجميع.':'New drops, visual stories and private offers — straight to your inbox.'}</p></div>
   <form onSubmit={e=>e.preventDefault()} className='pb-newsletter-form'><label>{language==='ar'?'بريدك الإلكتروني':'EMAIL ADDRESS'}</label><div className='pb-newsletter-input'><input type='email' placeholder={language==='ar'?'البريد الإلكتروني':'email@lexigam.com'} aria-label='Email address' required/><button type='submit'>{language==='ar'?'تأكيد':'CONFIRM'} <ArrowUpRight size={14}/></button></div><span>{language==='ar'?'يمكنك إلغاء الاشتراك في أي وقت.':'You can unsubscribe at any time.'}</span></form>
  </section>
 </main></>;
}
