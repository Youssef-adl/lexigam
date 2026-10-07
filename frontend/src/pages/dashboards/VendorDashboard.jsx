import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, Package, Trash2, Edit, ArrowUpRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../axios';

const statStyle={padding:'24px',background:'#111',border:'1px solid #292929'};
const VendorDashboard=()=>{
 const [data,setData]=useState(null),[products,setProducts]=useState([]),[returns,setReturns]=useState([]),[loading,setLoading]=useState(true);
 const user=useSelector(s=>s.auth.user);
 useEffect(()=>{if(!user||user.role!=='vendeur')return;(async()=>{try{const r=await Promise.all([api.get('/vendor-orders'),api.get('/vendor-returns'),api.get(`/produits?user_id=${user.id}&statut=pending`),api.get(`/produits?user_id=${user.id}&statut=approved`)]);setData(r[0].data);setReturns(r[1].data.data||[]);setProducts([...(r[3].data.data||[]),...(r[2].data.data||[])]);}catch(e){console.error(e)}finally{setLoading(false)}})()},[user?.id,user?.role]);
 const requestDeletion=async id=>{const reason=window.prompt('Pourquoi voulez-vous supprimer ce produit ?');if(!reason)return;try{await api.put(`/produits/${id}/request-deletion`,{reason});setProducts(products.map(p=>p.id===id?{...p,statut:'deletion_pending'}:p))}catch(e){alert('Erreur lors de la demande.')}};
 if(loading)return <main className="container" style={{padding:'90px 0'}}><p className="eyebrow">VENDOR / LOADING</p><h1 className="display-title">Analyse de vos ventes…</h1></main>;
 return <main className="container" style={{padding:'70px 0 120px'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,marginBottom:50,flexWrap:'wrap'}}><div><p className="eyebrow">LEXIGAM / VENDOR STUDIO</p><h1 className="display-title">Votre espace<br/><em>marchand.</em></h1></div><Link to="/admin/add-product" className="btn-primary">Ajouter un produit <ArrowUpRight size={16}/></Link></div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginBottom:60}}>
   <div style={statStyle}><DollarSign size={18}/><p className="eyebrow" style={{marginTop:35}}>Chiffre d'affaires</p><strong style={{fontSize:'2rem'}}>{data?.stats?.total_ca||0} DH</strong></div>
   <div style={statStyle}><Package size={18}/><p className="eyebrow" style={{marginTop:35}}>Unités vendues</p><strong style={{fontSize:'2rem'}}>{data?.stats?.unites_vendues||0}</strong></div>
   <div style={statStyle}><RotateCcw size={18}/><p className="eyebrow" style={{marginTop:35}}>Retours ouverts</p><strong style={{fontSize:'2rem'}}>{returns.length}</strong></div>
  </div>
  <section><div className="section-heading"><div><p className="eyebrow">CATALOGUE</p><h2>Mes produits</h2></div><span>{products.length} pièces</span></div>
   <div className="fashion-table">{products.map(p=><div className="fashion-row" key={p.id}>
    <div style={{display:'flex',alignItems:'center',gap:16}}><img src={p.image?.startsWith('http')?p.image:`http://localhost:8000${p.image||''}`} style={{width:64,height:78,objectFit:'cover',background:'#222'}}/><div><strong>{p.nom}</strong><small>{p.prix} DH · stock {p.stock}</small></div></div>
    <span className="status-pill">{p.statut==='approved'?'APPROUVÉ':p.statut==='pending'?'EN ATTENTE':'SUPPRESSION'}</span>
    <div style={{display:'flex',gap:14}}>{p.statut==='approved'&&<><Link to={`/vendor/edit-product/${p.id}`}><Edit size={18}/></Link><button className="icon-button danger" onClick={()=>requestDeletion(p.id)}><Trash2 size={18}/></button></>}</div>
   </div>)}</div>
  </section>
  <section style={{marginTop:70}}><div className="section-heading"><div><p className="eyebrow">COMMANDES</p><h2>Ventes récentes</h2></div></div>
   <div className="fashion-table">{(data?.data||[]).slice(0,8).map((l,i)=><div className="fashion-row" key={i}><div><strong>{l.produit?.nom}</strong><small>{l.commande?.user?.name}</small></div><span>x{l.quantite}</span><span>{l.commande?.statut}</span></div>)}</div>
  </section>
 </main>
};
export default VendorDashboard;