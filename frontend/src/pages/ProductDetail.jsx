import SEO from '../components/SEO';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Minus, Plus, Star, ArrowLeft, ArrowUpRight, Heart, ChevronDown, Truck, RotateCcw, LoaderCircle } from 'lucide-react';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';

const commonSizes = ['XS', 'S', 'M', 'L', 'XL'];

const DEMOS = {
  demo0: {
    id: 'demo0',
    nom: 'ARCHIVE BOMBER',
    prix: 890,
    stock: 12,
    description: 'A structured everyday outer layer with a relaxed street silhouette.',
    image: '/webpImage/image-1.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Heavyweight cotton blend',
  },
  demo1: {
    id: 'demo1',
    nom: 'NOCTURNE OVERSHIRT',
    prix: 690,
    stock: 10,
    description: 'Brushed cotton overshirt designed for layering and everyday wear.',
    image: '/webpImage/image-1.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Brushed cotton blend',
  },
  demo2: {
    id: 'demo2',
    nom: 'AFTER DARK JACKET',
    prix: 1190,
    stock: 8,
    description: 'Clean outerwear silhouette with a sharper late-night profile.',
    image: '/webpImage/image-3.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Technical cotton shell',
  },
  demo3: {
    id: 'demo3',
    nom: 'DAILY UNIFORM TEE',
    prix: 390,
    stock: 20,
    description: 'Heavyweight everyday tee with an oversized fit.',
    image: '/webpImage/image-5.jpg',
    sizes: commonSizes,
    fit: 'Oversized fit',
    material: '100% cotton',
  },
  demo4: {
    id: 'demo4',
    nom: 'DISTRICT OVERSHIRT',
    prix: 690,
    stock: 10,
    description: 'Relaxed overshirt with a clean utility finish.',
    image: '/webpImage/image-14.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Cotton twill',
  },
  demo5: {
    id: 'demo5',
    nom: 'RAW DENIM 01',
    prix: 720,
    stock: 15,
    description: 'Straight relaxed denim built for everyday rotation.',
    image: '/webpImage/image-2.jpg',
    sizes: commonSizes,
    fit: 'Straight fit',
    material: 'Raw cotton denim',
  },
  demo6: {
    id: 'demo6',
    nom: 'HEAVYWEIGHT HOODIE',
    prix: 590,
    stock: 14,
    description: 'Loopback cotton hoodie with a structured hood and relaxed cut.',
    image: '/webpImage/image-7.jpg',
    sizes: commonSizes,
    fit: 'Oversized fit',
    material: 'Heavyweight cotton',
  },
  demo7: {
    id: 'demo7',
    nom: 'WIDE CARGO TROUSER',
    prix: 640,
    stock: 9,
    description: 'Relaxed cotton cargo trousers with deep utility pockets.',
    image: '/webpImage/image-8.jpg',
    sizes: commonSizes,
    fit: 'Wide leg',
    material: 'Cotton canvas',
  },
  demo8: {
    id: 'demo8',
    nom: 'MINIMAL FLEECE',
    prix: 490,
    stock: 12,
    description: 'Soft structured fleece layer with a clean everyday silhouette.',
    image: '/webpImage/image-12.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Soft fleece',
  },
  demo9: {
    id: 'demo9',
    nom: 'STUDIO SHIRT',
    prix: 620,
    stock: 9,
    description: 'Relaxed studio shirt with a graphic utilitarian finish.',
    image: '/webpImage/image-14.jpg',
    gallery: [
      '/webpImage/image-14.jpg',
      '/webpImage/image-14 copy.jpg',
      '/webpImage/image-15.jpg',
      '/webpImage/image-16.jpg',
    ],
    sizes: commonSizes,
    fit: 'Regular fit',
    material: 'Cotton poplin',
  },
  demo10: {
    id: 'demo10',
    nom: 'UTILITY VEST',
    prix: 540,
    stock: 8,
    description: 'Light utility vest with practical layering proportions.',
    image: '/webpImage/image-15.jpg',
    sizes: commonSizes,
    fit: 'Regular fit',
    material: 'Cotton ripstop',
  },
  demo11: {
    id: 'demo11',
    nom: 'CASABLANCA HOODIE',
    prix: 600,
    stock: 11,
    description: 'Heavyweight hood with a relaxed city fit.',
    image: '/webpImage/image-16.jpg',
    sizes: commonSizes,
    fit: 'Relaxed fit',
    material: 'Heavyweight cotton',
  },
};

const money = (value) => `${Number(value || 0).toLocaleString('fr-MA')} DH`;

export default function ProductDetail() {
  const { id } = useParams();
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const { language } = useLanguage();

  const [p, setP] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ note: 5, commentaire: '' });
  const [error, setError] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const isAr = language === 'ar';

  useEffect(() => {
    let active = true;
    setP(null);
    setError(false);
    setSelectedImage('');
    setSize('');
    setQty(1);

    const load = async () => {
      if (DEMOS[id]) {
        setP(DEMOS[id]);
        setSelectedImage(DEMOS[id].image);
        setReviews([
          {
            note: 5,
            commentaire: 'Great weight, clean fit and very easy to style.',
            user: { name: 'LEXIGAM CLIENT' },
          },
        ]);
        return;
      }

      try {
        const [productResponse, reviewsResponse] = await Promise.all([
          api.get('/produits/' + id),
          api.get('/produits/' + id + '/avis'),
        ]);

        if (!active) return;
        const product = productResponse.data.data || productResponse.data;
        setP(product);
        setSelectedImage(product?.image || '');
        setReviews(reviewsResponse.data.data || []);
      } catch {
        if (active) setError(true);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [id]);

  const imageUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http') || value.startsWith('/')) return value;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${value}`;
  };

  const gallery = Array.from(new Set(
    (p?.gallery?.length ? p.gallery : [p?.image]).filter(Boolean).map(imageUrl)
  ));

  const activeImage = imageUrl(selectedImage || p?.image);
  const sizes = Array.isArray(p?.sizes) && p.sizes.length
    ? p.sizes
    : commonSizes;
  const fit = p?.fit || 'Relaxed fit';
  const material = p?.material || 'Premium everyday fabric';
  const category = p?.categorie?.nom || 'LEXIGAM ARCHIVE';
  const sku = p?.sku || 'N/A';
  const total = Number(p?.prix || 0) * qty;

  const addProduct = () => {
    if (!size || !p) return;

    dispatch(addToCart({
      ...p,
      image: activeImage,
      taille: size,
      quantite: qty,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setReviewError('');

    try {
      const response = await api.post('/avis', {
        produit_id: id,
        ...review,
      });

      setReviews((current) => [...current, { ...response.data.data, user }]);
      setReview({ note: 5, commentaire: '' });
    } catch (e) {
      if (e.isAuthError || e.response?.status === 401) {
        setReviewError(
          isAr
            ? 'خاصك تسجل الدخول باش تقدر تضيف تقييم.'
            : 'Please sign in to leave a review.'
        );
      } else {
        setReviewError(
          e.response?.data?.message || 'Unable to publish review.'
        );
      }
    }
  };

  if (error) {
    return (
      <div className="pb-detail-state">
        <small>PRODUCT / 404</small>
        <h1>Product not found.</h1>
        <Link to="/shop" className="pb-detail-link">
          BACK TO SHOP <ArrowUpRight size={15} />
        </Link>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="pb-detail-state">
        <LoaderCircle className="spin" />
        <small>LOADING PRODUCT</small>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={p.nom}
        description={p.description}
        image={activeImage}
        product={p}
      />

      <main className="pb-product-page pb-product-page-retail" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="pb-detail-topline">
          <Link to="/shop" className="pb-detail-back">
            <ArrowLeft size={14} />
            {isAr ? 'الرجوع للمتجر' : 'RETOUR AU SHOP'}
          </Link>
          <span>{category} / 026</span>
        </div>

        <div className="pb-detail-layout">
          <section className="pb-detail-gallery" aria-label={isAr ? 'صور المنتج' : 'Product gallery'}>
            <div className="pb-detail-main-image">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={p.nom}
                  fetchPriority="high"
                />
              )}
              <span className="pb-detail-image-label">
                {p.stock < 6 ? 'LOW STOCK' : 'LEXIGAM'}
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="pb-detail-thumbs">
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={src === activeImage ? 'active' : ''}
                    onClick={() => setSelectedImage(src)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img src={src} alt={`${p.nom} detail ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="pb-detail-info">
            <header className="pb-detail-heading">
              <p className="pb-detail-kicker">LEXIGAM / {category}</p>
              <h1>{p.nom}</h1>
              <strong>{money(p.prix)}</strong>

              <p className="pb-detail-description">{p.description}</p>

              <ul className="pb-detail-bullets">
                <li>{isAr ? 'مصمم ومنجز في الدار البيضاء.' : 'Designed and produced in Casablanca.'}</li>
                <li>{isAr ? 'يمكن إرجاع أو تبديل المنتج حسب شروط المتجر.' : 'Exchange and return options are available under our store policy.'}</li>
              </ul>
            </header>

            <div className="pb-detail-option">
              <div className="pb-detail-option-head">
                <label htmlFor="detail-size">
                  {isAr ? 'المقاس' : 'TAILLE'}
                </label>
                <button type="button" className="pb-detail-size-guide">
                  {isAr ? 'دليل المقاسات' : 'GUIDE DES TAILLES'}
                </button>
              </div>

              <select
                id="detail-size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                aria-label={isAr ? 'اختيار المقاس' : 'Choisir une taille'}
              >
                <option value="">
                  {isAr ? 'اختر المقاس' : 'Choisir une option'}
                </option>
                {sizes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="pb-detail-option pb-detail-quantity">
              <label>{isAr ? 'الكمية' : 'QUANTITÉ'}</label>
              <div className="pb-detail-quantity-control">
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.min(Math.max(1, Number(p.stock) || 1), value + 1))}
                  aria-label="Increase quantity"
                  disabled={qty >= Number(p.stock || 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="pb-detail-purchase">
              <button
                type="button"
                className="pb-detail-add"
                disabled={!size || Number(p.stock) < 1}
                onClick={addProduct}
              >
                <span>
                  {isAr ? 'أضف إلى السلة' : 'AJOUTER AU PANIER'}
                  {size ? ` · ${money(total)}` : ''}
                </span>
                <ArrowUpRight size={17} />
              </button>

              <button
                type="button"
                className="pb-detail-heart"
                aria-label={isAr ? 'إضافة إلى المفضلة' : 'Ajouter aux favoris'}
              >
                <Heart size={17} />
              </button>
            </div>

            <p className="pb-detail-sku">SKU: {sku}</p>

            <div className="pb-detail-delivery">
              <div className="pb-detail-delivery-icon"><Truck size={18} /></div>
              <div>
                <h2>{isAr ? 'خيارات التوصيل' : 'OPTIONS DE LIVRAISON'}</h2>
                <p>
                  {isAr
                    ? 'التوصيل داخل المغرب متاح، والدفع عند الاستلام متوفر عند إتمام الطلب.'
                    : 'Livraison au Maroc. Paiement à la livraison disponible au checkout.'}
                </p>
                <p>
                  {isAr
                    ? 'مدة التوصيل تقديرية وتظهر حسب المدينة أثناء إتمام الطلب.'
                    : 'Le délai estimé dépend de la ville et est confirmé au checkout.'}
                </p>
              </div>
            </div>

            <div className="pb-detail-accordions">
              <details open>
                <summary>
                  <span>{isAr ? 'المقاس والخامة' : 'COUPE & MATIÈRE'}</span>
                  <ChevronDown size={15} />
                </summary>
                <div className="pb-detail-spec-grid">
                  <span>FIT</span><strong>{fit}</strong>
                  <span>MATERIAL</span><strong>{material}</strong>
                  <span>SIZE</span><strong>{sizes.join(', ')}</strong>
                </div>
              </details>

              <details>
                <summary>
                  <span>{isAr ? 'العناية' : 'ENTRETIEN'}</span>
                  <ChevronDown size={15} />
                </summary>
                <p>Wash cold, inside-out. Do not tumble dry. Follow the care label attached to the garment.</p>
              </details>

              <details>
                <summary>
                  <span>{isAr ? 'الإرجاع والاستبدال' : 'RETOURS & ÉCHANGES'}</span>
                  <ChevronDown size={15} />
                </summary>
                <p>
                  {isAr
                    ? 'راجع سياسة الإرجاع قبل إرسال الطلب.'
                    : 'Consultez notre politique de retours avant de finaliser votre commande.'}
                </p>
              </details>
            </div>
          </section>
        </div>

        <section className="pb-detail-reviews">
          <div>
            <small>COMMUNITY / {reviews.length}</small>
            <h2>{isAr ? 'آراء العملاء' : 'AVIS CLIENTS'}</h2>
          </div>

          <div className="pb-detail-review-list">
            {reviews.length ? reviews.map((item, index) => (
              <article key={item.id || index}>
                <header>
                  <strong>{item.user?.name || 'VERIFIED CLIENT'}</strong>
                  <span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill={star <= Number(item.note) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </span>
                </header>
                <p>{item.commentaire}</p>
              </article>
            )) : (
              <p className="pb-detail-muted">No reviews yet.</p>
            )}

            {user?.role === 'client' && (
              <form className="pb-detail-review-form" onSubmit={submit}>
                <small>{isAr ? 'أضف تقييماً' : 'LAISSER UN AVIS'}</small>
                {reviewError && <p className="pb-inline-error">{reviewError}</p>}
                <select
                  value={review.note}
                  onChange={(e) => setReview({ ...review, note: Number(e.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>{value} STARS</option>
                  ))}
                </select>
                <textarea
                  value={review.commentaire}
                  onChange={(e) => setReview({ ...review, commentaire: e.target.value })}
                  placeholder="Tell us about the fit, texture and quality..."
                  required
                />
                <button type="submit" className="pb-detail-review-submit">
                  SUBMIT REVIEW <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="pb-detail-service-strip" aria-label="LEXIGAM services">
          <div><Truck size={18} /><span>DELIVERY</span><p>Morocco-wide delivery</p></div>
          <div><RotateCcw size={18} /><span>RETURNS</span><p>Simple return request</p></div>
          <div><Heart size={18} /><span>LEXIGAM</span><p>Independent Casablanca label</p></div>
        </section>
      </main>
    </>
  );
}
