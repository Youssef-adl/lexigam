import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight, Truck, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';
import './molimao-home.css';

const heroSlides = [
  {
    image: '/molimao/slider-shibica.jpg',
    badge: 'NOUVEAU DROP',
    title: 'ŠIBICA / CASABLANCA',
    desc: 'Coupes amples, esthétique brute et sérigraphies d’atelier taillées pour le mouvement de la ville.',
    link: '/shop',
    cta: 'DÉCOUVRIR LE VESTIAIRE'
  },
  {
    image: '/molimao/slider-1.jpg',
    badge: 'STREETWEAR ÉDITORIAL',
    title: 'L’UNIFORME DU QUOTIDIEN',
    desc: 'Coton peigné lourd, matières franches et finitions soignées pour durer au fil des saisons.',
    link: '/shop',
    cta: '{isAr ? 'عرض الكل' : 'VOIR TOUT'} LE VESTIAIRE'
  },
  {
    image: '/molimao/slider-2.jpg',
    badge: 'MINIMALISME GRAPHIQUE',
    title: 'PROPORTIONS NETTES',
    desc: 'Des pièces contemporaines inspirées de l’architecture urbaine et du design fonctionnel.',
    link: '/shop',
    cta: 'ACHETER LA SÉLECTION'
  },
  {
    image: '/molimao/slider-3.jpg',
    badge: 'SÉRIES NUMÉROTÉES',
    title: 'ÉDITIONS D’ART LIMITÉES',
    desc: 'Sérigraphies d’art numérotées sur papier d’archive pour votre espace de vie.',
    link: '/shop?category=Art',
    cta: 'VOIR LES TIRAGES'
  },
  {
    image: '/molimao/slider-feb.jpg',
    badge: 'COLLECTION CAPSULE',
    title: 'MATIÈRES & VOLUMES',
    desc: 'Explorez nos hoodies lourds, sweats à col rond et pièces unisexes de mi-saison.',
    link: '/shop',
    cta: 'EXPLORER LA GAMME'
  }
];

const newProducts = [
  {
    name: 'T-shirt Oversize « Grow » — Écru & Marquage Atelier',
    price: '450 DH',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-grow-1.jpg',
    hover: '/molimao/prod-grow-2.jpg'
  },
  {
    name: 'Casquette Trucker « Radiant » — Mesh Kaki',
    price: '790 DH',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-radiant-1.jpg',
    hover: '/molimao/prod-radiant-2.jpg'
  },
  {
    name: 'Sweat Col Rond « Puder » — Beige Sable',
    price: '690 DH',
    sizes: ['S', 'M', 'L', 'XL'],
    primary: '/molimao/prod-puder-1.jpg',
    hover: '/molimao/prod-puder-2.jpg'
  },
  {
    name: 'Sweat Graphique « Krom » — Noir',
    price: '450 DH',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-krom-1.jpg',
    hover: '/molimao/prod-krom-2.jpg'
  }
];

const featuredProducts = [
  {
    name: 'T-shirt Minimaliste « Sutra » — Noir Minéral',
    price: '420 DH',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-sutra-1.jpg',
    hover: '/molimao/prod-sutra-2.jpg'
  },
  {
    name: 'T-shirt Studio « Cupid » — Coupe Boxy Femme',
    price: '450 DH',
    sizes: ['XS', 'S', 'M', 'L'],
    primary: '/molimao/prod-cupid-1.jpg',
    hover: '/molimao/prod-cupid-2.jpg'
  },
  {
    name: 'T-shirt « Dijamant » — Sérigraphie Géométrique',
    price: '450 DH',
    sizes: ['S', 'M', 'L'],
    primary: '/molimao/prod-diamond-1.jpg',
    hover: '/molimao/prod-diamond-2.jpg'
  },
  {
    name: 'T-shirt « Borovi » — Vert Forêt Urbex',
    price: '420 DH',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primary: '/molimao/prod-borovi-1.jpg',
    hover: '/molimao/prod-borovi-2.jpg'
  },
  {
    name: 'T-shirt « Rituals » — Coton Lourd Noir',
    price: '450 DH',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-kafa-m-1.jpg',
    hover: '/molimao/prod-kafa-m-2.jpg'
  },
  {
    name: 'T-shirt « Pahulja » — Gris Chiné Homme',
    price: '420 DH',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    primary: '/molimao/prod-pahulja-m-1.jpg',
    hover: '/molimao/prod-pahulja-m-2.jpg'
  },
  {
    name: 'T-shirt « Pahulja » — Blanc Craie Femme',
    price: '420 DH',
    sizes: ['XS', 'S', 'M', 'L'],
    primary: '/molimao/prod-pahulja-w-1.jpg',
    hover: '/molimao/prod-pahulja-w-2.jpg'
  },
  {
    name: 'Portefeuille Cuir « Frame » — Tannage Végétal',
    price: '590 DH',
    sizes: ['Taille Unique'],
    primary: '/molimao/prod-frame-1.jpg',
    hover: '/molimao/prod-frame-2.jpg'
  }
];

const artPrints = [
  {
    title: 'Tirage Édition 01 — « Avion » Sérigraphie Numérotée',
    price: '350 DH',
    primary: '/molimao/art-avion-1.jpg',
    hover: '/molimao/art-avion-2.jpg'
  },
  {
    title: 'Tirage Édition 02 — « Mahala Color » Architecture Urbaine',
    price: '350 DH',
    primary: '/molimao/art-color-mahala-1.jpg',
    hover: '/molimao/art-color-mahala-2.jpg'
  },
  {
    title: 'Tirage Édition 03 — « Mahala Noir » Étude Géométrique',
    price: '350 DH',
    primary: '/molimao/art-mahala-1.jpg',
    hover: '/molimao/art-mahala-2.jpg'
  },
  {
    title: 'Tirage Édition 04 — « Ptice » Façades Urbaines',
    price: '350 DH',
    primary: '/molimao/art-ptice-1.jpg',
    hover: '/molimao/art-ptice-2.jpg'
  },
  {
    title: 'Tirage Édition 05 — « Trafika » Esquisse d’Atelier',
    price: '350 DH',
    primary: '/molimao/art-trafika-1.jpg',
    hover: '/molimao/art-trafika-2.jpg'
  }
];

function ProductCard({ product }) {
  return (
    <article className="mm-product-card">
      <Link to="/shop" className="mm-card-media">
        <img src={product.primary} alt={product.name} className="mm-img-primary" loading="lazy" />
        <img src={product.hover} alt={`${product.name} vue portée`} className="mm-img-hover" loading="lazy" />
        <div className="mm-quick-add" title="Ajouter au panier">
          <Plus size={20} strokeWidth={2.4} />
        </div>
      </Link>
      {product.sizes && product.sizes.length > 0 && (
        <div className="mm-card-sizes">
          {product.sizes.map((s) => (
            <span key={s} className="mm-size-tag">{s}</span>
          ))}
        </div>
      )}
      <div className="mm-card-info">
        <Link to="/shop" className="mm-product-title">{product.name}</Link>
        <div className="mm-product-price">{product.price}</div>
      </div>
    </article>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [slide, setSlide] = useState(0);
  const [artSlide, setArtSlide] = useState(0);

  // Auto rotation for hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((curr) => (curr + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextHero = () => setSlide((s) => (s + 1) % heroSlides.length);
  const prevHero = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);

  const visibleArt = [0, 1, 2, 3].map((offset) => artPrints[(artSlide + offset) % artPrints.length]);
  const nextArt = () => setArtSlide((s) => (s + 1) % artPrints.length);
  const prevArt = () => setArtSlide((s) => (s - 1 + artPrints.length) % artPrints.length);
  const displaySlides = isAr ? heroSlides.map((item, index) => ({ ...item,
    badge: ['إصدار جديد','أزياء شارع بطابع تحريري','بساطة بصرية','إصدارات فنية محدودة','مجموعة خاصة'][index],
    title: ['ŠIBICA / الدار البيضاء','زيّ يومي بروح المدينة','تناسق بصري واضح','فن مطبوع بإصدارات محدودة','خامات وأحجام معاصرة'][index],
    cta: ['اكتشف المجموعة','تصفّح كل القطع','اكتشف الاختيارات','اكتشف المطبوعات','استكشف المجموعة'][index]
  })) : heroSlides;

  return (
    <>
      <SEO
        title="LEXIGAM — Vêtements Indépendants & Design Streetwear"
        description="LEXIGAM est un label indépendant associant coupes soignées, design streetwear minimaliste et éditions d'art."
      />
      <main className="mm-home">
        {/* Full-bleed Hero Carousel */}
        <section className="mm-hero-slider">
          {displaySlides.map((s, idx) => (
            <div key={s.image} className={`mm-slide ${idx === slide ? 'active' : ''}`}>
              <img src={s.image} alt={s.title} />
              <div className="mm-slide-overlay">
                <div className="mm-slide-content">
                  <span className="mm-slide-badge">{s.badge}</span>
                  <h2>{s.title}</h2>
                  <Link to={s.link} className="mm-primary-btn">
                    {s.cta} <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <button type="button" className="mm-slider-arrow mm-arrow-prev" onClick={prevHero} aria-label={isAr ? 'الشريحة السابقة' : 'Diapositive précédente'}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" className="mm-slider-arrow mm-arrow-next" onClick={nextHero} aria-label={isAr ? 'الشريحة التالية' : 'Diapositive suivante'}>
            <ChevronRight size={22} />
          </button>

          <div className="mm-slider-dots">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`mm-dot ${idx === slide ? 'active' : ''}`}
                onClick={() => setSlide(idx)}
                aria-label={isAr ? `الانتقال إلى الشريحة ${idx + 1}` : `Aller au slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Notice Strip */}
        <div className="mm-delivery-strip">
          <Truck size={18} />
          <span>{isAr ? 'توصيل مجاني عبر خدمة سريعة للطلبات التي تتجاوز 500 درهم' : 'LIVRAISON OFFERTE PAR COURSIER RAPIDE POUR TOUTE COMMANDE SUPÉRIEURE À 500 DH'}</span>
        </div>

        {/* Section: Nouveautés */}
        <section className="mm-section">
          <header className="mm-section-header centered">
            <h2 className="mm-section-title">{isAr ? 'وصل حديثاً' : 'Nouveautés'}</h2>
          </header>
          <div className="mm-grid-4">
            {newProducts.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
          <div className="mm-btn-center">
            <Link to="/shop" className="mm-outline-btn">
              {isAr ? 'كل المنتجات الجديدة' : 'TOUS LES NOUVEAUX PRODUITS'}
            </Link>
          </div>
        </section>

        {/* Editorial Split Story Section */}
        <section className="mm-editorial-section">
          <div className="mm-editorial-split">
            <div className="mm-editorial-media">
              <img src="/molimao/coffee-editorial.jpg" alt="Atelier et savoir-faire LEXIGAM" loading="lazy" />
            </div>
            <div className="mm-editorial-copy">
              <span className="mm-eyebrow">{isAr ? 'الحِرفة والاستوديو' : 'SAVOIR-FAIRE & ATELIER'}</span>
              <h2>{isAr ? 'فنّ الملابس اليومية — من دفتر استوديو LEXIGAM' : "L'art du vêtement quotidien — Carnet d'atelier LEXIGAM"}</h2>
              <p>
                {isAr ? 'في استوديو LEXIGAM نختبر كل قصّة مع حركة المدينة. نختار أقمشة متينة وقطناً ممشطاً ثقيلاً وأحبار طباعة تدوم عبر المواسم وتحافظ على شكل القطعة وجودتها.' : 'Dans notre studio, chaque coupe est éprouvée dans le mouvement de la ville. Nous sélectionnons des toiles denses, des cotons peignés lourds et des encres de sérigraphie durables conçues pour traverser les saisons sans perdre leur prestance ni leur tombé impeccable.'}
              </p>
              <div>
                <Link to="/blog" className="mm-outline-btn">
                  {isAr ? 'اقرأ المجلة...' : 'LIRE LE JOURNAL...'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Sélection du Studio */}
        <section className="mm-section">
          <header className="mm-section-header">
            <h2 className="mm-section-title">{isAr ? 'اختيارات الاستوديو' : 'Sélection du Studio'}</h2>
            <Link to="/shop" className="mm-outline-btn" style={{ minWidth: 'auto', height: '36px', fontSize: '10px' }}>
              {isAr ? 'عرض الكل' : 'VOIR TOUT'}
            </Link>
          </header>
          <div className="mm-grid-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
          <div className="mm-btn-center">
            <Link to="/shop" className="mm-outline-btn">
              {isAr ? 'تصفّح المتجر' : 'TOUTE LA BOUTIQUE'}
            </Link>
          </div>
        </section>

        {/* Flagship Store Section */}
        <section className="mm-flagship-section">
          <div className="mm-flagship-split">
            <div className="mm-flagship-copy">
              <span className="mm-eyebrow">{isAr ? 'استوديو ومتجر LEXIGAM' : 'STUDIO & BOUTIQUE LEXIGAM'}</span>
              <h2>{isAr ? 'مساحتنا ومتجرنا الرئيسي' : 'Notre espace flagship store'}</h2>
              <p>
                {isAr ? 'اكتشفوا عالمنا عن قرب في استوديو ومتجر LEXIGAM بالدار البيضاء. جرّبوا القصّات، وتعرّفوا على الخامات، واكتشفوا إصداراتنا الفنية المحدودة في مساحة مخصصة للإبداع.' : 'Venez découvrir notre univers en vrai dans notre studio et boutique à Casablanca. Prenez le temps d’essayer nos coupes, de toucher les matières et d’explorer nos séries limitées d’art graphique dans un lieu convivial et dédié à la création.'}
              </p>
              <div>
                <Link to="/about" className="mm-outline-btn">
                  {isAr ? 'اكتشف المكان...' : 'DÉCOUVRIR LE LIEU...'}
                </Link>
              </div>
            </div>
            <div className="mm-flagship-media">
              <img src="/molimao/flagship-store.jpg" alt="Flagship store LEXIGAM" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Art Prints Carousel Section */}
        <section className="mm-art-section">
          <div className="mm-section" style={{ padding: '0' }}>
            <header className="mm-section-header centered">
              <h2 className="mm-section-title">{isAr ? 'إصدارات فنية وطباعة حريرية' : 'Éditions Art & Sérigraphies'}</h2>
            </header>
            <div className="mm-art-slider-wrap">
              <button type="button" className="mm-slider-arrow mm-arrow-prev" onClick={prevArt} aria-label={isAr ? 'الإصدار السابق' : 'Tirage précédent'}>
                <ChevronLeft size={20} />
              </button>
              <div className="mm-art-slider">
                {visibleArt.map((art, idx) => (
                  <article key={art.title + idx} className="mm-art-card">
                    <Link to="/shop?category=Art" className="mm-art-frame">
                      <img src={art.primary} alt={art.title} loading="lazy" />
                    </Link>
                    <div className="mm-art-title">{art.title}</div>
                    <div className="mm-art-price">{art.price}</div>
                  </article>
                ))}
              </div>
              <button type="button" className="mm-slider-arrow mm-arrow-next" onClick={nextArt} aria-label={isAr ? 'الإصدار التالي' : 'Tirage suivant'}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="mm-btn-center">
              <Link to="/shop?category=Art" className="mm-outline-btn">
                {isAr ? 'جميع الإصدارات الفنية' : "TOUTES LES ÉDITIONS D'ART"}
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Guarantee Blocks */}
        <section className="mm-trust-section">
          <div className="mm-trust-grid">
            <article className="mm-trust-card">
              <img src="/molimao/delivery.png" alt="Livraison express" className="mm-trust-icon" />
              <div>
                <h3>{isAr ? 'توصيل سريع مع تتبّع' : 'LIVRAISON RAPIDE & SUIVIE'}</h3>
                <p>
                  {isAr ? 'توصيل سريع خلال 24 إلى 48 ساعة في المغرب وخارجه. التوصيل مجاني للطلبات ابتداءً من 500 درهم.' : "Livraison express par coursier en 24h à 48h partout au Maroc et à l'international. La livraison est offerte pour toute commande à partir de 500 DH."}
                </p>
              </div>
            </article>
            <article className="mm-trust-card">
              <img src="/molimao/secure.png" alt="Paiement sécurisé" className="mm-trust-icon" />
              <div>
                <h3>{isAr ? 'دفع آمن 100٪' : 'PAIEMENT 100% SÉCURISÉ'}</h3>
                <p>
                  {isAr ? 'معاملات مشفّرة ومحمية بتقنيتي SSL و3D Secure، مع إمكانية الدفع نقداً عند الاستلام.' : 'Transactions bancaires cryptées et sécurisées par protocole SSL et 3D Secure. Option de paiement en espèces à la livraison également disponible.'}
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
