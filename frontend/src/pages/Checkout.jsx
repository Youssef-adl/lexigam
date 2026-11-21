import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import api from '../axios';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Checkout() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [form, setForm] = useState({
    adresse: '',
    ville: '',
    telephone: '',
    payment_mode: 'cash',
  });

  useEffect(() => {
    if (!user) navigate('/login', { state: { from: '/checkout' } });
  }, [user, navigate]);

  const total = items.reduce(
    (sum, item) => sum + Number(item.produit?.prix || 0) * Number(item.quantite || 1),
    0
  );
  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  if (!items.length) {
    return (
      <div className="pb-empty">
        <h1>{isAr ? 'سلة التسوق فارغة.' : 'Your bag is empty.'}</h1>
        <Link to="/shop" className="pb-btn">
          {isAr ? 'العودة إلى المتجر' : 'BACK TO SHOP'}
        </Link>
      </div>
    );
  }

  const submit = async () => {
    setCheckoutError('');

    const hasInvalidProduct = items.some((item) => {
      const id = Number(item.produit?.id);
      return !Number.isSafeInteger(id) || id < 1;
    });

    if (hasInvalidProduct) {
      setCheckoutError(isAr
        ? 'السلة فيها منتج تجريبي قديم. حيدو من السلة؛ المنتجات التجريبية ما كتقبلش الطلبات. خاص إضافة منتجات منشورة في المتجر.'
        : "Votre panier contient un ancien article de démonstration. Supprimez-le : seuls les produits publiés dans la base du magasin peuvent être commandés.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/commandes', {
        items: items.map((item) => ({
          id: Number(item.produit.id),
          quantite: Number(item.quantite),
        })),
        ...form,
      });
      dispatch(clearCart());
      navigate('/order-success/' + response.data.commande_id);
    } catch (error) {
      if (error.isAuthError || error.response?.status === 401) {
        setCheckoutError(isAr ? 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول من جديد.' : 'Your session has expired. Please sign in again.');
      } else {
        const validationMessage = Object.values(error.response?.data?.errors || {}).flat()[0];
        setCheckoutError(
          validationMessage ||
          error.response?.data?.message ||
          (isAr ? 'تعذّر إتمام الطلب. حاولوا مرة أخرى.' : error.message || 'Unable to place the order.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-checkout" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="pb-check-head">
        <small>
          LEXIGAM / {isAr ? 'إتمام الطلب' : 'CHECKOUT'} / {step} {isAr ? 'من 2' : 'OF 2'}
        </small>
        <h1>{isAr ? 'أكملوا طلبكم.' : 'Complete your order.'}</h1>
      </div>

      <div className="pb-check-layout">
        <section className="pb-check-form">
          {step === 1 ? (
            <>
              <small>01 / {isAr ? 'التوصيل' : 'DELIVERY'}</small>
              <h2>{isAr ? 'أين نرسل طلبكم؟' : 'Where should we deliver?'}</h2>

              <label>
                {isAr ? 'العنوان الكامل' : 'FULL ADDRESS'}
                <input
                  name="adresse"
                  value={form.adresse}
                  onChange={change}
                  placeholder={isAr ? 'العنوان' : 'ADDRESS'}
                  required
                />
              </label>

              <div>
                <label>
                  {isAr ? 'المدينة' : 'CITY'}
                  <input
                    name="ville"
                    value={form.ville}
                    onChange={change}
                    placeholder={isAr ? 'المدينة' : 'CITY'}
                    required
                  />
                </label>
                <label>
                  {isAr ? 'رقم الهاتف' : 'PHONE'}
                  <input
                    name="telephone"
                    value={form.telephone}
                    onChange={change}
                    placeholder={isAr ? 'رقم الهاتف' : 'PHONE'}
                    required
                  />
                </label>
              </div>

              {checkoutError && <p className="pb-error" role="alert">{checkoutError}</p>}

              <button
                className="pb-btn"
                disabled={!form.adresse || !form.ville || !form.telephone}
                onClick={() => setStep(2)}
              >
                {isAr ? 'متابعة' : 'CONTINUE'} <ArrowUpRight size={15} />
              </button>
            </>
          ) : (
            <>
              <small>02 / {isAr ? 'الدفع' : 'PAYMENT'}</small>
              <h2>{isAr ? 'اختاروا طريقة الدفع.' : 'Choose payment.'}</h2>

              <label className="pb-payment">
                <input
                  type="radio"
                  name="payment_mode"
                  value="cash"
                  checked={form.payment_mode === 'cash'}
                  onChange={change}
                />
                <span>{isAr ? 'نقداً' : 'CASH'}</span>
                <em>{isAr ? 'ادفعوا عند استلام الطلب.' : 'Pay when your order is delivered.'}</em>
              </label>

              <label className="pb-payment">
                <input
                  type="radio"
                  name="payment_mode"
                  value="delivery"
                  checked={form.payment_mode === 'delivery'}
                  onChange={change}
                />
                <span>{isAr ? 'الدفع عند التوصيل' : 'PAYMENT ON DELIVERY'}</span>
                <em>{isAr ? 'متاح حسب منطقة التوصيل.' : 'Available for eligible delivery zones.'}</em>
              </label>

              {checkoutError && <p className="pb-error" role="alert">{checkoutError}</p>}

              <div className="pb-check-actions">
                <button onClick={() => setStep(1)}>
                  <ArrowLeft size={14} /> {isAr ? 'رجوع' : 'BACK'}
                </button>
                <button className="pb-btn" onClick={submit} disabled={loading}>
                  {loading ? (isAr ? 'جارٍ المعالجة...' : 'PROCESSING') : (isAr ? 'تأكيد الطلب' : 'CONFIRM ORDER')}
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </>
          )}
        </section>

        <aside className="pb-order-summary">
          <small>{isAr ? 'ملخص الطلب' : 'ORDER SUMMARY'}</small>
          {items.map((item) => (
            <div key={item.produit.id}>
              <span>{item.produit.nom} × {item.quantite}</span>
              <b>{(Number(item.produit.prix || 0) * Number(item.quantite || 1)).toFixed(0)} DH</b>
            </div>
          ))}
          <strong>
            {isAr ? 'الإجمالي' : 'TOTAL'}
            <b>{total.toFixed(0)} DH</b>
          </strong>
        </aside>
      </div>
    </main>
  );
}
