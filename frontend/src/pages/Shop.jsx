import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Heart, SlidersHorizontal, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import api from '../axios';
import { addToCart } from '../store/cartSlice';
import { useLanguage } from '../i18n/LanguageContext';

const demo = [
  ['ARCHIVE BOMBER', 890, '/webpImage/image-1.jpg'],
  ['HEAVYWEIGHT HOODIE', 590, '/webpImage/image-7.jpg'],
  ['WIDE CARGO TROUSER', 640, '/webpImage/image-8.jpg'],
  ['CORE TEE / 02', 290, '/webpImage/image-11.jpg'],
  ['DISTRICT OVERSHIRT', 690, '/webpImage/image-6.jpg'],
  ['RAW DENIM 01', 720, '/webpImage/image-2.jpg'],
  ['AFTER DARK JACKET', 1190, '/webpImage/image-3.jpg'],
  ['FIELD TEE / 01', 350, '/webpImage/image-5.jpg'],
  ['MINIMAL FLEECE', 490, '/webpImage/image-12.jpg'],
  ['STUDIO SHIRT', 620, '/webpImage/image-14.jpg'],
  ['UTILITY VEST', 540, '/webpImage/image-15.jpg'],
  ['CASABLANCA HOODIE', 600, '/webpImage/image-16.jpg'],
];

const fits = ['ALL', 'STRAIGHT', 'BAGGY', 'RELAXED', 'SLIM', 'WIDE LEG'];
const colors = ['BLACK', 'WHITE', 'BLUE', 'GREY', 'GREEN'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function Shop({ category = 'All Products' }) {
  const { t, language } = useLanguage();
  const [d, setD] = useState([]);
  const [load, setLoad] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [fit, setFit] = useState('ALL');
  const [color, setColor] = useState('ALL');
  const [size, setSize] = useState('ALL');
  const [sort, setSort] = useState('NEW');

  const loc = useLocation();
  const dispatch = useDispatch();
  const q = new URLSearchParams(loc.search).get('nom');

  useEffect(() => {
    api
      .get(q ? '/produits?nom=' + encodeURIComponent(q) : '/produits')
      .then((x) => setD(x.data?.data || x.data || []))
      .catch(() => setD([]))
      .finally(() => setLoad(false));
  }, [q]);

  const data = useMemo(() => {
    let arr = d.length
      ? d
      : demo.map((x, i) => ({
          id: 'demo' + i,
          nom: x[0],
          prix: x[1],
          description: 'Premium everyday garment.',
          image: x[2],
          taille: 'M',
        }));

    if (q) arr = arr.filter((p) => (p.nom || '').toLowerCase().includes(q.toLowerCase()));
    if (fit !== 'ALL')
      arr = arr.filter((p) =>
        (p.description || p.nom || p.fit || '').toLowerCase().includes(fit.toLowerCase())
      );
    if (color !== 'ALL')
      arr = arr.filter((p) =>
        (p.color || p.couleur || p.description || p.nom || '')
          .toLowerCase()
          .includes(color.toLowerCase())
      );
    if (size !== 'ALL')
      arr = arr.filter(
        (p) =>
          !p.taille ||
          (Array.isArray(p.taille)
            ? p.taille.includes(size)
            : String(p.taille).toUpperCase().includes(size))
      );
    if (sort === 'PRICE_LOW') arr = [...arr].sort((a, b) => Number(a.prix) - Number(b.prix));
    if (sort === 'PRICE_HIGH') arr = [...arr].sort((a, b) => Number(b.prix) - Number(a.prix));

    return arr;
  }, [d, q, fit, color, size, sort]);

  const title =
    category === 'Men'
      ? t.men
      : category === 'Women'
      ? t.women
      : category === 'New Arrivals'
      ? t.new
      : t.allProducts;

  const img = (p) =>
    p?.image?.startsWith('http')
      ? p.image
      : p?.image?.startsWith('/')
      ? p.image
      : 'http://localhost:8000' + (p?.image || '');

  return (
    <div className="pb-shop">
      <div className="pb-shop-bar">
        <div>
          <small>
            LEXIGAM / {language === 'ar' ? 'المتجر' : 'STORE'}
          </small>
          <h1>{title}</h1>
          <p>
            {data.length} {language === 'ar' ? 'قطعة في الأرشيف' : 'pieces available in archive'}
          </p>
        </div>
        <div className="pb-shop-controls">
          <button className="pb-filter-toggle" onClick={() => setDrawer(true)}>
            <SlidersHorizontal size={15} />{' '}
            {language === 'ar' ? 'تصفية وترتيب' : 'FILTERS & SORT'}
          </button>
          <div className="pb-sort-select">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="NEW">{language === 'ar' ? 'الأحدث' : 'NEWEST'}</option>
              <option value="PRICE_LOW">
                {language === 'ar' ? 'السعر: من الأقل للأعلى' : 'PRICE: LOW TO HIGH'}
              </option>
              <option value="PRICE_HIGH">
                {language === 'ar' ? 'السعر: من الأعلى للأقل' : 'PRICE: HIGH TO LOW'}
              </option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="pb-active-filters">
        <div className="pb-pill-group">
          {fits.map((f) => (
            <button
              key={f}
              className={fit === f ? 'active' : ''}
              onClick={() => setFit(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {drawer && (
        <aside className="pb-drawer-backdrop" onClick={() => setDrawer(false)}>
          <div className="pb-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="pb-drawer-head">
              <h3>{language === 'ar' ? 'التصفية' : 'FILTERS'}</h3>
              <button onClick={() => setDrawer(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="pb-drawer-body">
              <label>FIT</label>
              <div className="pb-drawer-chips">
                {fits.map((f) => (
                  <button
                    key={f}
                    className={fit === f ? 'active' : ''}
                    onClick={() => setFit(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <label>COLOR</label>
              <div className="pb-drawer-chips">
                {colors.map((c) => (
                  <button
                    key={c}
                    className={color === c ? 'active' : ''}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <label>SIZE</label>
              <div className="pb-drawer-chips">
                {sizes.map((s) => (
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
            <div className="pb-drawer-foot">
              <button
                className="pb-btn dark"
                onClick={() => {
                  setFit('ALL');
                  setColor('ALL');
                  setSize('ALL');
                }}
              >
                RESET
              </button>
              <button className="pb-btn" onClick={() => setDrawer(false)}>
                APPLY
              </button>
            </div>
          </div>
        </aside>
      )}

      {load ? (
        <div className="pb-loading-screen">
          <span>LOADING ARCHIVE</span>
        </div>
      ) : (
        <div className="pb-shop-grid">
          {data.map((p, i) => (
            <article className="pb-product-card" key={p.id}>
              <Link to={'/product/' + p.id} className="pb-product-img">
                <img src={img(p)} alt={p.nom} />
                <span className="pb-badge">{i < 3 ? 'NEW' : '026'}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart({ ...p, quantite: 1 }));
                  }}
                  title="Add to bag"
                >
                  <ArrowUpRight size={15} />
                </button>
              </Link>
              <div className="pb-product-meta">
                <div>
                  <strong>{p.nom}</strong>
                  <small>{p.description}</small>
                </div>
                <b>{p.prix} DH</b>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}