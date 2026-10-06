import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Plus } from 'lucide-react';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';
import useEditorialMotion from '../hooks/useEditorialMotion';

const editorial = [
  {
    image: '/webpImage/image-27.png',
    tag: 'PHOTOBOOK',
    title: 'URBEX / 026',
    text: 'A visual study of streets, concrete and everyday movement.',
  },
  {
    image: '/webpImage/image-28.jpg',
    tag: 'THE STUDIO',
    title: 'MADE IN CASABLANCA',
    text: 'The places and textures behind the collection.',
  },
  {
    image: '/webpImage/image-26.jpg',
    tag: 'FIELD NOTES',
    title: 'NIGHT / FORM / MATERIAL',
    text: 'Fragments from the world around LEXIGAM.',
  },
];

const fallback = [
  { id: 'demo1', nom: 'NOCTURNE OVERSHIRT', prix: 890, image: '/webpImage/image-1.jpg' },
  { id: 'demo2', nom: 'ARCHIVE TROUSER', prix: 690, image: '/webpImage/image-2.jpg' },
  { id: 'demo3', nom: 'AFTER DARK JACKET', prix: 1190, image: '/webpImage/image-3.jpg' },
  { id: 'demo4', nom: 'DAILY UNIFORM TEE', prix: 390, image: '/webpImage/image-5.jpg' },
  { id: 'demo5', nom: 'DISTRICT OVERSHIRT', prix: 690, image: '/webpImage/image-6.jpg' },
  { id: 'demo6', nom: 'HEAVYWEIGHT HOODIE', prix: 590, image: '/webpImage/image-7.jpg' },
  { id: 'demo7', nom: 'WIDE CARGO TROUSER', prix: 640, image: '/webpImage/image-8.jpg' },
  { id: 'demo8', nom: 'CORE TEE / 02', prix: 290, image: '/webpImage/image-11.jpg' },
];

function Card({ p, i }) {
  return (
    <Link className="pb-product-card" data-motion="reveal" to={'/product/' + p.id}>
      <div className="pb-product-img">
        <img
          src={
            p.image?.startsWith('http')
              ? p.image
              : p.image?.startsWith('/')
              ? p.image
              : '/webpImage/image-20.jpg'
          }
          alt={p.nom}
        />
        {i < 4 && <span className="pb-badge">NEW</span>}
        <button onClick={(e) => e.preventDefault()} aria-label="Wishlist">
          <Plus size={15} />
        </button>
      </div>
      <div className="pb-product-meta">
        <div>
          <strong>{p.nom}</strong>
          <small>{i % 3 === 0 ? 'Relaxed fit' : 'Regular fit'}</small>
        </div>
        <b>{p.prix} DH</b>
      </div>
    </Link>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  useEditorialMotion();
  const [products, setProducts] = useState(fallback);

  useEffect(() => {
    api
      .get('/produits')
      .then((r) => {
        const x = r.data?.data || r.data || [];
        if (Array.isArray(x) && x.length) setProducts(x.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pb-home">
      <section className="pb-hero pb-hero-editorial">
        <div className="pb-hero-image">
          <img src="/webpImage/image-10.jpg" alt="LEXIGAM campaign" />
          <div />
        </div>
        <div className="pb-hero-copy">
          <small>LEXIGAM / AUTUMN WINTER 2026</small>
          <h1>
            Wear<br />
            <i>the</i> everyday.
          </h1>
          <p>{t.heroText}</p>
          <Link to="/shop" className="pb-btn">
            SHOP THE COLLECTION <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="pb-hero-count">01 / 03</div>
      </section>

      <section className="pb-campaign-wall" data-motion="reveal">
        <div className="pb-wall-title">
          <small>01 / CAMPAIGN BOARD</small>
          <h2>
            FIELD NOTES<br />
            <i>CASABLANCA / 026</i>
          </h2>
          <p>Visual fragments from the city, the collection and the studio.</p>
        </div>
        <div className="pb-wall-grid">
          <figure className="w-main">
            <img src="/webpImage/image-10.jpg" alt="LEXIGAM field campaign" />
            <figcaption>
              <span>01 / FIELD</span>
              <strong>CASABLANCA</strong>
            </figcaption>
          </figure>
          <figure className="w-tall">
            <img src="/webpImage/image-19.jpg" alt="LEXIGAM campaign detail" />
            <figcaption>
              <span>02 / STUDY</span>
              <strong>NIGHT / FORM</strong>
            </figcaption>
          </figure>
          <figure>
            <img src="/webpImage/image-20.jpg" alt="LEXIGAM archive" />
            <figcaption>
              <span>03 / ARCHIVE</span>
              <strong>TEXTURE</strong>
            </figcaption>
          </figure>
          <figure>
            <img src="/webpImage/image-21.jpg" alt="LEXIGAM texture" />
            <figcaption>
              <span>04 / MATERIAL</span>
              <strong>DENIM / PAPER</strong>
            </figcaption>
          </figure>
          <figure className="w-wide">
            <img src="/webpImage/image-26.jpg" alt="LEXIGAM street scene" />
            <figcaption>
              <span>05 / STREET</span>
              <strong>AFTER DARK</strong>
            </figcaption>
          </figure>
          <figure>
            <img src="/webpImage/image-27.png" alt="LEXIGAM photobook" />
            <figcaption>
              <span>06 / PHOTOBOOK</span>
              <strong>URBEX 026</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="pb-quick-shop" data-motion="reveal">
        <div className="pb-section-title">
          <div>
            <small>01 / NEW</small>
            <h2>{t.newTitle}</h2>
          </div>
          <Link to="/new-arrivals">
            {t.allProducts}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="pb-grid-4">
          {products.slice(0, 4).map((p, i) => (
            <Card p={p} i={i} key={p.id} />
          ))}
        </div>
      </section>

      <section className="pb-editorial-feature" data-motion="reveal">
        <img src="/webpImage/image-27.png" alt="LEXIGAM PhotoBook" />
        <div className="pb-editorial-copy">
          <small>02 / PHOTOBOOK</small>
          <h2>
            Urbex<br />
            <i>026.</i>
          </h2>
          <p>{t.photobookText}</p>
          <Link to="/blog" className="pb-text-link">
            {t.readStory}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="pb-section pb-featured" data-motion="reveal">
        <div className="pb-section-title">
          <div>
            <small>03 / FEATURED</small>
            <h2>{t.featuredTitle}</h2>
          </div>
          <Link to="/shop">
            {t.allProducts}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="pb-grid-4">
          {products.slice(0, 8).map((p, i) => (
            <Card p={p} i={i} key={p.id} />
          ))}
        </div>
      </section>

      <section className="pb-triptych" data-motion="reveal">
        {editorial.map((item, i) => (
          <Link to="/blog" key={item.tag} className="pb-triptych-card">
            <img src={item.image} alt={item.title} />
            <div>
              <small>
                0{i + 1} / {item.tag}
              </small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span>
                READ STORY <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="pb-store-story" data-motion="reveal">
        <div>
          <small>05 / FLAGSHIP</small>
          <h2>
            Made in<br />
            <i>Casablanca.</i>
          </h2>
          <p>
            From first sketch to final garment, LEXIGAM is built around everyday silhouettes and visual references from the city.
          </p>
          <Link to="/about" className="pb-btn dark">
            {t.aboutLink}
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <img src="/webpImage/image-28.jpg" alt="LEXIGAM flagship" />
      </section>

      <section className="pb-service" data-motion="reveal">
        <div className="pb-section-title">
          <div>
            <small>06 / SERVICE</small>
            <h2>
              Everything you need.<br />
              Nothing extra.
            </h2>
          </div>
        </div>
        <div className="pb-service-grid">
          <article>
            <b>01</b>
            <h3>FAST DELIVERY</h3>
            <p>Prepared quickly with clear delivery information at checkout.</p>
          </article>
          <article>
            <b>02</b>
            <h3>SECURE PAYMENT</h3>
            <p>Simple checkout with secure payment options available for your order.</p>
          </article>
          <article>
            <b>03</b>
            <h3>DIRECT SUPPORT</h3>
            <p>Questions about sizing, stock or orders? Talk directly to LEXIGAM.</p>
          </article>
        </div>
      </section>

      <section className="pb-art-prints" data-motion="reveal">
        <div>
          <small>07 / ART & OBJECTS</small>
          <h2>
            Wear it.<br />
            <i>Frame it.</i>
          </h2>
          <p>Discover visual pieces, accessories and objects that extend the world of the collection.</p>
          <Link to="/shop" className="pb-text-link">
            EXPLORE OBJECTS <ArrowUpRight size={15} />
          </Link>
        </div>
        <img src="/webpImage/image-26.jpg" alt="LEXIGAM objects" />
      </section>

      <section className="pb-newsletter" data-motion="reveal">
        <div>
          <small>08 / NEWSLETTER</small>
          <h2>{t.newsletterTitle}</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>{t.email}</label>
          <div>
            <input
              type="email"
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'votre@email.com'}
            />
            <button>
              {t.join}
              <ArrowUpRight size={15} />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={15} />;
}