import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveRight } from 'lucide-react';

const cards=[
 {title:'OUTERWEAR',meta:'01 / THE FORM',img:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=85'},
 {title:'UNIFORMS',meta:'02 / DAILY OBJECTS',img:'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1400&q=85'},
 {title:'AFTER DARK',meta:'03 / NIGHT SERIES',img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85'}
];
const products=[
 ['DISTRICT OVERSHIRT','690 DH','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85'],
 ['HEAVYWEIGHT HOODIE','590 DH','https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85'],
 ['WIDE CARGO TROUSER','640 DH','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'],
 ['CORE TEE / 02','290 DH','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85']
];

export default function Home(){
 return <div>
  <section className="fashion-hero">
   <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90" alt="Campaign"/>
   <div className="hero-shade"/>
   <div className="hero-copy"><span className="eyebrow">AUTUMN / WINTER 2026</span><h1>WEAR<br/><em>THE</em> UNKNOWN.</h1><p>Independent uniforms for people who move differently.</p><Link className="fashion-cta" to="/shop">SHOP THE COLLECTION <ArrowUpRight size={18}/></Link></div>
   <div className="hero-index">CAMPAIGN 026 — 01/05</div>
  </section>
  <section className="manifesto container-wide"><span className="manifesto-number">01</span><div><span className="eyebrow">THE NEW UNIFORM</span><h2>Clothes with a point of view.</h2><p className="manifesto-text">Heavyweight fabrics, considered proportions and a little bit of disorder. Designed to live outside the feed.</p></div><Link className="text-link" to="/shop">SHOP THE ARCHIVE <MoveRight size={17}/></Link></section>
  <section className="editorial-grid">{cards.map(c=><Link className="editorial-card" to="/shop" key={c.title}><img src={c.img} alt={c.title}/><div className="editorial-overlay"/><div className="editorial-meta"><span>{c.meta}</span><ArrowUpRight size={18}/></div><h3>{c.title}</h3></Link>)}</section>
  <section className="products-section container-wide"><div className="section-head"><div><span className="eyebrow">SELECTED PIECES</span><h2>New arrivals</h2></div><Link className="text-link" to="/shop">VIEW ALL <MoveRight size={17}/></Link></div><div className="home-product-grid">{products.map(p=><article className="home-product" key={p[0]}><div className="home-product-image"><img src={p[2]} alt={p[0]}/><span>NEW</span></div><div className="home-product-info"><strong>{p[0]}</strong><span>{p[1]}</span></div></article>)}</div></section>
  <section className="campaign-split"><div className="campaign-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90" alt="Lookbook"/></div><div className="campaign-copy"><span className="eyebrow">LOOKBOOK / 026</span><h2>Nothing<br/><em>ordinary.</em></h2><p>A visual study of texture, movement and the people who give clothes their meaning.</p><Link className="fashion-cta dark" to="/shop">EXPLORE LOOKBOOK <ArrowUpRight size={18}/></Link></div></section>
  <section className="newsletter container-wide"><div><span className="eyebrow">STAY IN THE LOOP</span><h2>Get the next drop first.</h2></div><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="YOUR EMAIL ADDRESS"/><button>JOIN <ArrowUpRight size={18}/></button></form></section>
 </div>
}