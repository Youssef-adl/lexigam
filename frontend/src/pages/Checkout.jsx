import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  
  // REDIRECTION SI NON CONNECTE
  React.useEffect(() => {
    if (!user) {
        navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    adresse: '',
    ville: '',
    telephone: '',
    payment_mode: 'cash'
  });
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, curr) => acc + (curr.produit.prix * curr.quantite), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const orderData = {
      items: items.map(i => ({ id: i.produit.id, quantite: i.quantite })),
      ...formData
    };

    try {
      const res = await api.post('/commandes', orderData);
      dispatch(clearCart());
      navigate(`/order-success/${res.data.commande_id}`);
    } catch (err) {
      alert("Erreur lors de la commande: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return <div className="container mt-4"><h3>Votre panier est vide.</h3></div>;

  return (
    <div className="container mt-4">
      <div className="glass br-12" style={{padding: '40px', maxWidth: '800px', margin: '0 auto'}}>
        <div className="flex-between" style={{marginBottom: '30px'}}>
            <h2 className="cart-header">Finaliser la commande</h2>
            <div style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>Étape {step} / 2</div>
        </div>

        {step === 1 ? (
          <div>
            <h3 style={{marginBottom: '20px'}}>1. Récapitulatif et Livraison</h3>
            <div style={{marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px'}}>
                {items.map((item, i) => (
                    <div key={i} className="flex-between" style={{marginBottom: '10px'}}>
                        <span>{item.produit.nom} x {item.quantite}</span>
                        <span>{item.produit.prix * item.quantite} DH</span>
                    </div>
                ))}
                <div className="flex-between" style={{marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold'}}>
                    <span>Total à payer:</span>
                    <span style={{color: 'var(--accent-color)'}}>{total} DH</span>
                </div>
            </div>

            <form style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input type="text" name="adresse" placeholder="Adresse complète" required onChange={handleChange}
                     style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}} />
              <input type="text" name="ville" placeholder="Ville" required onChange={handleChange}
                     style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}} />
              <input type="text" name="telephone" placeholder="Numéro de téléphone" required onChange={handleChange}
                     style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}} />
              
              <button type="button" className="btn-primary" onClick={() => setStep(2)} disabled={!formData.adresse || !formData.ville || !formData.telephone}>
                Suivant : Paiement
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3 style={{marginBottom: '20px'}}>2. Mode de Paiement</h3>
            <p style={{marginBottom: '20px', color: '#94a3b8'}}>Choisissez votre méthode de règlement :</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px'}}>
                <label className="glass" style={{padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <input type="radio" name="payment_mode" value="cash" checked={formData.payment_mode === 'cash'} onChange={handleChange} />
                    <span>Cash (Paiement sur place)</span>
                </label>
                <label className="glass" style={{padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <input type="radio" name="payment_mode" value="delivery" checked={formData.payment_mode === 'delivery'} onChange={handleChange} />
                    <span>Paiement à la livraison</span>
                </label>
            </div>

            <div style={{display: 'flex', gap: '15px'}}>
                <button type="button" className="btn-primary" style={{backgroundColor: 'rgba(255,255,255,0.1)'}} onClick={() => setStep(1)}>
                  Retour
                </button>
                <button type="button" className="btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Traitement...' : `Confirmer et Payer ${total} DH`}
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
