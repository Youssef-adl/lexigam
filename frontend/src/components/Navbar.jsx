import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {Search,ShoppingBag,Menu,X,UserRound,Heart,Sun,Moon,ChevronDown} from 'lucide-react';
import {logout} from '../store/authSlice';
import {clearCart} from '../store/cartSlice';
import api from '../axios';
import {useLanguage} from '../i18n/LanguageContext';

export default function Navbar(){
 const cartItems=useSelector(s=>s.cart.items),user=useSelector(s=>s.auth.user),dispatch=useDispatch(),navigate=useNavigate(),location=useLocation();
 const {language,setLanguage,theme,setTheme,t}=useLanguage();
 const [open,setOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[search,setSearch]=useState(''),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{if(!user||user.role!=='client')return;const id=setTimeout(()=>api.post('/paniers/sync',{items:cartItems.filter(i=>i.produit?.id).map(i=>({produit_id:i.produit.id,quantite:i.quantite}))}).catch(()=>{}),700);return()=>clearTimeout(id)},[cartItems,user]);
 useEffect(()=>setOpen(false),[location.pathname]);
 useEffect(()=>{const onExpired=()=>{dispatch(logout());dispatch(clearCart());navigate('/login?expired=1');};window.addEventListener('lexigam:auth-expired',onExpired);return()=>window.removeEventListener('lexigam:auth-expired',onExpired)},[dispatch,navigate]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>20);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 const submit=e=>{e.preventDefault();if(search.trim()){navigate('/shop?nom='+encodeURIComponent(search.trim()));setSearchOpen(false)}};
 const logoutUser=async()=>{try{await api.post('/logout')}catch{}finally{dispatch(logout());dispatch(clearCart());navigate('/')}};
 const nav=[[t.new,'/new-arrivals'],[t.shop,'/shop'],[t.men,'/men'],[t.women,'/women'],[t.journal,'/blog']];
 return <div className="pb-shell"><div className="pb-topbar">{t.freeDelivery}<button onClick={()=>setLanguage(language==='fr'?'ar':'fr')}>{language==='fr'?'AR':'FR'}</button></div><header className={'pb-header '+(scrolled?'is-scrolled':'')}><button className="pb-mobile" onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<Menu size={20}/>}</button><Link to="/" className="pb-logo">LEXIGAM<span>®</span></Link><nav className={open?'pb-nav open':'pb-nav'}>{nav.map(([label,path])=><Link key={path} to={path}>{label}</Link>)}</nav><div className="pb-actions"><button onClick={()=>setSearchOpen(true)} aria-label={t.search}><Search size={19}/></button><button onClick={()=>navigate(user?'/dashboard':'/login')} aria-label={t.account}><UserRound size={19}/></button><button aria-label="Wishlist"><Heart size={19}/></button><button className="pb-theme" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label="Theme">{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button><Link to="/cart" className="pb-bag" aria-label={t.bag}><ShoppingBag size={19}/><span>{cartItems.length}</span></Link>{(user?.role==='admin'||user?.role==='vendeur')&&<Link className="pb-studio" to={user.role==='admin'?'/admin/dashboard':'/vendor/dashboard'}>STUDIO</Link>}{user&&<button className="pb-logout" onClick={logoutUser}>LOGOUT</button>}</div></header>{searchOpen&&<div className="pb-search"><button onClick={()=>setSearchOpen(false)}><X size={23}/></button><span>{t.search}</span><form onSubmit={submit}><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jeans, jackets, shirts..."/><button><Search size={22}/></button></form><div className="pb-search-links"><Link to="/men">MEN</Link><Link to="/women">WOMEN</Link><Link to="/new-arrivals">NEW IN</Link></div></div>}</div>;
}
