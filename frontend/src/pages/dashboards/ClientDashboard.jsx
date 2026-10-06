import React,{useEffect,useState} from 'react';
import api from '../../axios';
import {Box,RotateCcw,ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router-dom';
const ClientDashboard=()=>{
 const [orders,setOrders]=useState([]),[loading,setLoading]=useState(true);
 useEffect(()=>{api.get('/commandes').then(r=>setOrders(r.data.data||[])).catch(console.error).finally(()=>setLoading(false))},[]);
 const handleReturn=async id=>{const raison=window.prompt('Raison du retour :');if(!raison)return;try{await api.post('/retours',{ligne_commande_id:id,quantite:1,raison});alert('Demande de retour envoyée.')}catch(e){alert('Erreur lors de la demande.')}};
 if(loading)return <main className="container" style={{padding:'90px 0'}}><p className="eyebrow">ACCOUNT / LOADING</p><h1 className="display-title">Votre historique…</h1></main>;
 return <main className="container" style={{padding:'70px 0 120px'}}><p className="eyebrow">LEXIGAM / ACCOUNT</p><h1 className="display-title">Mes<br/><em>commandes.</em></h1>
  {orders.length===0?<div className="empty-state"><h2>Votre dressing commence ici.</h2><Link to="/shop" className="btn-primary">Explorer le shop <ArrowUpRight size={16}/></Link></div>:
  <div style={{display:'grid',gap:18,marginTop:55}}>{orders.map(o=><article key={o.id} style={{background:'#111',border:'1px solid #292929',padding:28}}>
   <div style={{display:'flex',justifyContent:'space-between',gap:20,flexWrap:'wrap',borderBottom:'1px solid #292929',paddingBottom:20}}><div><p className="eyebrow">ORDER #{o.id}</p><small>{new Date(o.created_at).toLocaleDateString()}</small></div><div style={{display:'flex',gap:12,alignItems:'center'}}><span className="status-pill">{o.statut}</span><Link to={`/order-success/${o.id}`}><ArrowUpRight size={18}/></Link></div></div>
   <div style={{display:'grid',gap:12,padding:'22px 0'}}>{(o.lignes||[]).map((l,i)=><div className="fashion-row compact" key={i}><div style={{display:'flex',gap:12,alignItems:'center'}}><Box size={16}/><strong>{l.produit?.nom}</strong><span>x{l.quantite}</span></div><div style={{display:'flex',gap:15,alignItems:'center'}}><span>{l.prix*l.quantite} DH</span><button className="text-button" onClick={()=>handleReturn(l.id)}><RotateCcw size={13}/> Retour</button></div></div>)}</div>
   <div style={{display:'flex',justifyContent:'space-between',paddingTop:18,borderTop:'1px solid #292929'}}><span>Total</span><strong>{o.montant_total} DH</strong></div>
  </article>)}</div>}
 </main>
};
export default ClientDashboard;