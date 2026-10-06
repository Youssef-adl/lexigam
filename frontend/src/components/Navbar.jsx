import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import {Search,ShoppingBag,Menu,X,UserRound,ArrowUpRight} from 'lucide-react';
import {logout} from '../store/authSlice'; import {clearCart} from '../store/cartSlice'; import api from '../axios';
export default function Navbar(){
 const cartItems=useSelector(s=>s.cart.items),user=useSelector(s=>s.auth.user),dispatch=useDispatch(),navigate=useNavigate();
 const [open,setOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[search,setSearch]=useState('');
 useEffect(()=>{if(!user||user.role!=='client')return;const id=setTimeout(()=>api.post('/paniers/sync',{items:cartItems.filter(i=>i.produit).map(i=>({produit_id:i.produit.id,quantite:i.quantite,prix:i.produit.prix||0}))}).catch(()=>{}),700);return()=>clearTimeout(id)},[cartItems,user]);
 const submit=e=>{e.preventDefault();if(search.trim()){navigate('/shop?nom='+encodeURIComponent(search.trim()));setSearchOpen(false)}};
 const logoutUser=()=>{dispatch(logout());dispatch(clearCart());navigate('/')};
 return <><div className="announcement">FREE DELIVERY ON ORDERS OVER 900 DH <span>·</span> MOROCCO / WORLDWIDE</div><header className="fashion-nav">
 <button className="mobile-menu-btn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><Link className="fashion-logo" to="/">LEXIGAM<span>®</span></Link>
 <nav className={open?'nav-menu open':'nav-menu'}>{[['SHOP','/shop'],['MEN','/men'],['WOMEN','/women'],['NEW IN','/shop'],['COLLECTIONS','/shop']].map(x=><Link key={x[0]} to={x[1]} onClick={()=>setOpen(false)}>{x[0]}</Link>)}</nav>
 <div className="nav-actions"><button onClick={()=>setSearchOpen(true)}><Search size={19}/></button><button onClick={()=>navigate(user?'/dashboard':'/login')}><UserRound size={19}/></button><Link to="/cart" className="bag-link"><ShoppingBag size={19}/><b>{cartItems.length}</b></Link>{user&&<button className="logout-small" onClick={logoutUser}>LOGOUT</button>}{(user?.role==='admin'||user?.role==='vendeur')&&<Link className="admin-link" to={user.role==='admin'?'/admin/dashboard':'/vendor/dashboard'}>ADMIN <ArrowUpRight size={14}/></Link>}</div>
 </header>{searchOpen&&<div className="search-overlay"><button className="search-close" onClick={()=>setSearchOpen(false)}><X/></button><span className="eyebrow">SEARCH THE ARCHIVE</span><form onSubmit={submit}><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, categories..."/><button><ArrowUpRight/></button></form></div>}</>
}