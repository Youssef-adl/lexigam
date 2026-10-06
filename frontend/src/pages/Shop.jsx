import React,{useEffect,useMemo,useState}from'react';
import {useDispatch}from'react-redux';
import {Link,useLocation}from'react-router-dom';
import {Heart,SlidersHorizontal,X,ChevronDown,ArrowUpRight}from'lucide-react';
import api from'../axios';
import {addToCart}from'../store/cartSlice';
import {useLanguage}from'../i18n/LanguageContext';

const demo=[
 ['ARCHIVE BOMBER',890,'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=90'],
 ['HEAVYWEIGHT HOODIE',590,'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=90'],
 ['WIDE CARGO TROUSER',640,'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=90'],
 ['CORE TEE / 02',290,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=90'],
 ['DISTRICT OVERSHIRT',690,'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=90'],
 ['RAW DENIM 01',720,'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=90'],
 ['AFTER DARK JACKET',1190,'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=90'],
 ['FIELD TEE / 01',350,'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=90']
];
const fits=['ALL','STRAIGHT','BAGGY','RELAXED','SLIM','WIDE LEG'];
const colors=['BLACK','WHITE','BLUE','GREY','GREEN'];
const sizes=['XS','S','M','L','XL'];

export default function Shop({category='All Products'}){
 const {t,language}=useLanguage();const[d,setD]=useState([]),[load,setLoad]=useState(true),[drawer,setDrawer]=useState(false),[fit,setFit]=useState('ALL'),[color,setColor]=useState('ALL'),[size,setSize]=useState('ALL'),[sort,setSort]=useState('NEW');
 const loc=useLocation(),dispatch=useDispatch(),q=new URLSearchParams(loc.search).get('nom');
 useEffect(()=>{api.get(q?'/produits?nom='+encodeURIComponent(q):'/produits').then(x=>setD(x.data?.data||x.data||[])).catch(()=>setD([])).finally(()=>setLoad(false))},[q]);
 const data=useMemo(()=>{let arr=d.length?d:demo.map((x,i)=>({id:'demo'+i,nom:x[0],prix:x[1],description:'Premium everyday garment.',image:x[2],taille:'M'}));if(q)arr=arr.filter(p=>(p.nom||'').toLowerCase().includes(q.toLowerCase()));if(fit!=='ALL')arr=arr.filter(p=>(p.description||p.nom||'').toLowerCase().includes(fit.toLowerCase()));if(sort==='PRICE_LOW')arr=[...arr].sort((a,b)=>Number(a.prix)-Number(b.prix));if(sort==='PRICE_HIGH')arr=[...arr].sort((a,b)=>Number(b.prix)-Number(a.prix));return arr},[d,q,fit,sort]);
 const title=category==='Men'?t.men:category==='Women'?t.women:category==='New Arrivals'?t.new:t.allProducts;
 const img=p=>p?.image?.startsWith('http')?p.image:p?.image?.startsWith('/')?p.image:'http://localhost:8000'+(p?.image||'');
 return <div className="pb-shop">
  <div className="pb-shop-crumb">HOME / {t.shop} / {title}</div>
  <header className="pb-shop-head"><div><small>LEXIGAM / SHOP</small><h1>{title}</h1><p>{language==='ar'?'مجموعة من القطع المختارة للموسم.':'Une sélection de pièces pour la saison.'}</p></div><span>{data.length} PRODUCTS</span></header>
  <div className="pb-shop-nav"><div className="pb-categories"><Link to="/shop" className={category==='All Products'?'active':''}>ALL</Link><Link to="/men" className={category==='Men'?'active':''}>{t.men}</Link><Link to="/women" className={category==='Women'?'active':''}>{t.women}</Link><Link to="/new-arrivals" className={category==='New Arrivals'?'active':''}>{t.new}</Link></div><div className="pb-sort"><button onClick={()=>setDrawer(true)}><SlidersHorizontal size={15}/> FILTER</button><label>SORT<select value={sort} onChange={e=>setSort(e.target.value)}><option value="NEW">NEWEST</option><option value="PRICE_LOW">PRICE LOW</option><option value="PRICE_HIGH">PRICE HIGH</option></select><ChevronDown size={13}/></label></div></div>
  {load?<div className="pb-loading">LOADING PRODUCTS</div>:<div className="pb-shop-grid">{data.map((p,i)=><article className="pb-shop-card" key={p.id}><Link to={'/product/'+p.id} className="pb-shop-img"><img src={img(p) || demo[i%demo.length][2]} alt={p.nom}/><span>{i<4?'NEW':''}</span><button onClick={e=>e.preventDefault()} aria-label="Wishlist"><Heart size={17}/></button></Link><div className="pb-shop-info"><div><strong>{p.nom}</strong><small>{p.description||'LEXIGAM / 026'}</small></div><b>{p.prix} DH</b></div><button className="pb-add" onClick={()=>dispatch(addToCart(p))}>ADD TO BAG</button></article>)}</div>}
  {drawer&&<aside className="pb-filter-drawer"><div className="pb-filter-top"><strong>FILTERS</strong><button onClick={()=>setDrawer(false)}><X/></button></div><div className="pb-filter-block"><span>FIT</span>{fits.map(x=><button className={fit===x?'selected':''} key={x} onClick={()=>setFit(x)}>{x}</button>)}</div><div className="pb-filter-block"><span>COLOR</span>{colors.map(x=><button className={color===x?'selected':''} key={x} onClick={()=>setColor(x)}>{x}</button>)}</div><div className="pb-filter-block"><span>SIZE</span>{sizes.map(x=><button className={size===x?'selected':''} key={x} onClick={()=>setSize(x)}>{x}</button>)}</div><button className="pb-filter-apply" onClick={()=>setDrawer(false)}>APPLY FILTERS <ArrowUpRight size={16}/></button></aside>}
 </div>
}