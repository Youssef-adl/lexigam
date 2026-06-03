import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, Package, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../axios';

const VendorDashboard = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user || user.role !== 'vendeur') return;
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          api.get('/vendor-orders'),
          api.get('/vendor-returns'),
          api.get(`/produits?user_id=${user.id}&statut=pending`),
          api.get(`/produits?user_id=${user.id}&statut=approved`)
        ]);

        setData(results[0].data);
        setReturns(results[1].data.data);
        setProducts([...results[3].data.data, ...results[2].data.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id, user?.role]);

  const requestDeletion = async (id) => {
    const reason = window.prompt("Pourquoi voulez-vous supprimer ce produit ?");
    if (!reason) return;
    try {
      await api.put(`/produits/${id}/request-deletion`, { reason });
      setProducts(products.map(p => p.id === id ? { ...p, statut: 'deletion_pending' } : p));
      alert("Demande envoyée");
    } catch (err) {
      alert("Erreur");
    }
  };

  if (loading) return <div className="container mt-4"><h3>Analyse de vos ventes...</h3></div>;

  return (
    <div className="container mt-4">
      <h1 className="cart-header">Tableau de Bord Vendeur</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass br-12" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '15px', borderRadius: '12px' }}>
            <DollarSign color="#3b82f6" />
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Chiffre d'affaires</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data?.stats?.total_ca || 0} DH</div>
          </div>
        </div>
        <div className="glass br-12" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '15px', borderRadius: '12px' }}>
            <Package color="#10b981" />
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Unités Vendues</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data?.stats?.unites_vendues || 0}</div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '20px', marginTop: '40px' }}>Demandes de Retour</h3>
      <div className="glass br-12" style={{ overflow: 'hidden', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
            <tr>
              <th style={{ padding: '15px' }}>Client</th>
              <th style={{ padding: '15px' }}>Produit</th>
              <th style={{ padding: '15px' }}>Raison</th>
              <th style={{ padding: '15px' }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {returns.length === 0 ? <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>Aucune demande de retour</td></tr> :
              returns.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '15px' }}>{r.user?.name}</td>
                  <td style={{ padding: '15px' }}>{r.ligne_commande?.produit?.nom}</td>
                  <td style={{ padding: '15px' }}>{r.raison}</td>
                  <td style={{ padding: '15px' }}>
                    <span className="badge" style={{
                      backgroundColor: r.statut === 'accepte' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: r.statut === 'accepte' ? '#10b981' : '#f59e0b'
                    }}>
                      {r.statut}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <h3 style={{ marginBottom: '20px', marginTop: '40px' }}>Mes Produits</h3>
      <div className="glass br-12" style={{ overflow: 'hidden', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
            <tr>
              <th style={{ padding: '15px' }}>Produit</th>
              <th style={{ padding: '15px' }}>Prix</th>
              <th style={{ padding: '15px' }}>Statut</th>
              <th style={{ padding: '15px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image?.startsWith('http') ? p.image : `http://localhost:8000${p.image}`}
                      style={{ width: '30px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                    {p.nom}
                  </div>
                </td>
                <td style={{ padding: '15px' }}>{p.prix} DH</td>
                <td style={{ padding: '15px' }}>
                  <span className="badge" style={{
                    backgroundColor: p.statut === 'approved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: p.statut === 'approved' ? '#10b981' : '#f59e0b'
                  }}>
                    {p.statut === 'approved' ? 'Approuvé' : p.statut === 'pending' ? 'En attente' : 'Suppression en cours'}
                  </span>
                </td>
                <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                  {p.statut === 'approved' && (
                    <>
                      <Link to={`/vendor/edit-product/${p.id}`} className="text-accent" title="Modifier">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => requestDeletion(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Demander suppression">
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginBottom: '20px', marginTop: '40px' }}>Ventes récentes</h3>
      <div className="glass br-12" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
            <tr>
              <th style={{ padding: '15px' }}>Client</th>
              <th style={{ padding: '15px' }}>Produit</th>
              <th style={{ padding: '15px' }}>Quantité</th>
              <th style={{ padding: '15px' }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((ligne, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '15px' }}>{ligne.commande.user.name}</td>
                <td style={{ padding: '15px' }}>{ligne.produit.nom}</td>
                <td style={{ padding: '15px' }}>{ligne.quantite}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ color: '#fca5a5' }}>{ligne.commande.statut}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
