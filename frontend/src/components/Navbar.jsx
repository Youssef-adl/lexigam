import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {Search,ShoppingBag,Menu,X,UserRound,Heart} from 'lucide-react';
import {logout} from '../store/authSlice';
import {clearCart} from '../store/cartSlice';
import api from '../axios';
import {useLanguage} from '../i18n/LanguageContext';

export default function Navbar(){
 const cartItems=useSelector(s=>s.cart.items),user=useSelector(s=>s.auth.user),dispatch=useDispatch(),navigate=useNavigate(),location=useLocation();
 const {language,setLanguage,t}=useLanguage();
 const [open,setOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[search,setSearch]=useState('');
 useEffect(()=>setOpen(false),[location.pathname]);
 useEffect(()=>{if(!user||user.role!=='client')return;const id=setTimeout(()=>api.post('/paniers/sync',{items:cartItems.filter(i=>i.produit?.id).map(i=>({produit_id:i.produit.id,quantite:i.quantite}))}).catch(()=>{}),700);return()=>clearTimeout(id)},[cartItems,user]);
 useEffect(()=>{const onExpired=()=>{dispatch(logout());dispatch(clearCart());navigate('/login?expired=1')};window.addEventListener('lexigam:auth-expired',onExpired);return()=>window.removeEventListener('lexigam:auth-expired',onExpired)},[dispatch,navigate]);
 const submit=e=>{e.preventDefault();if(search.trim()){navigate('/shop?nom='+encodeURIComponent(search.trim()));setSearchOpen(false)}};
 const logoutUser=async()=>{try{await api.post('/logout')}catch{}finally{dispatch(logout());dispatch(clearCart());navigate('/')}};
 const nav=[[t.new,'/new-arrivals'],[t.shop,'/shop'],[t.men,'/men'],[t.women,'/women'],[t.journal,'/blog']];
 return <div className="mm-nav-shell">
   <div className="mm-announcement">{t.freeDelivery}</div>
   <header className="mm-navbar">
     <button className="mm-mobile-menu" onClick={()=>setOpen(v=>!v)} aria-label="Menu">{open?<X size={20}/>:<Menu size={20}/>}</button>
     <Link to="/" className="mm-brand">LEXIGAM</Link>
     <nav className={open?'mm-nav-links open':'mm-nav-links'}>{nav.map(([label,path])=><Link key={path} to={path}>{label}</Link>)}</nav>
     <div className="mm-nav-actions">
       <button onClick={()=>setSearchOpen(true)} aria-label={t.search}><Search size={18}/></button>
       <button onClick={()=>navigate(user?'/dashboard':'/login')} aria-label={t.account}><UserRound size={18}/></button>
       <button aria-label="Wishlist"><Heart size={18}/></button>
       <Link to="/cart" className="mm-bag" aria-label={t.bag}><ShoppingBag size={18}/><span>{cartItems.length}</span></Link>
       {user?.role==='admin'&&<Link to="/admin/dashboard" className="mm-studio-link">STUDIO</Link>}
       {user&&<button className="mm-logout" onClick={logoutUser}>LOGOUT</button>}
     </div>
   </header>
   {searchOpen&&<div className="mm-search-overlay"><button onClick={()=>setSearchOpen(false)}><X size={22}/></button><form onSubmit={submit}><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."/><button><Search size={20}/></button></form></div>}
 </div>;
}
