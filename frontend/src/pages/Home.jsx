import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ChevronLeft,ChevronRight,ShieldCheck} from 'lucide-react';
import SEO from '../components/SEO';
import {useLanguage} from '../i18n/LanguageContext';
import useEditorialMotion from '../hooks/useEditorialMotion';
import './molimao-home.css';

const heroSlides=['/webpImage/image-20.jpg','/webpImage/image-22.jpg','/webpImage/image-21.jpg'];

const featured = [
  {name:'Ljubav, t-shirt femme manches courtes',price:'50.00 KM',sizes:['XS','S','M','L'],image:'/webpImage/image-14.jpg'},
  {name:'Šibica, t-shirt oversize homme manches courtes',price:'50.00 KM',sizes:['XS','S','M','L','XL','XXL'],image:'/webpImage/image-1.jpg'},
  {name:'Molimao « FRAME » portefeuille',price:'120.00 KM',sizes:[],image:'/webpImage/image-11 copy.jpg'},
  {name:'Icon, casquette',price:'60.00 KM',sizes:[],image:'/webpImage/image-17.jpg'},
  {name:'TAG, tote bag',price:'40.00 KM',sizes:[],image:'/webpImage/image-1 copy.jpg'},
  {name:'Krom, t-shirt oversize homme manches courtes',price:'60.00 KM',sizes:['XS','S','M','L','XL','XXL'],image:'/webpImage/image-4.jpg'},
  {name:'Dijamant, t-shirt oversize femme manches courtes',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-7.jpg'},
  {name:'Before, t-shirt homme manches courtes',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-15.jpg'},
];

const newProducts = [
  {name:'Grow, t-shirt oversize homme manches courtes',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-12.jpg'},
  {name:'Before, t-shirt homme manches courtes',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-15.jpg'},
  {name:'Cupid, t-shirt oversize femme manches courtes',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-9.jpg'},
  {name:'Dijamant, t-shirt oversize femme manches courtes',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-28.jpg'},
];

const artPrints = [
  '/webpImage/image-14 copy.jpg',
  '/webpImage/image-26.jpg',
  '/webpImage/image-21 copy.jpg',
  '/webpImage/image-2 copy.jpg',
  '/webpImage/image-11.jpg',
  '/webpImage/image-8.jpg',
];

function ProductCard({product}){
  return <article className="mm-product-card">
    <Link to="/shop" className="mm-product-image">
      <img src={product.image} alt={product.name} loading="lazy"/>
    </Link>
    {product.sizes.length>0 && <div className="mm-sizes">{product.sizes.map(s=><span key={s}>{s}</span>)}</div>}
    <div className="mm-product-name">{product.name}</div>
    <div className="mm-product-price">{product.price}</div>
  </article>;
}

export default function Home(){
  const {language,setLanguage,t}=useLanguage();
  useEditorialMotion();
  useEffect(()=>{if(language!=='fr')setLanguage('fr')},[language,setLanguage]);
  const [hero,setHero]=useState(0);
  const [artSlide,setArtSlide]=useState(0);
  const products=newProducts;

  const visibleArt=[0,1,2,3].map(offset=>artPrints[(artSlide+offset)%artPrints.length]);
    useEffect(()=>{const id=setInterval(()=>setHero(v=>(v+1)%heroSlides.length),5500);return()=>clearInterval(id)},[]);

  return <><SEO title="LEXIGAM — Vêtements indépendants" description="Vêtements indépendants, objets graphiques et journal visuel depuis Casablanca."/><main className="mm-home">
    <section className="pb-hero pb-hero-editorial">
      <div className="pb-hero-image"><img src={heroSlides[hero]} alt="LEXIGAM campaign"/><div/></div>
      <div className="pb-hero-copy">
        <small>{t.heroEyebrow}</small>
        <h1>{t.heroTitle.split(' / ')[0]}<br/><i>/</i> {t.heroTitle.split(' / ')[1]}</h1>
        <p>{t.heroText}</p>
        <Link to="/shop" className="pb-btn">{t.shopCollection} <ArrowUpRight size={16}/></Link>
      </div>
      <div className="pb-hero-count">
        <span>{String(hero+1).padStart(2,'0')} / 03</span>
        <div><button onClick={()=>setHero((hero+2)%3)}><ChevronLeft size={13}/></button><button onClick={()=>setHero((hero+1)%3)}><ChevronRight size={13}/></button></div>
      </div>
    </section>

    <section className="mm-service-top"><div className="mm-service-grid">
      <article><img src="/webpImage/image-10.png" alt="" aria-hidden="true"/><div><h3>OPTIONS DE LIVRAISON RAPIDE</h3><p>La livraison rapide est disponible pour toutes les commandes. Le délai de livraison est de 24 à 48 heures. Les frais sont de 7,00 KM, et la livraison est offerte pour les commandes de plus de 100,00 KM.</p></div></article>
      <article><ShieldCheck className="mm-shield" size={40} strokeWidth={1.4}/><div><h3>PAIEMENT SÉCURISÉ</h3><p>Monri propose un système de paiement en ligne rapide et sécurisé. Les transactions et les données sont protégées par les technologies de chiffrement SSL les plus avancées.</p></div></article>
    </div></section>

    <section className="mm-products-section"><header className="mm-section-heading centered"><div className="mm-eyebrow">NOUVEAUTÉS</div></header><div className="mm-new-grid">{products.map((p,i)=><ProductCard product={p} key={p.name+i}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">TOUS LES PRODUITS</Link></div></section>

    <section className="mm-story"><div className="mm-story-image"><img src="/webpImage/image-20.jpg" alt="Summer collection 26 Urbex"/></div><div className="mm-story-copy"><div className="mm-eyebrow">PHOTOBOOK</div><h2>COLLECTION ÉTÉ 26 — URBEX</h2><p>Urbex vient de l'expression Urban Exploration : l'exploration de lieux urbains abandonnés et oubliés. Cette série photo capture notre collection dans les espaces de notre nouveau studio.</p><Link to="/blog" className="mm-outline-btn">NASTAVI ČITANJE...</Link></div></section>

    <section className="mm-products-section mm-featured"><header className="mm-section-heading"><div className="mm-eyebrow">SÉLECTION</div></header><div className="mm-featured-grid">{featured.map((p,i)=><ProductCard product={p} key={p.name+i}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">TOUS LES PRODUITS</Link></div></section>

    <section className="mm-flagship"><div className="mm-flagship-copy"><div className="mm-eyebrow">LEXIGAM FLAGSHIP STORE</div><h2>LEXIGAM FLAGSHIP STORE</h2><p>Depuis août 2021, notre univers peut être découvert à Sarajevo, dans un lieu emblématique de la ville.</p><Link to="/about" className="mm-outline-btn">NASTAVI ČITANJE...</Link></div><div className="mm-flagship-image"><img src="/webpImage/image-3.jpg" alt="Flagship store Sarajevo"/></div></section>

    <section className="mm-art"><div className="mm-art-stage"><button type="button" aria-label="Previous art print" className="mm-art-arrow" onClick={()=>setArtSlide(v=>(v-1+artPrints.length)%artPrints.length)}><ChevronLeft size={18}/></button><div className="mm-art-track">{visibleArt.map((src,i)=><div className="mm-art-frame" key={src+i}><img src={src} alt="Art print" loading="lazy"/></div>)}</div><button type="button" aria-label="Next art print" className="mm-art-arrow" onClick={()=>setArtSlide(v=>(v+1)%artPrints.length)}><ChevronRight size={18}/></button></div><div className="mm-art-dots">{artPrints.slice(0,4).map((_,i)=><button key={i} className={i===artSlide%4?'active':''} onClick={()=>setArtSlide(i)} aria-label={'Art print '+(i+1)}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">ÉDITIONS ART</Link></div></section>

    <section className="mm-service-bottom"><div className="mm-service-grid"><article><img src="/webpImage/image-10.png" alt="" aria-hidden="true"/><div><h3>OPTIONS DE LIVRAISON RAPIDE</h3><p>La livraison rapide est disponible pour toutes les commandes. Le délai de livraison est de 24 à 48 heures. Les frais sont de 7,00 KM, et la livraison est offerte pour les commandes de plus de 100,00 KM.</p></div></article><article><ShieldCheck className="mm-shield" size={40} strokeWidth={1.4}/><div><h3>PAIEMENT SÉCURISÉ</h3><p>Monri predstavlja brz i siguran online sistem plaćanja narudžbi. Garantuje 100% sigurne transakcije i sigurnost podataka koje pošaljete.</p></div></article></div></section>
  </main></>;
}
