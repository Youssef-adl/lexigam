import React,{useState}from'react';import{useDispatch}from'react-redux';import{useNavigate,Link}from'react-router-dom';import{login}from'../store/authSlice';import{ArrowUpRight,ArrowLeft}from'lucide-react';import api,{ensureCsrf}from'../axios';

export default function Register(){
 const[f,setF]=useState({name:'',email:'',password:'',password_confirmation:''}),[error,setError]=useState(''),[loading,setLoading]=useState(false),dispatch=useDispatch(),navigate=useNavigate();
 const ch=e=>setF({...f,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setLoading(true);setError('');
  try{await ensureCsrf();const r=await api.post('/register',f);dispatch(login({user:r.data.user}));navigate('/shop');}
  catch(err){setError(Object.values(err.response?.data?.errors||{})?.[0]?.[0]||err.response?.data?.message||'Could not create your account.');}
  finally{setLoading(false)}
 };
 return <div className="pb-auth"><div className="pb-auth-art"><img src="/webpImage/image-25.jpg" alt="LEXIGAM campaign"/><div><small>LEXIGAM / MEMBERS</small><h1>MAKE IT<br/><i>YOURS.</i></h1></div></div><form className="pb-auth-form" onSubmit={submit}><Link to="/shop" className="pb-back"><ArrowLeft size={14}/> BACK TO SHOP</Link><small>CREATE ACCOUNT</small><h2>Join the archive.</h2>{error&&<p className="pb-error">{error}</p>}<label>FULL NAME<input name="name" value={f.name} onChange={ch} required autoComplete="name"/></label><label>EMAIL<input name="email" type="email" value={f.email} onChange={ch} required autoComplete="email"/></label><label>PASSWORD<input name="password" type="password" value={f.password} onChange={ch} minLength={8} required autoComplete="new-password"/></label><label>CONFIRM PASSWORD<input name="password_confirmation" type="password" value={f.password_confirmation} onChange={ch} minLength={8} required autoComplete="new-password"/></label><button className="pb-btn" disabled={loading}>{loading?'CREATING':'CREATE ACCOUNT'} <ArrowUpRight size={15}/></button><p>Already a member? <Link to="/login">Sign in.</Link></p></form></div>
}