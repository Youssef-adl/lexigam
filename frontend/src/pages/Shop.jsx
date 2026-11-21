import SEO from '../components/SEO';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Plus } from 'lucide-react';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';
import { addToCart } from '../store/cartSlice';

const demoProducts = [
  {
    id: 'm1',
    nom: 'T-shirt Oversize « Grow » — Écru & Marquage Atelier',
    prix: 450.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-grow-1.jpg',
    hover: '/molimao/prod-grow-2.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'T-shirt oversize écru avec petit marquage noir discret sur la poitrine.'
  },
  {
    id: 'm2',
    nom: 'Casquette Trucker « Radiant » — Mesh Kaki',
    prix: 790.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-radiant-1.jpg',
    hover: '/molimao/prod-radiant-2.jpg',
    sizes: ['Taille unique'],
    description: 'Casquette trucker kaki avec panneaux latéraux en mesh et marquage graphique discret à l’avant.'
  },
  {
    id: 'm3',
    nom: 'Sweat Col Rond « Puder » — Beige Sable',
    prix: 690.00,
    category: 'Women',
    categoryName: 'Femmes',
    image: '/molimao/prod-puder-1.jpg',
    hover: '/molimao/prod-puder-2.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sweat col rond beige sable avec motif abstrait noir sur le devant et petite signature orange.'
  },
  {
    id: 'm4',
    nom: 'Sweat Graphique « Krom » — Noir',
    prix: 450.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-krom-1.jpg',
    hover: '/molimao/prod-krom-2.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Sweat noir à manches longues, col rond et grand motif graphique blanc sur le devant.'
  },
  {
    id: 'm5',
    nom: 'T-shirt Minimaliste « Sutra » — Noir Minéral',
    prix: 420.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-sutra-1.jpg',
    hover: '/molimao/prod-sutra-2.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'L’essentiel du vestiaire streetwear quotidien. Coupe droite moderne et col côtelé indéformable.'
  },
  {
    id: 'm6',
    nom: 'T-shirt Studio « Cupid » — Coupe Boxy Femme',
    prix: 450.00,
    category: 'Women',
    categoryName: 'Femmes',
    image: '/molimao/prod-cupid-1.jpg',
    hover: '/molimao/prod-cupid-2.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Coupe ample boxy contemporaine avec illustration studio originale imprimée à la main.'
  },
  {
    id: 'm7',
    nom: 'T-shirt « Dijamant » — Sérigraphie Géométrique',
    prix: 450.00,
    category: 'Women',
    categoryName: 'Femmes',
    image: '/molimao/prod-diamond-1.jpg',
    hover: '/molimao/prod-diamond-2.jpg',
    sizes: ['S', 'M', 'L'],
    description: 'Motif géométrique inspiré du brutalisme sur jersey de coton épais doux au toucher.'
  },
  {
    id: 'm8',
    nom: 'T-shirt « Borovi » — Vert Forêt Urbex',
    prix: 420.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-borovi-1.jpg',
    hover: '/molimao/prod-borovi-2.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Teinte vert forêt profond, inspiré de la nature brute environnante et des explorations urbaines.'
  },
  {
    id: 'm9',
    nom: 'T-shirt « Rituals » — Coton Lourd Noir',
    prix: 450.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-kafa-m-1.jpg',
    hover: '/molimao/prod-kafa-m-2.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Inspiré des rituels caféiers des métropoles. Graphisme sérigraphié haute durabilité.'
  },
  {
    id: 'm10',
    nom: 'T-shirt « Pahulja » — Gris Chiné Homme',
    prix: 420.00,
    category: 'Men',
    categoryName: 'Hommes',
    image: '/molimao/prod-pahulja-m-1.jpg',
    hover: '/molimao/prod-pahulja-m-2.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Gris chiné intemporel, maille dense et douce pour un confort supérieur en toutes saisons.'
  },
  {
    id: 'm11',
    nom: 'T-shirt « Pahulja » — Blanc Craie Femme',
    prix: 420.00,
    category: 'Women',
    categoryName: 'Femmes',
    image: '/molimao/prod-pahulja-w-1.jpg',
    hover: '/molimao/prod-pahulja-w-2.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Blanc craie lumineux, coupe féminine décontractée et col net en bord-côte double.'
  },
  {
    id: 'm12',
    nom: 'Portefeuille Cuir « Frame » — Tannage Végétal',
    prix: 590.00,
    category: 'Accessoires',
    categoryName: 'Accessoires',
    image: '/molimao/prod-frame-1.jpg',
    hover: '/molimao/prod-frame-2.jpg',
    sizes: ['Taille Unique'],
    description: 'Cuir véritable teinté dans la masse avec logo LEXIGAM marqué à chaud et fentes pour cartes.'
  },
  {
    id: 'm13',
    nom: 'Tirage Édition 01 — « Avion » Sérigraphie Numérotée',
    prix: 350.00,
    category: 'Art',
    categoryName: 'Éditions Art',
    image: '/molimao/art-avion-1.jpg',
    hover: '/molimao/art-avion-2.jpg',
    sizes: ['30x40 cm', '50x70 cm'],
    description: 'Tirage d’art numéroté et gaufré à la main sur papier d’archive 250g.'
  },
  {
    id: 'm14',
    nom: 'Tirage Édition 02 — « Mahala Color » Architecture Urbaine',
    prix: 350.00,
    category: 'Art',
    categoryName: 'Éditions Art',
    image: '/molimao/art-color-mahala-1.jpg',
    hover: '/molimao/art-color-mahala-2.jpg',
    sizes: ['30x40 cm', '50x70 cm'],
    description: 'Composition géométrique et teintes chaudes inspirées des façades urbaines contemporaines.'
  },
  {
    id: 'm15',
    nom: 'Tirage Édition 03 — « Mahala Noir » Étude Géométrique',
    prix: 350.00,
    category: 'Art',
    categoryName: 'Éditions Art',
    image: '/molimao/art-mahala-1.jpg',
    hover: '/molimao/art-mahala-2.jpg',
    sizes: ['30x40 cm', '50x70 cm'],
    description: 'Encre noire intense sur fond papier blanc mat avec bordure passe-partout.'
  },
  {
    id: 'm16',
    nom: 'Tirage Édition 04 — « Ptice » Façades Urbaines',
    prix: 350.00,
    category: 'Art',
    categoryName: 'Éditions Art',
    image: '/molimao/art-ptice-1.jpg',
    hover: '/molimao/art-ptice-2.jpg',
    sizes: ['30x40 cm', '50x70 cm'],
    description: 'Lignes épurées et contrastes graphiques forts pour espaces intérieurs contemporains.'
  },
  {
    id: 'm17',
    nom: 'Tirage Édition 05 — « Trafika » Esquisse d’Atelier',
    prix: 350.00,
    category: 'Art',
    categoryName: 'Éditions Art',
    image: '/molimao/art-trafika-1.jpg',
    hover: '/molimao/art-trafika-2.jpg',
    sizes: ['30x40 cm', '50x70 cm'],
    description: 'Croquis d’atelier original tiré en série très limitée à 50 exemplaires numérotés.'
  }
];

const categoryTabs = [
  { key: 'ALL', label: 'Tout le vestiaire' },
  { key: 'Women', label: 'Femmes' },
  { key: 'Men', label: 'Hommes' },
  { key: 'Art', label: 'Éditions Art' },
  { key: 'Accessoires', label: 'Accessoires' }
];

export default function Shop({ category = 'All Products' }) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [d, setD] = useState([]);
  const [load, setLoad] = useState(true);
  const [activeTab, setActiveTab] = useState(
    category === 'Women' ? 'Women' : category === 'Men' ? 'Men' : 'ALL'
  );
  const [sort, setSort] = useState('NEW');

  const loc = useLocation();
  const dispatch = useDispatch();
  const q = new URLSearchParams(loc.search).get('nom');
  const catParam = new URLSearchParams(loc.search).get('category');

  useEffect(() => {
    if (catParam) {
      setActiveTab(catParam);
    } else if (category === 'Women') {
      setActiveTab('Women');
    } else if (category === 'Men') {
      setActiveTab('Men');
    }
  }, [catParam, category]);

  useEffect(() => {
    api
      .get(q ? '/produits?nom=' + encodeURIComponent(q) : '/produits')
      .then((x) => {
        const res = x.data?.data || x.data || [];
        setD(res.length ? res : demoProducts);
      })
      .catch(() => {
        setD(demoProducts);
      })
      .finally(() => setLoad(false));
  }, [q]);

  const filteredProducts = useMemo(() => {
    let arr = d.length ? d : demoProducts;

    if (q) {
      arr = arr.filter((p) => (p.nom || '').toLowerCase().includes(q.toLowerCase()));
    }

    if (activeTab !== 'ALL') {
      arr = arr.filter((p) => {
        const cat = (p.category || p.categoryName || p.categorie?.nom || '').toLowerCase();
        return cat.includes(activeTab.toLowerCase());
      });
    }

    if (sort === 'PRICE_LOW') {
      arr = [...arr].sort((a, b) => Number(a.prix) - Number(b.prix));
    }
    if (sort === 'PRICE_HIGH') {
      arr = [...arr].sort((a, b) => Number(b.prix) - Number(a.prix));
    }

    return arr;
  }, [d, q, activeTab, sort]);

  const isDatabaseProduct = (product) => {
    const id = Number(product?.id);
    return Number.isSafeInteger(id) && id > 0;
  };

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDatabaseProduct(product)) return;
    dispatch(addToCart({ produit: { ...product, id: Number(product.id) }, quantite: 1, taille: product.sizes?.[0] || 'M' }));
  };

  const getPageTitle = () => {
    if (activeTab === 'Women') return isAr ? 'مجموعة النساء' : 'Vestiaire Femmes';
    if (activeTab === 'Men') return isAr ? 'مجموعة الرجال' : 'Vestiaire Hommes';
    if (activeTab === 'Art') return isAr ? 'إصدارات فنية وطباعة حريرية' : 'Éditions Art & Sérigraphies';
    if (activeTab === 'Accessoires') return isAr ? 'إكسسوارات وقطع مختارة' : 'Accessoires & Objets';
    return isAr ? 'جميع القطع' : 'Toutes les pièces';
  };

  return (
    <>
      <SEO
        title={isAr ? `متجر LEXIGAM — ${getPageTitle()}` : `Boutique LEXIGAM — ${getPageTitle()}`}
        description={isAr ? 'اكتشفوا قطع LEXIGAM المستقلة من الملابس والإكسسوارات والإصدارات الفنية.' : "Découvrez les vestes d'atelier, t-shirts, sweats à capuche et tirages d'art du vestiaire indépendant LEXIGAM."}
      />
      <div className="mm-section mm-shop-page" style={{ paddingTop: '40px', minHeight: '80vh' }}>
        {/* Shop Header */}
        <div className="mm-shop-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
          <div>
            <span className="mm-eyebrow">{isAr ? 'المتجر الإلكتروني' : 'BOUTIQUE EN LIGNE'}</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: '6px 0 0', color: '#0f0f0f' }}>
              {getPageTitle()}
            </h1>
            <p style={{ fontSize: '13px', color: '#777', margin: '6px 0 0' }}>
              {isAr ? `${filteredProducts.length} قطعة متاحة في المتجر` : `${filteredProducts.length} pièces disponibles au catalogue`}
            </p>
          </div>

          <div className="mm-shop-sort" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  appearance: 'none',
                  padding: '9px 36px 9px 16px',
                  borderRadius: '20px',
                  border: '1px solid #eaeaea',
                  background: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#333',
                  cursor: 'pointer'
                }}
              >
                <option value="NEW">{isAr ? 'الأحدث أولاً' : "Nouveautés d'abord"}</option>
                <option value="PRICE_LOW">{isAr ? 'السعر: من الأقل إلى الأعلى' : 'Prix : ordre croissant'}</option>
                <option value="PRICE_HIGH">{isAr ? 'السعر: من الأعلى إلى الأقل' : 'Prix : ordre décroissant'}</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#777' }} />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mm-shop-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px', borderBottom: '1px solid #eaeaea', paddingBottom: '16px' }}>
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: activeTab === tab.key ? '1.5px solid #0f0f0f' : '1px solid #eaeaea',
                background: activeTab === tab.key ? '#0f0f0f' : '#ffffff',
                color: activeTab === tab.key ? '#ffffff' : '#444444',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isAr ? ({ ALL: 'جميع القطع', Women: 'نساء', Men: 'رجال', Art: 'إصدارات فنية', Accessoires: 'إكسسوارات' }[tab.key] || tab.label) : tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {load ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#888', fontWeight: 600 }}>
            {isAr ? 'جارٍ تحميل المنتجات...' : 'Chargement des pièces...'}
          </div>
        ) : filteredProducts.length ? (
          <div className="mm-grid-4">
            {filteredProducts.map((p) => {
              const primarySrc = p.image || '/molimao/prod-grow-1.jpg';
              const hoverSrc = p.hover || p.hoverImage || primarySrc;
              return (
                <article className="mm-product-card" key={p.id || p.nom}>
                  <Link to={`/product/${p.id || 'm1'}`} className="mm-card-media">
                    <img src={primarySrc} alt={p.nom} className="mm-img-primary" loading="lazy" />
                    <img src={hoverSrc} alt={`${p.nom} vue portée`} className="mm-img-hover" loading="lazy" />
                    {isDatabaseProduct(p) ? (
                      <button
                        type="button"
                        className="mm-quick-add"
                        onClick={(e) => handleQuickAdd(e, p)}
                        title={isAr ? 'إضافة إلى السلة' : 'Ajouter au panier'}
                        aria-label={isAr ? 'إضافة إلى السلة' : 'Ajouter au panier'}
                      >
                        <Plus size={20} strokeWidth={2.4} />
                      </button>
                    ) : (
                      <span className="mm-demo-badge" aria-label={isAr ? 'منتج للعرض فقط' : 'Aperçu uniquement'}>
                        {isAr ? 'للعرض فقط' : 'APERÇU'}
                      </span>
                    )}
                  </Link>

                  {p.sizes && p.sizes.length > 0 && (
                    <div className="mm-card-sizes">
                      {p.sizes.map((s) => (
                        <span key={s} className="mm-size-tag">{s}</span>
                      ))}
                    </div>
                  )}

                  <div className="mm-card-info">
                    <Link to={`/product/${p.id || 'm1'}`} className="mm-product-title">
                      {p.nom}
                    </Link>
                    <div className="mm-product-price">
                      {typeof p.prix === 'number' ? p.prix.toFixed(0) : p.prix} DH
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#777' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
              {isAr ? 'لم يتم العثور على منتجات' : 'Aucune pièce trouvée'}
            </h3>
            <p>{isAr ? 'جرّبوا اختيار فئة أخرى أو تعديل كلمات البحث.' : 'Essayez de sélectionner une autre catégorie ou modifiez vos critères de recherche.'}</p>
            <button
              type="button"
              className="mm-outline-btn"
              onClick={() => setActiveTab('ALL')}
              style={{ marginTop: '16px' }}
            >
              {isAr ? 'عرض جميع القطع' : 'Afficher tout le vestiaire'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
