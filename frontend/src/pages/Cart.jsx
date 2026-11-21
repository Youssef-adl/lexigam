import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Minus, Plus, Trash2, ArrowLeft, ArrowUpRight, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const dispatch = useDispatch();
  const getPrice = (product) => {
    const value = Number(product?.prix ?? product?.price ?? product?.prix_unitaire);
    return Number.isFinite(value) ? value : 0;
  };
  const total = items.reduce((sum, item) => sum + getPrice(item.produit) * (Number(item.quantite) || 1), 0);

  if (!items.length) {
    return (
      <>
        <SEO title={isAr ? 'سلة التسوق — LEXIGAM' : 'Panier — LEXIGAM'} description={isAr ? 'سلة التسوق فارغة حالياً.' : "Votre panier d'achats est actuellement vide."} />
        <div className="mm-section mm-cart-page mm-cart-empty" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 20px' }}>
          <ShoppingBag size={48} style={{ color: '#bbb', marginBottom: '20px' }} />
          <span className="mm-eyebrow">{isAr ? 'سلة LEXIGAM' : 'PANIER LEXIGAM'}</span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 16px', color: '#0f0f0f' }}>{isAr ? 'سلة التسوق فارغة' : 'Votre panier est vide'}</h1>
          <p style={{ color: '#666', fontSize: '14px', maxWidth: '380px', marginBottom: '28px' }}>
            {isAr ? 'اكتشفوا أحدث قطع أزياء الشارع والقمصان الواسعة والسترات والإصدارات الفنية.' : "Découvrez nos nouvelles pièces streetwear, t-shirts oversize, sweats à capuche et tirages d'art."}
          </p>
          <Link className="mm-primary-btn" to="/shop">
            {isAr ? 'اكتشفوا المجموعة' : 'DÉCOUVRIR LE VESTIAIRE'} <ArrowUpRight size={15} />
          </Link>
        </div>
      </>
    );
  }

  const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
  const backendOrigin = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
  const src = (product) => {
    const image = product?.image || product?.primary || product?.image_url || '';
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return backendOrigin + (image.startsWith('/') ? image : '/' + image);
  };

  const shippingCost = total >= 500 ? 0 : 40;
  const finalTotal = total + shippingCost;

  return (
    <>
      <SEO title={isAr ? 'سلة التسوق — LEXIGAM' : 'Panier — LEXIGAM'} description={isAr ? 'راجعوا المنتجات وأتمّوا طلبكم بأمان.' : "Vérifiez vos articles et finalisez votre commande en toute sécurité."} />
      <div className="mm-section mm-cart-page" style={{ paddingTop: '40px', minHeight: '80vh' }}>
        <div className="mm-cart-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #eaeaea', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <span className="mm-eyebrow">{isAr ? 'اختياراتكم' : 'VOTRE SÉLECTION'}</span>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '6px 0 0', color: '#0f0f0f' }}>
              {isAr ? `سلة التسوق (${items.length})` : `Panier d'achats (${items.length})`}
            </h1>
          </div>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#0f0f0f', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> {isAr ? 'مواصلة التسوق' : 'CONTINUER MES ACHATS'}
          </Link>
        </div>

        <div className="mm-cart-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          {/* Liste des articles du panier */}
          <section className="mm-cart-items" style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((i) => (
              <article
                key={i.produit.id}
                className="mm-cart-row"
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
                  {src(i.produit) ? (
                    <img
                      src={src(i.produit)}
                      alt={i.produit?.nom || 'Produit'}
                      onError={(event) => { event.currentTarget.style.display = 'none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: '#999', fontSize: '11px' }}>
                      {isAr ? 'الصورة غير متوفرة' : 'Image indisponible'}
                    </div>
                  )}
                </div>

                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: '#0f0f0f' }}>
                    {i.produit.nom}
                  </h2>
                  <div style={{ fontSize: '12px', color: '#777', marginBottom: '12px' }}>
                    {isAr ? 'المقاس:' : 'Taille :'} <strong>{i.taille || 'M'}</strong>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#EB5728', marginBottom: '14px' }}>
                    {getPrice(i.produit).toFixed(0)} DH
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
                    {(getPrice(i.produit) * (Number(i.quantite) || 1)).toFixed(0)} DH
                  </strong>
                  <button
                    type="button"
                    style={{ background: 'none', border: 0, color: '#999', cursor: 'pointer', padding: '6px' }}
                    onClick={() => dispatch(removeFromCart(i.produit.id))}
                    title={isAr ? 'حذف المنتج' : "Supprimer l'article"}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          {/* Récapitulatif de commande */}
          <aside className="mm-cart-summary" style={{ background: '#f8f8f8', padding: '32px', borderRadius: '4px', border: '1px solid #eaeaea', height: 'fit-content' }}>
            <span className="mm-eyebrow">{isAr ? 'ملخص الطلب' : 'RÉCAPITULATIF'}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #eaeaea', fontSize: '14px', fontWeight: 600 }}>
              <span>{isAr ? 'المجموع الفرعي:' : 'Sous-total :'}</span>
              <span>{total.toFixed(0)} DH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #eaeaea', fontSize: '14px', fontWeight: 600 }}>
              <span>{isAr ? 'مصاريف التوصيل:' : 'Frais de livraison :'}</span>
              <span style={{ color: total >= 500 ? '#03b361' : '#333' }}>
                {total >= 500 ? (isAr ? 'مجاني' : 'GRATUITE') : '40 DH'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: '18px', fontWeight: 800, color: '#0f0f0f' }}>
              <span>{isAr ? 'الإجمالي:' : 'Total TTC :'}</span>
              <span>{finalTotal.toFixed(0)} DH</span>
            </div>

            <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.5, margin: '0 0 20px' }}>
              {isAr ? 'التوصيل مجاني لجميع الطلبات التي تتجاوز 500 درهم داخل المغرب.' : 'Livraison offerte pour toute commande supérieure à 500 DH partout au Maroc.'}
            </p>

            <Link
              to="/checkout"
              className="mm-primary-btn"
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              {isAr ? 'إتمام الطلب الآن' : 'COMMANDER MAINTENANT'} <ArrowUpRight size={15} />
            </Link>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#666' }}>
              <span>✓ {isAr ? 'دفع آمن بالبطاقة البنكية' : 'Paiement par carte bancaire 100% sécurisé'}</span>
              <span>✓ {isAr ? 'الدفع نقداً عند الاستلام متاح' : 'Paiement à la livraison en espèces disponible'}</span>
              <span>✓ {isAr ? 'الشحن خلال 24 إلى 48 ساعة' : 'Expédition soignée sous 24 à 48 heures'}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
