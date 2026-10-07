import React,{useState}from'react';import{useDispatch}from'react-redux';import{useNavigate,Link,useLocation}from'react-router-dom';import{ArrowUpRight,ArrowLeft}from'lucide-react';import{login}from'../store/authSlice';import api,{ensureCsrf}from'../axios';

export default function Login(){
 const[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[loading,setLoading]=useState(false),dispatch=useDispatch(),navigate=useNavigate(),location=useLocation();
 const submit=async e=>{e.preventDefault();setLoading(true);setError('');
  try{
   await ensureCsrf();
   const r=await api.post('/login',{email,password});
   dispatch(login({user:r.data.user}));
   const role=r.data.user.role;
   navigate(location.state?.from||(role==='admin'?'/admin/dashboard':role==='vendeur'?'/vendor/dashboard':'/shop'));
  }catch(err){
   const message=err.response?.data?.errors?.email?.[0]||err.response?.data?.message||'Email or password is incorrect.';
   setError(message);
  }finally{setLoading(false)}
 };
 return <div className="pb-auth"><div className="pb-auth-art"><img src="/webpImage/image-24.jpg" alt="LEXIGAM campaign"/><div><small>LEXIGAM / MEMBERS</small><h1>YOUR<br/><i>ARCHIVE.</i></h1></div></div><form className="pb-auth-form" onSubmit={submit}><Link to="/shop" className="pb-back"><ArrowLeft size={14}/> BACK TO SHOP</Link><small>SIGN IN</small><h2>Welcome back.</h2>{error&&<p className="pb-error">{error}</p>}<label>EMAIL<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></label><label>PASSWORD<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label><button className="pb-btn" disabled={loading}>{loading?'SIGNING IN':'SIGN IN'} <ArrowUpRight size={15}/></button><p>New here? <Link to="/register">Create an account.</Link></p></form></div>
}