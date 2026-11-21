import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Sparkles, Award } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="À propos — LEXIGAM / Vêtements Indépendants"
        description="LEXIGAM est un label vestimentaire indépendant associant street art, coupes nettes et minimalisme urbain."
      />
      <div className="mm-section" style={{ paddingTop: '50px' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="mm-eyebrow">LABEL INDÉPENDANT</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800, margin: '8px 0 16px', color: '#0f0f0f' }}>
            LEXIGAM — L'équilibre entre rue, design et matière
          </h1>
          <p style={{ maxWidth: '780px', fontSize: '15px', lineHeight: 1.8, color: '#555' }}>
            LEXIGAM est un label indépendant né de la passion pour le design graphique brut, l'architecture
            brutaliste et le streetwear fonctionnel. Nous concevons des uniformes contemporains pensés pour
            le mouvement quotidien, avec une exigence absolue portée sur la qualité du textile et la précision du tombé.
          </p>
        </div>

        <div className="mm-editorial-split" style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #eaeaea', marginBottom: '60px' }}>
          <div className="mm-editorial-media">
            <img src="/molimao/flagship-store.jpg" alt="Atelier et studio LEXIGAM" />
          </div>
          <div className="mm-editorial-copy" style={{ background: '#fdfdfd' }}>
            <span className="mm-eyebrow">STUDIO & FLAGSHIP STORE</span>
            <h2>Notre espace d'expérimentation</h2>
            <p>
              Notre studio et boutique à Casablanca réunit nos collections textiles, nos prototypes, nos séries
              limitées de tirages d'art et un espace d'échange avec notre communauté. Chaque pièce y est pensée
              avec soin, loin des cadences éphémères de la fast-fashion.
            </p>
            <div>
              <Link to="/contact" className="mm-outline-btn">
                VENIR AU STUDIO <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', margin: '40px 0' }}>
          <div style={{ padding: '32px', background: '#f8f8f8', borderRadius: '4px', border: '1px solid #eaeaea' }}>
            <Sparkles size={28} style={{ color: '#EB5728', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px', color: '#0f0f0f' }}>Matières sélectionnées</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666', margin: 0 }}>
              Cotons peignés lourds de 190g à 340g, mailles denses et finitions pré-lavées pour garantir une tenue
              impeccable et un toucher agréable lavage après lavage.
            </p>
          </div>
          <div style={{ padding: '32px', background: '#f8f8f8', borderRadius: '4px', border: '1px solid #eaeaea' }}>
            <Award size={28} style={{ color: '#EB5728', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px', color: '#0f0f0f' }}>Séries limitées</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666', margin: 0 }}>
              Nous produisons en petits volumes contrôlés pour préserver la singularité de chaque vêtement
              et encourager une consommation réfléchie et durable.
            </p>
          </div>
          <div style={{ padding: '32px', background: '#f8f8f8', borderRadius: '4px', border: '1px solid #eaeaea' }}>
            <MapPin size={28} style={{ color: '#EB5728', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px', color: '#0f0f0f' }}>Inspiration urbaine</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666', margin: 0 }}>
              Du béton au coucher de soleil sur l'océan, des enseignes vintage aux lignes épurées :
              la ville et son énergie constituent notre terrain d'expression favori.
            </p>
          </div>
        </div>

        <div className="mm-btn-center" style={{ marginTop: '50px' }}>
          <Link to="/shop" className="mm-primary-btn">
            VOIR TOUT LE VESTIAIRE <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
