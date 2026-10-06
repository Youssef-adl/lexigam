import React,{useEffect,useMemo,useState}from'react';
import {useParams,Link}from'react-router-dom';
import {useSelector,useDispatch}from'react-redux';
import {addToCart}from'../store/cartSlice';
import {Heart,Minus,Plus,Star,ArrowLeft,ArrowUpRight,LoaderCircle}from'lucide-react';
import api from'../axios';
import {useLanguage}from'../i18n/LanguageContext';

const DEMOS={
 demo0:{id:'demo0',nom:'ARCHIVE BOMBER',prix:890,stock:12,description:'A structured everyday outer layer with a relaxed street silhouette.',image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=90'},
 demo1:{id:'demo1',nom:'NOCTURNE OVERSHIRT',prix:690,stock:10,description:'Brushed cotton overshirt designed for layering and everyday wear.',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=90'},
 demo2:{id:'demo2',nom:'AFTER DARK JACKET',prix:1190,stock:8,description:'Clean outerwear silhouette with a sharper late-night profile.',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=90'},
 demo3:{id:'demo3',nom:'DAILY UNIFORM TEE',prix:390,stock:20,description:'Heavyweight everyday tee with an oversized fit.',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=90'},
 demo4:{id:'demo4',nom:'DISTRICT OVERSHIRT',prix:690,stock:10,description:'Relaxed overshirt with a clean utility finish.',image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1400&q=90'},
 demo5:{id:'demo5',nom:'RAW DENIM 01',prix:720,stock:15,description:'Straight relaxed denim built for everyday rotation.',image:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1400&q=90'}
};

export default function ProductDetail(){
 const {id}=useParams(),user=useSelector(s=>s.auth.user),dispatch=useDispatch(),{language}=useLanguage();
 const [p,setP]=useState(null),[reviews,setReviews]=useState([]),[size,setSize]=useState('M'),[qty,setQty]=useState(1),[review,setReview]=useState({note:5,commentaire:''}),[error,setError]=useState(false);
 useEffect(()=>{let active=true;setP(null);setError(false);const load=async()=>{if(DEMOS[id]){setP(DEMOS[id]);setReviews([{note:5,commentaire:'Great weight, clean fit and very easy to style.',user:{name:'LEXIGAM CLIENT'}}]);return}try{const [a,b]=await Promise.all([api.get('/produits/'+id),api.get('/produits/'+id+'/avis')]);if(active){setP(a.data.data||a.data);setReviews(b.data.data||[])}}catch(e){if(active)setError(true)}};load();return()=>{active=false}},[id]);
 const image=p?.image?.startsWith('http')?p.image:p?.image?.startsWith('/')?p.image:p?'http://localhost:8000'+p.image:'';
 const total=useMemo(()=>p?Number(p.prix)*qty:0,[p,qty]);
 if(error)return <div className="pb-empty"><small>PRODUCT / 404</small><h1>Product not found.</h1><Link to="/shop" className="pb-btn">BACK TO SHOP <ArrowUpRight size={15}/></Link></div>;
 if(!p)return <div className="pb-loading-screen"><LoaderCircle className="spin"/><span>LOADING PRODUCT</span></div>;
 const submit=async e=>{e.preventDefault();try{const x=await api.post('/avis',{produit_id:id,...review});setReviews([...reviews,{...x.data.data,user}]);setReview({note:5,commentaire:''})}catch(e){alert(e.response?.data?.message||'Unable to publish review')}};
 return <div className="pb-product-detail">
  <div className="pb-product-crumb"><Link to="/shop">SHOP</Link><span>/</span><span>{p.nom}</span></div>
  <div className="pb-product-layout">
   <div className="pb-product-gallery"><div className="pb-gallery-main"><img src={image} alt={p.nom}/><span>{p.stock<6?'LOW STOCK':'NEW'}</span></div><div className="pb-gallery-grid"><div><img src={image} alt="Product detail"/></div><div className="pb-gallery-editorial"><img src="/webpImage/image-23.avif" alt="LEXIGAM editorial detail"/></div></div></div>
   <aside className="pb-product-info"><small>LEXIGAM / 026</small><h1>{p.nom}</h1><div className="pb-product-price">{p.prix} DH</div><p className="pb-product-desc">{p.description}</p><div className="pb-product-line"><span>{language==='ar'?'المقاس':'SIZE'}</span><div>{['XS','S','M','L','XL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div></div><div className="pb-product-line"><span>{language==='ar'?'الكمية':'QUANTITY'}</span><div className="pb-quantity"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><b>{qty}</b><button onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div></div><button className="pb-add-large" onClick={()=>dispatch(addToCart({...p,taille:size,quantite:qty}))}>ADD TO BAG <b>{total} DH</b><ArrowUpRight size={17}/></button><button className="pb-wishlist-large"><Heart size={17}/> ADD TO WISHLIST</button><div className="pb-accordions"><details open><summary>DESCRIPTION <Plus size={15}/></summary><p>{p.description}</p></details><details><summary>DELIVERY & RETURNS <Plus size={15}/></summary><p>Prepared within 1–2 business days. Delivery details are shown at checkout.</p></details><details><summary>CARE <Plus size={15}/></summary><p>Follow the care label. Wash cold and dry naturally when possible.</p></details></div></aside>
  </div>
  <section className="pb-reviews"><div><small>COMMUNITY</small><h2>What people say.</h2></div><div>{reviews.length?reviews.map((x,i)=><article key={i}><div><strong>{x.user?.name||'LEXIGAM CLIENT'}</strong><span>{[1,2,3,4,5].map(n=><Star key={n} size={12} fill={n<=x.note?'currentColor':'none'}/>)}</span></div><p>{x.commentaire}</p></article>):<p>No reviews yet.</p>}{user?.role==='client'&&<form onSubmit={submit}><select value={review.note} onChange={e=>setReview({...review,note:+e.target.value})}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{n} STARS</option>)}</select><textarea value={review.commentaire} onChange={e=>setReview({...review,commentaire:e.target.value})} placeholder="YOUR EXPERIENCE..."/><button className="pb-btn">PUBLISH <ArrowUpRight size={15}/></button></form>}</div></section>
 </div>;
}