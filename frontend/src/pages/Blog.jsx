import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

const posts = [
  {
    id: 1,
    title: 'Runnin’ on coffee since 1462 — Le rituel urbain qui se porte',
    date: 'Novembre 2026',
    category: 'RITUELS URBAINS',
    image: '/molimao/coffee-editorial.jpg',
    excerpt:
      'Le café dans les grandes métropoles n’est pas qu’une boisson : c’est une institution, une pause nécessaire et un moment de partage. Découvrez les coulisses de notre nouvelle collection de hoodies et t-shirts.',
  },
  {
    id: 2,
    title: 'Urbex & Ville — Exploration visuelle des espaces bruts',
    date: 'Octobre 2026',
    category: 'CARNET VISUEL',
    image: '/molimao/slider-shibica.jpg',
    excerpt:
      'Une série photo au cœur des friches urbaines et des architectures oubliées pour capturer la texture, le béton et la force des coupes oversize LEXIGAM.',
  },
  {
    id: 3,
    title: 'L’Uniforme Quotidien — Pourquoi la simplicité exige de la rigueur',
    date: 'Septembre 2026',
    category: 'DESIGN & MATIÈRE',
    image: '/molimao/slider-1.jpg',
    excerpt:
      'Comment concevoir un t-shirt qui ne se déforme pas, garde son éclat et conserve sa structure après des dizaines de ports ? Décryptage de notre coton peigné 240g.',
  },
  {
    id: 4,
    title: 'Sérigraphies d’art — De l’atelier d’impression au cadre',
    date: 'Août 2026',
    category: 'ÉDITIONS D’ART',
    image: '/molimao/slider-3.jpg',
    excerpt:
      'Le processus artisanal derrière nos affiches d’art : choix du papier d’archive, mélanges d’encres mates et tirages manuels numérotés.',
  },
];

export default function Blog() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const arabicPosts = [
    { id: 1, title: 'طقوس المدينة: قهوة تُرتدى', date: 'نوفمبر 2026', category: 'طقوس حضرية', image: '/molimao/coffee-editorial.jpg', excerpt: 'القهوة في المدن الكبرى ليست مجرد مشروب، بل مساحة للتوقف واللقاء. اكتشفوا خلف كواليس مجموعتنا الجديدة من السترات والقمصان.' },
    { id: 2, title: 'استكشاف المدينة: جمال المساحات الخام', date: 'أكتوبر 2026', category: 'دفتر بصري', image: '/molimao/slider-shibica.jpg', excerpt: 'جولة فوتوغرافية وسط المباني المهجورة والعمارة المنسية لالتقاط ملمس المدينة والخرسانة وقصّات LEXIGAM الواسعة.' },
    { id: 3, title: 'الزي اليومي: البساطة تحتاج إلى دقة', date: 'سبتمبر 2026', category: 'التصميم والخامة', image: '/molimao/slider-1.jpg', excerpt: 'كيف نصنع قميصاً يحافظ على شكله ولونه بعد الاستخدام المتكرر؟ نظرة على القطن الممشط بوزن 240 غراماً.' },
    { id: 4, title: 'المطبوعات الفنية: من الاستوديو إلى الإطار', date: 'أغسطس 2026', category: 'إصدارات فنية', image: '/molimao/slider-3.jpg', excerpt: 'اكتشفوا مراحل صناعة ملصقاتنا الفنية: اختيار ورق الأرشيف، ومزج الأحبار غير اللامعة، والطباعة اليدوية المرقّمة.' }
  ];
  const displayPosts = isAr ? arabicPosts : posts;
  return (
    <>
      <SEO
        title={isAr ? 'مجلة LEXIGAM — قصص ودفاتر بصرية' : 'Le Journal — LEXIGAM / Histoires & Carnets Visuels'}
        description={isAr ? 'اكتشفوا القصص والإلهامات البصرية ودفاتر استوديو LEXIGAM.' : 'Plongez dans les récits, inspirations graphiques et carnets de bord du studio LEXIGAM.'}
      />
      <div className="mm-section" style={{ paddingTop: '50px' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="mm-eyebrow">{isAr ? 'قصص وتوثيق' : 'RÉCITS & DOCUMENTATION'}</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800, margin: '8px 0 16px', color: '#0f0f0f' }}>
            {isAr ? 'مجلة LEXIGAM' : 'Le Journal LEXIGAM'}
          </h1>
          <p style={{ maxWidth: '640px', fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
            {isAr ? 'مقالات ودفاتر بصرية وكواليس التصنيع وقراءات في فن الشارع وعالم الأقمشة.' : "Articles, carnets d'ambiance, coulisses de fabrication et regards croisés sur l'art urbain et le textile."}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {displayPosts.map((post) => (
            <article key={post.id} style={{ display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
              <div
                style={{
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  borderRadius: '3px',
                  background: '#f2f2f2',
                  marginBottom: '18px',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#EB5728', marginBottom: '8px', letterSpacing: '0.05em' }}>
                <span>{post.category}</span>
                <span style={{ color: '#888' }}>{post.date}</span>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.3, margin: '0 0 10px', color: '#0f0f0f' }}>
                {post.title}
              </h2>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', margin: '0 0 16px', flex: 1 }}>
                {post.excerpt}
              </p>

              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#0f0f0f',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  {isAr ? 'اقرأ المقال' : "LIRE L'ARTICLE"} <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
