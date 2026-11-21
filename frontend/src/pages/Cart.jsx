import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Minus, Plus, Trash2, ArrowLeft, ArrowUpRight, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((a, i) => a + Number(i.produit.prix) * i.quantite, 0);

  if (!items.length) {
    return (
      <>
        <SEO title="Panier — LEXIGAM" description="Votre panier d'achats est actuellement vide." />
        <div className="mm-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 20px' }}>
          <ShoppingBag size={48} style={{ color: '#bbb', marginBottom: '20px' }} />
          <span className="mm-eyebrow">PANIER LEXIGAM</span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 16px', color: '#0f0f0f' }}>Votre panier est vide</h1>
          <p style={{ color: '#666', fontSize: '14px', maxWidth: '380px', marginBottom: '28px' }}>
            Découvrez nos nouvelles pièces streetwear, t-shirts oversize, sweats à capuche et tirages d'art.
          </p>
          <Link className="mm-primary-btn" to="/shop">
            DÉCOUVRIR LE VESTIAIRE <ArrowUpRight size={15} />
          </Link>
        </div>
      </>
    );
  }

  const src = (p) => {
    const img = p?.image || p?.primary || '';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return (import.meta.env.VITE_API_URL || 'http://localhost:8000') + img;
  };

  const shippingCost = total >= 500 ? 0 : 40;
  const finalTotal = total + shippingCost;

  return (
    <>
      <SEO title="Panier — LEXIGAM" description="Vérifiez vos articles et finalisez votre commande en toute sécurité." />
      <div className="mm-section" style={{ paddingTop: '40px', minHeight: '80vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #eaeaea', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <span className="mm-eyebrow">VOTRE SÉLECTION</span>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '6px 0 0', color: '#0f0f0f' }}>
              Panier d'achats ({items.length})
            </h1>
          </div>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#0f0f0f', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> CONTINUER MES ACHATS
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          {/* Liste des articles du panier */}
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((i) => (
              <article
                key={i.produit.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: '1px solid #eaeaea',
                }}
              >
                <div style={{ width: '100px', aspectRatio: '4/5', background: '#f7f7f7', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src={src(i.produit)} alt={i.produit.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: '#0f0f0f' }}>
                    {i.produit.nom}
                  </h2>
                  <div style={{ fontSize: '12px', color: '#777', marginBottom: '12px' }}>
                    Taille : <strong>{i.taille || 'M'}</strong>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#EB5728', marginBottom: '14px' }}>
                    {Number(i.produit.prix).toFixed(0)} DH
                  </div>

                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '20px', padding: '2px 8px' }}>
                    <button
                      type="button"
                      style={{ background: 'none', border: 0, padding: '4px 8px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                      onClick={() => dispatch(updateQuantity({ id: i.produit.id, quantite: Math.max(1, i.quantite - 1) }))}
                    >
                      <Minus size={12} />
                    </button>
                    <b style={{ minWidth: '24px', textAlign: 'center', fontSize: '12px' }}>{i.quantite}</b>
                    <button
                      type="button"
                      style={{ background: 'none', border: 0, padding: '4px 8px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                      onClick={() => dispatch(updateQuantity({ id: i.produit.id, quantite: i.quantite + 1 }))}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                  <strong style={{ fontSize: '15px', fontWeight: 800, color: '#0f0f0f' }}>
                    {(Number(i.produit.prix) * i.quantite).toFixed(0)} DH
                  </strong>
                  <button
                    type="button"
                    style={{ background: 'none', border: 0, color: '#999', cursor: 'pointer', padding: '6px' }}
                    onClick={() => dispatch(removeFromCart(i.produit.id))}
                    title="Supprimer l'article"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          {/* Récapitulatif de commande */}
          <aside style={{ background: '#f8f8f8', padding: '32px', borderRadius: '4px', border: '1px solid #eaeaea', height: 'fit-content' }}>
            <span className="mm-eyebrow">RÉCAPITULATIF</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #eaeaea', fontSize: '14px', fontWeight: 600 }}>
              <span>Sous-total :</span>
              <span>{total.toFixed(0)} DH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #eaeaea', fontSize: '14px', fontWeight: 600 }}>
              <span>Frais de livraison :</span>
              <span style={{ color: total >= 500 ? '#03b361' : '#333' }}>
                {total >= 500 ? 'GRATUITE' : '40 DH'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: '18px', fontWeight: 800, color: '#0f0f0f' }}>
              <span>Total TTC :</span>
              <span>{finalTotal.toFixed(0)} DH</span>
            </div>

            <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.5, margin: '0 0 20px' }}>
              Livraison offerte pour toute commande supérieure à 500 DH partout au Maroc.
            </p>

            <Link
              to="/checkout"
              className="mm-primary-btn"
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              COMMANDER MAINTENANT <ArrowUpRight size={15} />
            </Link>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#666' }}>
              <span>✓ Paiement par carte bancaire 100% sécurisé</span>
              <span>✓ Paiement à la livraison en espèces disponible</span>
              <span>✓ Expédition soignée sous 24 à 48 heures</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
