import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {Search,ShoppingBag,Menu,X,UserRound,ArrowUpRight,Sun,Moon} from 'lucide-react';
import {logout} from '../store/authSlice';
import {clearCart} from '../store/cartSlice';
import api from '../axios';
import {useLanguage} from '../i18n/LanguageContext';

export default function Navbar(){
 const cartItems=useSelector(s=>s.cart.items),user=useSelector(s=>s.auth.user),dispatch=useDispatch(),navigate=useNavigate(),location=useLocation();
 const {language,setLanguage,theme,setTheme,t}=useLanguage();
 const [open,setOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[search,setSearch]=useState(''),[scrolled,setScrolled]=useState(false),[progress,setProgress]=useState(0);
 useEffect(()=>{if(!user||user.role!=='client')return;const id=setTimeout(()=>api.post('/paniers/sync',{items:cartItems.filter(i=>i.produit).map(i=>({produit_id:i.produit.id,quantite:i.quantite,prix:i.produit.prix||0}))}).catch(()=>{}),700);return()=>clearTimeout(id)},[cartItems,user]);
 useEffect(()=>setOpen(false),[location.pathname]);
 useEffect(()=>{let raf=0;const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);setScrolled(window.scrollY>32);setProgress(window.scrollY/max)})};onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>{window.removeEventListener('scroll',onScroll);if(raf)cancelAnimationFrame(raf)}},[]);
 const submit=e=>{e.preventDefault();if(search.trim()){navigate('/shop?nom='+encodeURIComponent(search.trim()));setSearchOpen(false)}};
 const logoutUser=()=>{dispatch(logout());dispatch(clearCart());navigate('/')};
 const nav=[[t.home,'/'],[t.shop,'/shop'],[t.journal,'/blog'],[t.about,'/about'],[t.contact,'/contact']];
 return <><div className="announcement">{t.freeDelivery}<span>·</span><button className="lang-mini" onClick={()=>setLanguage(language==='fr'?'ar':'fr')}>{language==='fr'?'AR':'FR'}</button></div>
 <div className="ma-global-progress" style={{transform:'scaleX('+progress+')'}}/><header className={'ma-header '+(scrolled?'is-scrolled':'')}>
  <button className="ma-mobile-toggle" onClick={()=>setOpen(v=>!v)}>{open?<X size={19}/>:<Menu size={19}/>}</button>
  <nav className={open?'ma-nav open':'ma-nav'}>{nav.map(x=><Link key={x[0]} to={x[1]}>{x[0]}</Link>)}</nav>
  <Link className="ma-logo" to="/">LEXIGAM<span>®</span></Link>
  <div className="ma-actions"><button onClick={()=>setSearchOpen(true)} aria-label={t.search}><Search size={17}/></button><button onClick={()=>navigate(user?'/dashboard':'/login')} aria-label={t.account}><UserRound size={17}/></button><Link to="/cart" aria-label={t.bag}><ShoppingBag size={17}/><b>{cartItems.length}</b></Link><button className="lang-switch" onClick={()=>setLanguage(language==='fr'?'ar':'fr')} title={t.lang}>{language==='fr'?'AR':'FR'}</button><button className="theme-switch" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={theme==='light'?'Dark mode':'Light mode'} title={theme==='light'?'Dark mode':'Light mode'}>{theme==='light'?<Moon size={16}/>:<Sun size={16}/>}</button>{user&&<button className="ma-logout" onClick={logoutUser}>LOGOUT</button>}{(user?.role==='admin'||user?.role==='vendeur')&&<Link className="ma-admin" to={user.role==='admin'?'/admin/dashboard':'/vendor/dashboard'}>{t.studio} <ArrowUpRight size={12}/></Link>}</div>
 </header>
 {searchOpen&&<div className="search-overlay"><button className="search-close" onClick={()=>setSearchOpen(false)}><X/></button><span className="eyebrow">{t.search}</span><form onSubmit={submit}><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, categories..."/><button><ArrowUpRight/></button></form></div>}
 </>;
}