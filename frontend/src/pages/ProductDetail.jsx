import SEO from '../components/SEO';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Minus, Plus, Star, ArrowLeft, ArrowUpRight, Heart, ChevronDown, Truck, RotateCcw, LoaderCircle } from 'lucide-react';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';

const commonSizes = ['XS', 'S', 'M', 'L', 'XL'];

const MOLIMAO_DEMOS = {
  m1: {
    id: 'm1',
    nom: 'T-shirt Oversize « Grow » — Écru & Marquage Atelier',
    prix: 450.00,
    stock: 25,
    description: 'T-shirt oversize écru avec petit marquage noir discret sur la poitrine.',
    image: '/molimao/prod-grow-1.jpg',
    gallery: ['/molimao/prod-grow-1.jpg', '/molimao/prod-grow-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Coupe oversize streetwear',
    material: 'Coton',
  },
  m2: {
    id: 'm2',
    nom: 'Casquette Trucker « Radiant » — Mesh Kaki',
    prix: 790.00,
    stock: 20,
    description: 'Casquette trucker kaki avec panneaux latéraux en mesh et marquage graphique discret à l’avant.',
    image: '/molimao/prod-radiant-1.jpg',
    gallery: ['/molimao/prod-radiant-1.jpg', '/molimao/prod-radiant-2.jpg'],
    sizes: ['Taille unique'],
    fit: 'Taille unique avec fermeture réglable',
    material: 'Panneaux textiles et mesh respirant',
  },
  m3: {
    id: 'm3',
    nom: 'Sweat Col Rond « Puder » — Beige Sable',
    prix: 690.00,
    stock: 15,
    description: 'Sweat col rond beige sable avec motif abstrait noir sur le devant et petite signature orange.',
    image: '/molimao/prod-puder-1.jpg',
    gallery: ['/molimao/prod-puder-1.jpg', '/molimao/prod-puder-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Coupe unisexe confort',
    material: 'Molleton doux',
  },
  m4: {
    id: 'm4',
    nom: 'Sweat Graphique « Krom » — Noir',
    prix: 450.00,
    stock: 18,
    description: 'Sweat noir à manches longues, col rond et grand motif graphique blanc sur le devant.',
    image: '/molimao/prod-krom-1.jpg',
    gallery: ['/molimao/prod-krom-1.jpg', '/molimao/prod-krom-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Coupe droite ample',
    material: 'Molleton doux',
  },
  m5: {
    id: 'm5',
    nom: 'T-shirt Minimaliste « Sutra » — Noir Minéral',
    prix: 420.00,
    stock: 22,
    description: 'L’essentiel du vestiaire streetwear quotidien. Coupe droite moderne et col côtelé indéformable.',
    image: '/molimao/prod-sutra-1.jpg',
    gallery: ['/molimao/prod-sutra-1.jpg', '/molimao/prod-sutra-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Coupe droite contemporaine',
    material: '100% jersey de coton 220g',
  },
  m6: {
    id: 'm6',
    nom: 'T-shirt Studio « Cupid » — Coupe Boxy Femme',
    prix: 450.00,
    stock: 14,
    description: 'Coupe ample boxy contemporaine avec illustration studio originale imprimée à la main.',
    image: '/molimao/prod-cupid-1.jpg',
    gallery: ['/molimao/prod-cupid-1.jpg', '/molimao/prod-cupid-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L'],
    fit: 'Coupe boxy loose',
    material: '100% coton doux 200g',
  },
  m7: {
    id: 'm7',
    nom: 'T-shirt « Dijamant » — Sérigraphie Géométrique',
    prix: 450.00,
    stock: 30,
    description: 'Motif géométrique inspiré du brutalisme sur jersey de coton épais doux au toucher.',
    image: '/molimao/prod-diamond-1.jpg',
    gallery: ['/molimao/prod-diamond-1.jpg', '/molimao/prod-diamond-2.jpg'],
    sizes: ['S', 'M', 'L'],
    fit: 'Coupe décontractée',
    material: '100% coton peigné 220g',
  },
  m8: {
    id: 'm8',
    nom: 'T-shirt « Borovi » — Vert Forêt Urbex',
    prix: 420.00,
    stock: 10,
    description: 'Teinte vert forêt profond, inspiré de la nature brute environnante et des explorations urbaines.',
    image: '/molimao/prod-borovi-1.jpg',
    gallery: ['/molimao/prod-borovi-1.jpg', '/molimao/prod-borovi-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Coupe droite classique',
    material: '100% coton peigné 220g',
  },
  m9: {
    id: 'm9',
    nom: 'T-shirt « Rituals » — Coton Lourd Noir',
    prix: 450.00,
    stock: 18,
    description: 'Inspiré des rituels caféiers des métropoles. Graphisme sérigraphié haute durabilité.',
    image: '/molimao/prod-kafa-m-1.jpg',
    gallery: ['/molimao/prod-kafa-m-1.jpg', '/molimao/prod-kafa-m-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Coupe streetwear droite',
    material: '100% coton lourd 240g',
  },
  m10: {
    id: 'm10',
    nom: 'T-shirt « Pahulja » — Gris Chiné Homme',
    prix: 420.00,
    stock: 16,
    description: 'Gris chiné intemporel, maille dense et douce pour un confort supérieur en toutes saisons.',
    image: '/molimao/prod-pahulja-m-1.jpg',
    gallery: ['/molimao/prod-pahulja-m-1.jpg', '/molimao/prod-pahulja-m-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Coupe droite ajustée',
    material: 'Coton peigné & jersey chiné',
  },
  m11: {
    id: 'm11',
    nom: 'T-shirt « Pahulja » — Blanc Craie Femme',
    prix: 420.00,
    stock: 15,
    description: 'Blanc craie lumineux, coupe féminine décontractée et col net en bord-côte double.',
    image: '/molimao/prod-pahulja-w-1.jpg',
    gallery: ['/molimao/prod-pahulja-w-1.jpg', '/molimao/prod-pahulja-w-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L'],
    fit: 'Coupe féminine décontractée',
    material: '100% coton peigné 200g',
  },
  m12: {
    id: 'm12',
    nom: 'Portefeuille Cuir « Frame » — Tannage Végétal',
    prix: 590.00,
    stock: 12,
    description: 'Cuir véritable teinté dans la masse avec logo LEXIGAM marqué à chaud et fentes pour cartes.',
    image: '/molimao/prod-frame-1.jpg',
    gallery: ['/molimao/prod-frame-1.jpg', '/molimao/prod-frame-2.jpg'],
    sizes: ['Taille Unique'],
    fit: 'Format poche compact',
    material: '100% cuir de vachette pleine fleur',
  },
  m13: {
    id: 'm13',
    nom: 'Tirage Édition 01 — « Avion » Sérigraphie Numérotée',
    prix: 350.00,
    stock: 35,
    description: 'Tirage d’art numéroté et gaufré à la main sur papier d’archive 250g.',
    image: '/molimao/art-avion-1.jpg',
    gallery: ['/molimao/art-avion-1.jpg', '/molimao/art-avion-2.jpg'],
    sizes: ['30x40 cm', '50x70 cm'],
    fit: 'Format standard pour encadrement',
    material: 'Papier d’art d’archive 250g',
  },
  m14: {
    id: 'm14',
    nom: 'Tirage Édition 02 — « Mahala Color » Architecture Urbaine',
    prix: 350.00,
    stock: 30,
    description: 'Composition géométrique et teintes chaudes inspirées des façades urbaines contemporaines.',
    image: '/molimao/art-color-mahala-1.jpg',
    gallery: ['/molimao/art-color-mahala-1.jpg', '/molimao/art-color-mahala-2.jpg'],
    sizes: ['30x40 cm', '50x70 cm'],
    fit: 'Format standard pour encadrement',
    material: 'Papier d’art d’archive 250g',
  },
  m15: {
    id: 'm15',
    nom: 'Tirage Édition 03 — « Mahala Noir » Étude Géométrique',
    prix: 350.00,
    stock: 25,
    description: 'Encre noire intense sur fond papier blanc mat avec bordure passe-partout.',
    image: '/molimao/art-mahala-1.jpg',
    gallery: ['/molimao/art-mahala-1.jpg', '/molimao/art-mahala-2.jpg'],
    sizes: ['30x40 cm', '50x70 cm'],
    fit: 'Format standard',
    material: 'Papier d’art d’archive 250g',
  },
  m16: {
    id: 'm16',
    nom: 'Tirage Édition 04 — « Ptice » Façades Urbaines',
    prix: 350.00,
    stock: 25,
    description: 'Lignes épurées et contrastes graphiques forts pour espaces intérieurs contemporains.',
    image: '/molimao/art-ptice-1.jpg',
    gallery: ['/molimao/art-ptice-1.jpg', '/molimao/art-ptice-2.jpg'],
    sizes: ['30x40 cm', '50x70 cm'],
    fit: 'Format standard',
    material: 'Papier d’art d’archive 250g',
  },
  m17: {
    id: 'm17',
    nom: 'Tirage Édition 05 — « Trafika » Esquisse d’Atelier',
    prix: 350.00,
    stock: 20,
    description: 'Croquis d’atelier original tiré en série très limitée à 50 exemplaires numérotés.',
    image: '/molimao/art-trafika-1.jpg',
    gallery: ['/molimao/art-trafika-1.jpg', '/molimao/art-trafika-2.jpg'],
    sizes: ['30x40 cm', '50x70 cm'],
    fit: 'Format standard',
    material: 'Papier d’art d’archive 250g',
  }
};

const DEMOS = {
  ...MOLIMAO_DEMOS,
  demo0: MOLIMAO_DEMOS.m1,
  demo1: MOLIMAO_DEMOS.m2,
  demo2: MOLIMAO_DEMOS.m3,
  demo3: MOLIMAO_DEMOS.m4,
  demo4: MOLIMAO_DEMOS.m5,
  demo5: MOLIMAO_DEMOS.m6,
  demo6: MOLIMAO_DEMOS.m7,
  demo7: MOLIMAO_DEMOS.m8,
  demo8: MOLIMAO_DEMOS.m9,
  demo9: MOLIMAO_DEMOS.m10,
  demo10: MOLIMAO_DEMOS.m11,
  demo11: MOLIMAO_DEMOS.m12,
};

const money = (value) => `${Number(value || 0).toFixed(0)} DH`;

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
                <p>Lavage à 30°C sur l'envers. Ne pas sécher en machine. Repassage doux sur l'envers.</p>
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
