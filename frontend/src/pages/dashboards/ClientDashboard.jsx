import React, { useEffect, useState } from 'react';
import api from '../../axios';
import { History, Box, Truck, RotateCcw, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/commandes')
      .then(res => {
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleReturn = async (ligneId) => {
    const raison = prompt("Raison du retour :");
    if (!raison) return;

    try {
        await api.post('/retours', {
            ligne_commande_id: ligneId,
            quantite: 1, // par defaut
            raison: raison
        });
        alert("Demande de retour envoyée !");
    } catch (err) {
        alert("Erreur");
    }
  };

  if (loading) return <div className="container mt-4"><h3>Chargement de votre historique...</h3></div>;

  return (
    <div className="container mt-4">
      <div className="flex-between" style={{marginBottom: '30px'}}>
        <h1 className="cart-header" style={{margin: 0}}>Mes Commandes</h1>
      </div>
      
      {orders.length === 0 ? (
          <p className="text-center mt-4">Vous n'avez pas encore passé de commande.</p>
      ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {orders.map(order => (
                  <div key={order.id} className="glass br-12" style={{padding: '25px'}}>
                      <div className="flex-between" style={{marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px'}}>
                          <div>
                              <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Commande #{order.id}</div>
                              <div style={{color: '#94a3b8', fontSize: '0.8rem'}}>{new Date(order.created_at).toLocaleDateString()}</div>
                          </div>
                          <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                              <div className="badge">{order.statut}</div>
                              <Link to={`/order-success/${order.id}`} className="btn-primary" style={{padding: '5px 12px', fontSize: '0.8rem', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6'}}>
                                  Voir Reçu
                              </Link>
                          </div>
                      </div>

                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                          {order.lignes.map((l, i) => (
                              <div key={i} className="flex-between">
                                  <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                      <Box size={16} color="#94a3b8" />
                                      <span>{l.produit.nom} (x{l.quantite})</span>
                                  </div>
                                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                      <span>{l.prix * l.quantite} DH</span>
                                      <button 
                                        className="btn-primary" 
                                        style={{padding: '4px 8px', fontSize: '0.7rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}
                                        onClick={() => handleReturn(l.id)}
                                      >
                                          <RotateCcw size={12} /> Retour
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="flex-between" style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold'}}>
                          <span>Total</span>
                          <span style={{color: 'var(--accent-color)', fontSize: '1.2rem'}}>{order.montant_total} DH</span>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default ClientDashboard;
