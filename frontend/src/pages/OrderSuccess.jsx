import React,{useEffect,useState}from'react';
import{useParams,Link}from'react-router-dom';
import{CheckCircle,ArrowUpRight,Printer}from'lucide-react';
import api from'../axios';
export default function OrderSuccess(){
const{id}=useParams(),[order,setOrder]=useState(null);
useEffect(()=>{api.get('/commandes/'+id).then(r=>setOrder(r.data.data)).catch(()=>{})},[id]);
if(!order)return <div className='pb-loading-screen'><span>GENERATING YOUR ORDER</span></div>;
return <div className='pb-success'><div className='pb-success-mark'><CheckCircle size={27}/></div><small>LEXIGAM / ORDER CONFIRMED</small><h1>Thank you.<br/><i>Your order is in.</i></h1><p>Order <strong>#{id}</strong> has been registered successfully. We’ll prepare it and keep your delivery details in the order history.</p><div className='pb-success-card'><div><span>PAYMENT</span><strong>{order.paiement?.mode||'—'}</strong></div><div><span>ADDRESS</span><strong>{order.livraison?.adresse||'—'}</strong></div><div><span>CITY</span><strong>{order.livraison?.ville||'—'}</strong></div><div><span>PHONE</span><strong>{order.livraison?.telephone||'—'}</strong></div></div><div className='pb-success-actions'><button className='pb-btn' onClick={()=>window.print()}>PRINT RECEIPT <Printer size={15}/></button><Link className='pb-btn' to='/shop'>CONTINUE SHOPPING <ArrowUpRight size={15}/></Link></div></div>
}