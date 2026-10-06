import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import api from '../axios';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function Checkout() {
  const { items } = useSelector((s) => s.cart);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    adresse: '',
    ville: '',
    telephone: '',
    payment_mode: 'cash',
  });

  useEffect(() => {
    if (!user) navigate('/login', { state: { from: '/checkout' } });
  }, [user, navigate]);

  const total = items.reduce((a, i) => a + i.produit.prix * i.quantite, 0);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/commandes', {
        items: items.map((i) => ({ id: i.produit.id, quantite: i.quantite })),
        ...form,
      });
      dispatch(clearCart());
      navigate('/order-success/' + res.data.commande_id);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="empty-page container-wide">
        <h1>Your bag is empty.</h1>
        <a href="/shop">Back to shop</a>
      </div>
    );
  }

  return (
    <div className="checkout-page container-wide">
      <div className="checkout-head">
        <span className="eyebrow">CHECKOUT / {step} OF 2</span>
        <h1>Finish your order.</h1>
      </div>
      <div className="checkout-layout">
        <section className="checkout-form">
          {step === 1 ? (
            <>
              <span className="eyebrow">01 / DELIVERY</span>
              <h2>Where should we send it?</h2>
              <input
                name="adresse"
                placeholder="FULL ADDRESS"
                value={form.adresse}
                onChange={change}
              />
              <div className="checkout-row">
                <input
                  name="ville"
                  placeholder="CITY"
                  value={form.ville}
                  onChange={change}
                />
                <input
                  name="telephone"
                  placeholder="PHONE"
                  value={form.telephone}
                  onChange={change}
                />
              </div>
              <button
                className="fashion-cta checkout-button"
                disabled={!form.adresse || !form.ville || !form.telephone}
                onClick={() => setStep(2)}
              >
                CONTINUE <ArrowUpRight size={17} />
              </button>
            </>
          ) : (
            <>
              <span className="eyebrow">02 / PAYMENT</span>
              <h2>Choose payment.</h2>
              <label className="payment-choice">
                <input
                  type="radio"
                  name="payment_mode"
                  value="cash"
                  checked={form.payment_mode === 'cash'}
                  onChange={change}
                />
                <span>Cash</span>
                <small>Pay when your order is delivered.</small>
              </label>
              <label className="payment-choice">
                <input
                  type="radio"
                  name="payment_mode"
                  value="delivery"
                  checked={form.payment_mode === 'delivery'}
                  onChange={change}
                />
                <span>Payment on delivery</span>
                <small>Available for eligible delivery zones.</small>
              </label>
              <div className="checkout-actions">
                <button onClick={() => setStep(1)}>
                  <ArrowLeft size={15} /> BACK
                </button>
                <button
                  className="fashion-cta"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? 'PROCESSING' : 'CONFIRM ORDER'}{' '}
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </>
          )}
        </section>
        <aside className="order-summary">
          <span className="eyebrow">ORDER SUMMARY</span>
          {items.map((i) => (
            <div className="summary-line" key={i.produit.id}>
              <span>
                {i.produit.nom} × {i.quantite}
              </span>
              <b>{i.produit.prix * i.quantite} DH</b>
            </div>
          ))}
          <div className="summary-total">
            <span>TOTAL</span>
            <strong>{total} DH</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}