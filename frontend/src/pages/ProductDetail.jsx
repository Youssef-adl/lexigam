import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Heart, Minus, Plus, Star, ArrowLeft, ArrowUpRight, LoaderCircle } from 'lucide-react';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';

const DEMOS = {
  demo0: {
    id: 'demo0',
    nom: 'ARCHIVE BOMBER',
    prix: 890,
    stock: 12,
    description: 'A structured everyday outer layer with a relaxed street silhouette.',
    image: '/webpImage/image-1.jpg',
  },
  demo1: {
    id: 'demo1',
    nom: 'NOCTURNE OVERSHIRT',
    prix: 690,
    stock: 10,
    description: 'Brushed cotton overshirt designed for layering and everyday wear.',
    image: '/webpImage/image-6.jpg',
  },
  demo2: {
    id: 'demo2',
    nom: 'AFTER DARK JACKET',
    prix: 1190,
    stock: 8,
    description: 'Clean outerwear silhouette with a sharper late-night profile.',
    image: '/webpImage/image-3.jpg',
  },
  demo3: {
    id: 'demo3',
    nom: 'DAILY UNIFORM TEE',
    prix: 390,
    stock: 20,
    description: 'Heavyweight everyday tee with an oversized fit.',
    image: '/webpImage/image-5.jpg',
  },
  demo4: {
    id: 'demo4',
    nom: 'DISTRICT OVERSHIRT',
    prix: 690,
    stock: 10,
    description: 'Relaxed overshirt with a clean utility finish.',
    image: '/webpImage/image-14.jpg',
  },
  demo5: {
    id: 'demo5',
    nom: 'RAW DENIM 01',
    prix: 720,
    stock: 15,
    description: 'Straight relaxed denim built for everyday rotation.',
    image: '/webpImage/image-2.jpg',
  },
  demo6: {
    id: 'demo6',
    nom: 'HEAVYWEIGHT HOODIE',
    prix: 590,
    stock: 14,
    description: 'Loopback cotton hoodie with structured hood and relaxed cut.',
    image: '/webpImage/image-7.jpg',
  },
  demo7: {
    id: 'demo7',
    nom: 'WIDE CARGO TROUSER',
    prix: 640,
    stock: 9,
    description: 'Relaxed cotton cargo trousers with deep utility pockets.',
    image: '/webpImage/image-8.jpg',
  },
  demo8: {
    id: 'demo8',
    nom: 'MINIMAL FLEECE',
    prix: 490,
    stock: 12,
    description: 'Soft structured fleece layer with a clean everyday silhouette.',
    image: '/webpImage/image-12.jpg',
  },
  demo9: {
    id: 'demo9',
    nom: 'STUDIO SHIRT',
    prix: 620,
    stock: 9,
    description: 'Relaxed studio shirt with a graphic utilitarian finish.',
    image: '/webpImage/image-14.jpg',
  },
  demo10: {
    id: 'demo10',
    nom: 'UTILITY VEST',
    prix: 540,
    stock: 8,
    description: 'Light utility vest with practical layering proportions.',
    image: '/webpImage/image-15.jpg',
  },
  demo11: {
    id: 'demo11',
    nom: 'CASABLANCA HOODIE',
    prix: 600,
    stock: 11,
    description: 'Heavyweight hood with a relaxed city fit.',
    image: '/webpImage/image-16.jpg',
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const { language } = useLanguage();

  const [p, setP] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ note: 5, commentaire: '' });
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setP(null);
    setError(false);

    const load = async () => {
      if (DEMOS[id]) {
        setP(DEMOS[id]);
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
        const [a, b] = await Promise.all([
          api.get('/produits/' + id),
          api.get('/produits/' + id + '/avis'),
        ]);
        if (active) {
          setP(a.data.data || a.data);
          setReviews(b.data.data || []);
        }
      } catch (e) {
        if (active) setError(true);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const image = p?.image?.startsWith('http')
    ? p.image
    : p?.image?.startsWith('/')
    ? p.image
    : p
    ? 'http://localhost:8000' + p.image
    : '/webpImage/image-1.jpg';

  const total = useMemo(() => (p ? Number(p.prix) * qty : 0), [p, qty]);

  if (error)
    return (
      <div className="pb-empty">
        <small>PRODUCT / 404</small>
        <h1>Product not found.</h1>
        <Link to="/shop" className="pb-btn">
          BACK TO SHOP <ArrowUpRight size={15} />
        </Link>
      </div>
    );

  if (!p)
    return (
      <div className="pb-loading-screen">
        <LoaderCircle className="spin" />
        <span>LOADING PRODUCT</span>
      </div>
    );

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/avis', { produit_id: id, ...review });
      setReviews([...reviews, { ...res.data.data, user }]);
      setReview({ note: 5, commentaire: '' });
    } catch (e) {
      alert(e.response?.data?.message || 'Unable to publish review');
    }
  };

  return (
    <div className="pb-product-page">
      <div className="pb-product-breadcrumbs">
        <Link to="/shop">
          <ArrowLeft size={13} /> {language === 'ar' ? 'الرجوع للمتجر' : 'BACK TO SHOP'}
        </Link>
        <span>/</span>
        <b>{p.nom}</b>
      </div>

      <div className="pb-product-grid">
        <div className="pb-product-gallery">
          <div className="pb-gallery-main">
            <img src={image} alt={p.nom} />
            <span>{p.stock < 6 ? 'LOW STOCK' : 'NEW'}</span>
          </div>
          <div className="pb-gallery-grid">
            <div>
              <img src={image} alt="Product detail" />
            </div>
            <div className="pb-gallery-editorial">
              <img src="/webpImage/image-23.jpg" alt="LEXIGAM editorial detail" />
            </div>
          </div>
        </div>

        <aside className="pb-product-panel">
          <div className="pb-panel-head">
            <small>026 / LEXIGAM ARCHIVE</small>
            <h1>{p.nom}</h1>
            <strong>{p.prix} DH</strong>
            <p>{p.description}</p>
          </div>

          <div className="pb-size-select">
            <div className="pb-size-labels">
              <span>{language === 'ar' ? 'المقاس' : 'SELECT SIZE'}</span>
              <button>{language === 'ar' ? 'دليل المقاسات' : 'SIZE GUIDE'}</button>
            </div>
            <div className="pb-sizes">
              {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  className={size === s ? 'active' : ''}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-qty-row">
            <span>{language === 'ar' ? 'الكمية' : 'QUANTITY'}</span>
            <div className="pb-qty-box">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={14} />
              </button>
              <b>{qty}</b>
              <button onClick={() => setQty(qty + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="pb-panel-actions">
            <button
              className="pb-btn full"
              onClick={() => dispatch(addToCart({ ...p, image, taille: size, quantite: qty }))}
            >
              {language === 'ar' ? 'أضف إلى السلة' : 'ADD TO BAG'} — {total} DH{' '}
              <ArrowUpRight size={15} />
            </button>
            <button className="pb-wishlist-btn" aria-label="Add to wishlist">
              <Heart size={16} />
            </button>
          </div>

          <div className="pb-product-specs">
            <details open>
              <summary>
                COMPOSITION & CARE <Plus size={14} />
              </summary>
              <p>Heavyweight cotton blend. Cold wash inside-out. Do not tumble dry.</p>
            </details>
            <details>
              <summary>
                SHIPPING & DELIVERY <Plus size={14} />
              </summary>
              <p>Delivered within 24–48 hours across Morocco. Cash on delivery available.</p>
            </details>
            <details>
              <summary>
                AUTHENTICITY <Plus size={14} />
              </summary>
              <p>Original LEXIGAM design, crafted and tailored in Casablanca.</p>
            </details>
          </div>
        </aside>
      </div>

      <section className="pb-reviews-section">
        <div className="pb-reviews-header">
          <div>
            <small>COMMUNITY</small>
            <h2>Customer reviews ({reviews.length})</h2>
          </div>
        </div>

        <div className="pb-reviews-list">
          {reviews.map((r, i) => (
            <article key={i} className="pb-review-item">
              <div className="pb-review-top">
                <strong>{r.user?.name || 'VERIFIED CLIENT'}</strong>
                <div className="pb-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={12}
                      fill={n <= r.note ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              <p>{r.commentaire}</p>
            </article>
          ))}
        </div>

        {user?.role === 'client' && (
          <form className="pb-review-form" onSubmit={submit}>
            <small>LEAVE A REVIEW</small>
            <select
              value={review.note}
              onChange={(e) => setReview({ ...review, note: +e.target.value })}
            >
              <option value="5">5 STARS — EXCELLENT</option>
              <option value="4">4 STARS — VERY GOOD</option>
              <option value="3">3 STARS — GOOD</option>
              <option value="2">2 STARS — FAIR</option>
              <option value="1">1 STAR — POOR</option>
            </select>
            <textarea
              placeholder="Tell us about the fit, texture and quality..."
              value={review.commentaire}
              onChange={(e) => setReview({ ...review, commentaire: e.target.value })}
              required
            />
            <button className="pb-btn">
              SUBMIT REVIEW <ArrowUpRight size={14} />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}