import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ChevronLeft,ChevronRight} from 'lucide-react';
import api from '../axios';

const slides=[
 {k:'01',eyebrow:'AUTUMN / WINTER 2026',title:'URBEX / CASABLANCA',img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=90'},
 {k:'02',eyebrow:'LEXIGAM STUDY 02',title:'NIGHT SHIFT',img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90'},
 {k:'03',eyebrow:'LEXIGAM STUDY 03',title:'DAILY UNIFORM',img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=90'}
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
function ProductCard({p}){const image=p.image?.startsWith('http')?p.image:'http://localhost:8000'+(p.image||'');return <Link className='ma-product' to={'/product/'+p.id}><div className='ma-product-image'><img src={image} alt={p.nom}/><span>NEW</span><b><ArrowUpRight size={16}/></b></div><div className='ma-product-info'><strong>{p.nom}</strong><em>{p.prix} DH</em></div></Link>}
export default function Home(){
 const [products,setProducts]=useState(fallback),[slide,setSlide]=useState(0);
 useEffect(()=>{api.get('/produits').then(r=>{const x=r.data?.data||r.data||[];if(Array.isArray(x)&&x.length)setProducts(x.slice(0,8))}).catch(()=>{})},[]);
 useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%slides.length),6000);return()=>clearInterval(t)},[]);
 const hero=slides[slide];
 return <div className='ma-home'>
  <section className='ma-hero'>{slides.map((s,i)=><img key={s.k} className={i===slide?'is-active':''} src={s.img} alt={s.title}/>)}<div className='ma-hero-shade'/><div className='ma-hero-copy'><span>{hero.eyebrow}</span><h1>{hero.title}</h1><p>Independent garments, graphic objects and everyday uniforms from Casablanca.</p><Link className='ma-button' to='/shop'>SHOP THE COLLECTION <ArrowUpRight size={16}/></Link></div><div className='ma-hero-footer'><span>{hero.k} / 03</span><div>{slides.map((s,i)=><button aria-label={'Slide '+(i+1)} key={s.k} className={i===slide?'active':''} onClick={()=>setSlide(i)}/>)}</div><span>LEXIGAM® / 2026</span></div><button className='ma-hero-nav ma-left' onClick={()=>setSlide((slide-1+slides.length)%slides.length)}><ChevronLeft size={20}/></button><button className='ma-hero-nav ma-right' onClick={()=>setSlide((slide+1)%slides.length)}><ChevronRight size={20}/></button></section>
  <section className='ma-section'><div className='ma-section-head'><div><small>01 / NEW</small><h2>Fresh from the studio.</h2></div><Link to='/shop'>ALL PRODUCTS <ArrowUpRight size={14}/></Link></div><div className='ma-product-grid ma-grid-4'>{products.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
  <section className='ma-photo'><img src='https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2400&q=90' alt='LEXIGAM PhotoBook'/><div className='ma-photo-overlay'/><div className='ma-photo-copy'><small>PHOTOBOOK / 026</small><h2>STREET<br/><i>STUDY.</i></h2><p>A visual diary of movement, concrete, fabric and the city after dark.</p><Link className='ma-outline-button' to='/blog'>READ THE STORY <ArrowUpRight size={15}/></Link></div></section>
  <section className='ma-section'><div className='ma-section-head'><div><small>02 / FEATURED</small><h2>The LEXIGAM edit.</h2></div><Link to='/shop'>SHOP ALL <ArrowUpRight size={14}/></Link></div><div className='ma-product-grid ma-grid-4'>{products.slice(0,8).map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
  <section className='ma-story'><div className='ma-story-image'><img src='https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1500&q=90' alt='LEXIGAM studio'/></div><div className='ma-story-copy'><small>03 / THE HOUSE</small><h2>Made for the<br/><i>everyday.</i></h2><p>LEXIGAM is a Casablanca clothing project built around clean proportions, heavy fabrics and graphic references. We make pieces to be worn hard, often and differently.</p><Link className='ma-text-link' to='/about'>ABOUT LEXIGAM <ArrowUpRight size={15}/></Link></div></section>
  <section className='ma-category'><div className='ma-section-head'><div><small>04 / WORLDS</small><h2>Wear your own version.</h2></div></div><div className='ma-category-grid'><Link to='/men'><img src='https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1300&q=85' alt='Men'/><span>MEN <ArrowUpRight size={15}/></span></Link><Link to='/women'><img src='https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1300&q=85' alt='Women'/><span>WOMEN <ArrowUpRight size={15}/></span></Link><Link to='/shop'><img src='https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1300&q=85' alt='Objects'/><span>OBJECTS <ArrowUpRight size={15}/></span></Link></div></section>
  <section className='ma-service'><div><small>05 / SERVICE</small><h2>Built around the<br/><i>way you shop.</i></h2></div><div className='ma-service-grid'><article><span>01</span><h3>FAST DELIVERY</h3><p>Orders are prepared quickly, with delivery information shown clearly at checkout.</p></article><article><span>02</span><h3>SECURE PAYMENT</h3><p>Use the payment methods available for your order with a secure checkout flow.</p></article><article><span>03</span><h3>DIRECT SUPPORT</h3><p>Questions about fit, stock or orders? Reach the LEXIGAM team directly.</p></article></div></section>
  <section className='ma-newsletter'><div><small>06 / STAY CLOSE</small><h2>New drops.<br/><i>No noise.</i></h2></div><form onSubmit={e=>e.preventDefault()}><label>EMAIL ADDRESS</label><div><input type='email' placeholder='your@email.com'/><button>JOIN <ArrowUpRight size={15}/></button></div></form></section>
 </div>
}