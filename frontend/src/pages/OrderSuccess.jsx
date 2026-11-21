import React,{useEffect,useState}from'react';
import{useParams,Link}from'react-router-dom';
import{CheckCircle,ArrowUpRight,FileDown}from'lucide-react';
import api from'../axios';

const money=(value)=>`${Number(value||0).toFixed(2)} DH`;
const escapeHtml=(value)=>String(value??'—').replace(/[&<>"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export default function OrderSuccess(){
  const{id}=useParams(),[order,setOrder]=useState(null),[error,setError]=useState(false);
  useEffect(()=>{api.get('/commandes/'+id).then(r=>setOrder(r.data.data)).catch(()=>setError(true))},[id]);

  const downloadReceipt=()=>{
    if(!order)return;
    const lines=Array.isArray(order.lignes)?order.lignes:[];
    const rows=lines.map((line,index)=>{
      const name=line.produit?.nom||line.produit?.name||'Product';
      const quantity=Number(line.quantite||0);
      const price=Number(line.prix||0);
      return `<tr><td>${index+1}</td><td>${escapeHtml(name)}</td><td>${quantity}</td><td>${money(price)}</td><td>${money(price*quantity)}</td></tr>`;
    }).join('');
    const customer=order.user?.name||'LEXIGAM Customer';
    const date=order.date_commande||order.created_at||new Date().toISOString().slice(0,10);
    const payment=order.paiement?.mode||'Cash';
    const address=order.livraison?.adresse||'—';
    const city=order.livraison?.ville||'—';
    const phone=order.livraison?.telephone||'—';
    const status=order.statut||'—';
    const total=order.montant_total??lines.reduce((sum,line)=>sum+Number(line.prix||0)*Number(line.quantite||0),0);
    const receiptHtml=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>LEXIGAM Receipt #${escapeHtml(id)}</title><style>
      @page{size:A4;margin:18mm}body{font-family:Arial,sans-serif;color:#171717;margin:0;font-size:11pt}
      .top{background:#171717;color:#fff;padding:26px 30px}.brand{font-size:25pt;font-weight:800;letter-spacing:3px}.tag{color:#d8b77a;font-size:9pt;letter-spacing:2px;margin-top:6px}
      .wrap{padding:26px 30px}.heading{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #d8b77a;padding-bottom:18px}
      h1{font-size:22pt;margin:0 0 6px}.muted{color:#777;font-size:9pt}.meta{text-align:right;line-height:1.8}
      .details{display:flex;gap:35px;margin:24px 0}.details section{flex:1;line-height:1.8}.label{font-size:8pt;color:#9a7a43;letter-spacing:1px;font-weight:bold}
      table{width:100%;border-collapse:collapse;margin-top:24px}th{background:#f2eee7;text-align:left;font-size:9pt;padding:12px 9px}td{padding:12px 9px;border-bottom:1px solid #e7e2d9}
      .total{margin:22px 0 0 auto;width:250px;background:#f7f4ee;padding:16px}.total strong{font-size:17pt;display:block;margin-top:8px}
      .footer{margin-top:45px;border-top:1px solid #ddd;padding-top:15px;color:#777;font-size:9pt;text-align:center}
      </style></head><body><div class="top"><div class="brand">LEXIGAM</div><div class="tag">STYLE · OBJECTS · CULTURE</div></div>
      <main class="wrap"><div class="heading"><div><h1>Order receipt</h1><div class="muted">Thank you for shopping with LEXIGAM.</div></div><div class="meta"><b>RECEIPT #${escapeHtml(id)}</b><br>Date: ${escapeHtml(date)}<br>Status: ${escapeHtml(status)}</div></div>
      <div class="details"><section><div class="label">CUSTOMER</div><b>${escapeHtml(customer)}</b><br>${escapeHtml(phone)}</section><section><div class="label">DELIVERY ADDRESS</div>${escapeHtml(address)}<br>${escapeHtml(city)}</section><section><div class="label">PAYMENT</div>${escapeHtml(payment)}</section></div>
      <table><thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Unit price</th><th>Subtotal</th></tr></thead><tbody>${rows||'<tr><td colspan="5">No order items</td></tr>'}</tbody></table>
      <div class="total"><span class="muted">TOTAL AMOUNT</span><strong>${money(total)}</strong></div>
      <div class="footer">LEXIGAM · Thank you for your trust.<br>This document is your order receipt.</div></main></body></html>`;
    const blob=new Blob(['\ufeff',receiptHtml],{type:'application/msword;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;link.download=`LEXIGAM-Receipt-${id}.doc`;
    document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
  };

  if(!order)return <div className='pb-loading-screen'><span>{error?'ORDER COULD NOT BE LOADED':'GENERATING YOUR ORDER'}</span></div>;
  return <div className='pb-success'><div className='pb-success-mark'><CheckCircle size={27}/></div><small>LEXIGAM / ORDER CONFIRMED</small><h1>Thank you.<br/><i>Your order is in.</i></h1><p>Order <strong>#{id}</strong> has been registered successfully. Your receipt is ready to download as a Word document.</p><div className='pb-success-card'><div><span>PAYMENT</span><strong>{order.paiement?.mode||'—'}</strong></div><div><span>ADDRESS</span><strong>{order.livraison?.adresse||'—'}</strong></div><div><span>CITY</span><strong>{order.livraison?.ville||'—'}</strong></div><div><span>PHONE</span><strong>{order.livraison?.telephone||'—'}</strong></div></div><div className='pb-success-actions'><button className='pb-btn' onClick={downloadReceipt}>DOWNLOAD WORD RECEIPT <FileDown size={15}/></button><Link className='pb-btn' to='/shop'>CONTINUE SHOPPING <ArrowUpRight size={15}/></Link></div></div>
}