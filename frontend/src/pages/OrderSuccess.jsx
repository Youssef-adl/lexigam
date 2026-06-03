import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, FileText } from 'lucide-react';
import api from '../axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/commandes/${id}`)
      .then(res => setOrder(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!order) return <div className="container mt-4"><h3>Génération de votre reçu...</h3></div>;

  return (
    <div className="container mt-4 text-center">
      <div className="glass br-12" style={{padding: '50px', maxWidth: '600px', margin: '0 auto'}}>
        <CheckCircle size={80} color="#10b981" style={{marginBottom: '20px'}} />
        <h1 className="cart-header">Félicitations !</h1>
        <p style={{marginBottom: '30px'}}>Votre commande <strong>#{id}</strong> a été enregistrée avec succès.</p>
        
        <div className="glass" style={{textAlign: 'left', padding: '20px', marginBottom: '30px', borderRadius: '12px'}}>
            <h4 style={{marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px'}}>Détails de Livraison & Paiement</h4>
            <div className="flex-between" style={{marginBottom: '5px'}}>
                <span>Mode de Paiement :</span>
                <span className="badge">{order.paiement.mode}</span>
            </div>
            <div className="flex-between" style={{marginBottom: '5px'}}>
                <span>Adresse de Livraison :</span>
                <span>{order.livraison.adresse}</span>
            </div>
            <div className="flex-between" style={{marginBottom: '5px'}}>
                <span>Ville :</span>
                <span>{order.livraison.ville}</span>
            </div>
            <div className="flex-between">
                <span>Téléphone :</span>
                <span>{order.livraison.telephone}</span>
            </div>
        </div>

        <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <button className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.print()}>
                <Download size={18} /> Télécharger Reçu
            </button>
            <Link to="/shop" className="btn-primary" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                Retour boutique
            </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
