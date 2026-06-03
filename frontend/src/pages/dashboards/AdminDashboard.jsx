import React, { useEffect, useState } from 'react';
import api from '../../axios';
import { Package, Check, X, Clock, Trash2, Users, MessageSquare, Tag, DollarSign, RotateCcw } from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
        const [prodRes, delRes, userRes, revRes, retRes, ordRes, catRes] = await Promise.all([
            api.get('/produits?statut=pending'),
            api.get('/produits?statut=deletion_pending'),
            api.get('/users'),
            api.get('/avis'),
            api.get('/retours'),
            api.get('/commandes'), // Admin needs a route for ALL orders
            api.get('/categories')
        ]);
        setProducts(prodRes.data.data);
        setDeletionRequests(delRes.data.data);
        setUsers(userRes.data.data);
        setReviews(revRes.data.data);
        setReturns(retRes.data.data.filter(r => r.statut === 'en_attente'));
        setOrders(ordRes.data.data);
        setCategories(catRes.data.data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleProductAction = async (id, action) => {
    try {
      await api.put(`/produits/${id}/${action}`);
      fetchAll();
      alert(`Action ${action} effectuée !`);
    } catch (err) {
      alert("Erreur");
    }
  };

  const handleReviewDelete = async (id) => {
    if (!window.confirm("Supprimer cet avis ?")) return;
    try {
      await api.delete(`/avis/${id}`);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleOrderStatut = async (id, status) => {
    try {
        await api.put(`/commandes/${id}`, { statut: status });
        setOrders(orders.map(o => o.id === id ? { ...o, statut: status } : o));
    } catch (err) {
        alert("Erreur");
    }
  };

  const handleReturnAction = async (id, action) => {
    try {
      await api.put(`/retours/${id}/${action}`);
      setReturns(returns.filter(r => r.id !== id));
      alert("Action réussie");
    } catch (err) {
      alert("Erreur");
    }
  };

  if (loading) return <div className="container mt-4"><h3>Accès à la console sécurisée...</h3></div>;

  return (
    <div className="container mt-4" style={{paddingBottom: '100px'}}>
      <h1 className="cart-header">Console d'Administration</h1>
      
      {/* SECTION: COMMANDES GLOBALES */}
      <h2 style={{marginTop: '40px', marginBottom: '20px'}}><Package size={24} /> Toutes les Commandes</h2>
      <div className="glass br-12" style={{overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <thead style={{background: 'rgba(255,255,255,0.05)'}}>
            <tr><th style={{padding: '15px'}}>ID</th><th style={{padding: '15px'}}>Client</th><th style={{padding: '15px'}}>Total</th><th style={{padding: '15px'}}>Statut</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                <td style={{padding: '15px'}}>#{o.id}</td>
                <td style={{padding: '15px'}}>{o.user?.name}</td>
                <td style={{padding: '15px'}}>{o.montant_total} DH</td>
                <td style={{padding: '15px'}}>
                   <select 
                        value={o.statut} 
                        onChange={(e) => handleOrderStatut(o.id, e.target.value)}
                        style={{background: 'none', color: '#f59e0b', border: '1px solid rgba(255,255,255,0.1)', padding: '5px', borderRadius: '4px'}}
                   >
                       {['en_attente','confirmee','expediee','livree','annulee'].map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION: CATEGORIES */}
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}><Tag size={24} /> Catégories</h2>
      <div className="glass br-12" style={{overflow: 'hidden', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {categories.map(c => <span key={c.id} className="badge" style={{fontSize: '1rem', padding: '10px 20px'}}>{c.nom}</span>)}
      </div>

      {/* SECTION: APPROBATION PRODUITS */}
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}><Clock size={24} /> Approbations de Produits</h2>
      <div className="glass br-12" style={{overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <tbody>
            {products.map(p => (
                <tr key={p.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                  <td style={{padding: '15px'}}>{p.nom}</td>
                  <td style={{padding: '15px'}}>{p.vendeur?.name}</td>
                  <td style={{padding: '15px', display: 'flex', gap: '10px'}}>
                    <button className="btn-primary" style={{backgroundColor: '#10b981'}} onClick={() => handleProductAction(p.id, 'approve')}><Check size={14}/></button>
                    <button className="btn-primary" style={{backgroundColor: '#ef4444'}} onClick={() => handleProductAction(p.id, 'reject')}><X size={14}/></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* SECTION: SUPPRESSION PRODUITS */}
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}><Trash2 size={24} /> Demandes de suppression</h2>
      <div className="glass br-12" style={{overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <tbody>
            {deletionRequests.map(p => (
                <tr key={p.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                  <td style={{padding: '15px'}}>{p.nom}</td>
                  <td style={{padding: '15px', color: '#fca5a5'}}>{p.deletion_reason}</td>
                  <td style={{padding: '15px', display: 'flex', gap: '10px'}}>
                    <button className="btn-primary" style={{backgroundColor: '#ef4444', fontSize: '0.8rem'}} onClick={() => handleProductAction(p.id, 'approve-deletion')}>Approuver</button>
                    <button className="btn-primary" style={{backgroundColor: '#94a3b8', fontSize: '0.8rem'}} onClick={() => handleProductAction(p.id, 'reject-deletion')}>Rejeter</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* SECTION: UTILISATEURS */}
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}><Users size={24} /> Utilisateurs</h2>
      <div className="glass br-12" style={{overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <thead style={{background: 'rgba(255,255,255,0.05)'}}>
            <tr><th style={{padding: '15px'}}>Nom</th><th style={{padding: '15px'}}>Rôle</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                <td style={{padding: '15px'}}>{u.name}<br/><span style={{fontSize: '0.8rem', color: '#64748b'}}>{u.email}</span></td>
                <td style={{padding: '15px'}}><span className="badge">{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION: AVIS */}
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}><MessageSquare size={24} /> Avis</h2>
      <div className="glass br-12" style={{overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                <td style={{padding: '15px'}}>{r.user?.name}: {r.commentaire}</td>
                <td style={{padding: '15px'}}>
                   <button onClick={() => handleReviewDelete(r.id)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <h2 style={{marginTop: '50px', marginBottom: '20px'}}><RotateCcw size={24} /> Retours</h2>
       <div className="glass br-12" style={{overflow: 'hidden'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead style={{background: 'rgba(255,255,255,0.05)'}}>
              <tr><th style={{padding: '15px'}}>Client</th><th style={{padding: '15px'}}>Produit</th><th style={{padding: '15px'}}>Raison</th><th style={{padding: '15px'}}>Statut</th><th style={{padding: '15px'}}>Action</th></tr>
            </thead>
            <tbody>
              {returns.map(r => (
                <tr key={r.id} style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                  <td style={{padding: '15px'}}>{r.user?.name}</td>
                  <td style={{padding: '15px'}}>{r.ligne_commande?.produit?.nom}</td>
                  <td style={{padding: '15px'}}>{r.raison}</td>
                  <td style={{padding: '15px'}}><span className="badge">{r.statut}</span></td>
                  <td style={{padding: '15px', display: 'flex', gap: '10px'}}>
                     {r.statut === 'en_attente' && (
                       <>
                         <button className="btn-primary" style={{backgroundColor: '#10b981', padding: '5px 10px'}} onClick={() => handleReturnAction(r.id, 'approve')}>Accepter</button>
                         <button className="btn-primary" style={{backgroundColor: '#ef4444', padding: '5px 10px'}} onClick={() => handleReturnAction(r.id, 'reject')}>Refuser</button>
                       </>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  );
};

export default AdminDashboard;
