import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* SECTION 1: HERO POSTER */}
      <section className="container" style={{ 
        paddingTop: '60px', 
        paddingBottom: '60px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '850px'
      }}>
        {/* Massive overlapping vintage headers */}
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <span style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '4.5rem', 
            fontWeight: '300', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.95)',
            display: 'block',
            lineHeight: '1'
          }}>
            Lexigam
          </span>
          <span style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '9rem', 
            fontWeight: '400', 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase',
            color: '#ffffff',
            display: 'block',
            lineHeight: '0.8',
            marginTop: '-10px'
          }}>
            PRO MAX
          </span>
        </div>

        {/* Elegant divider */}
        <div style={{ 
          width: '100%', 
          height: '1px', 
          backgroundColor: 'rgba(255,255,255,0.25)', 
          margin: '25px 0' 
        }} />

        {/* Detailed justified description block */}
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.25rem', 
          lineHeight: '1.7', 
          color: '#e2efe9', 
          textAlign: 'justify', 
          textJustify: 'inter-word',
          textTransform: 'none',
          maxWidth: '700px',
          marginBottom: '40px',
          fontWeight: '300'
        }}>
          Le Lexigam Pro Max a été conçu comme la quintessence absolue de l'ingénierie moderne et du raffinement technologique, créé en réponse aux besoins les plus extrêmes des professionnels et des gamers d'élite. Il intègre des innovations de rupture : processeurs de dernière génération, architecture graphique surpuissante et un système thermique perfectionné sous châssis d'aluminium mat. Aujourd'hui, le Pro Max est considéré comme le dernier Laptop d'exception, façonné pour durer, sans aucun compromis.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/shop">
            <button className="btn-primary btn-solid" style={{ padding: '14px 40px' }}>
              Découvrir la Boutique
            </button>
          </Link>
        </div>
      </section>

      {/* SECTION 2: THE PRODUCT PORTRAIT (FRAMED IMAGE) */}
      <section className="container" style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '80px',
        padding: '0 20px'
      }}>
        <div style={{
          border: '1px solid var(--border-color)',
          padding: '15px',
          background: 'rgba(2, 15, 10, 0.4)',
          borderRadius: '4px',
          maxWidth: '900px',
          width: '100%',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          position: 'relative'
        }}>
          {/* Decorative vintage corners */}
          <div style={{ position: 'absolute', top: '5px', left: '5px', width: '10px', height: '10px', borderTop: '1px solid var(--accent-color)', borderLeft: '1px solid var(--accent-color)' }} />
          <div style={{ position: 'absolute', top: '5px', right: '5px', width: '10px', height: '10px', borderTop: '1px solid var(--accent-color)', borderRight: '1px solid var(--accent-color)' }} />
          <div style={{ position: 'absolute', bottom: '5px', left: '5px', width: '10px', height: '10px', borderBottom: '1px solid var(--accent-color)', borderLeft: '1px solid var(--accent-color)' }} />
          <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '10px', height: '10px', borderBottom: '1px solid var(--accent-color)', borderRight: '1px solid var(--accent-color)' }} />
          
          <img 
            src="/laptop_hero.png" 
            alt="Lexigam Laptop Elite" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxHeight: '500px', 
              objectFit: 'cover', 
              borderRadius: '2px',
              display: 'block'
            }} 
          />
        </div>
      </section>

      {/* SECTION 3: ENGINEERING DETAILS GRID */}
      <section className="container" style={{ width: '100%', marginBottom: '100px' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '2.5rem', 
          fontWeight: '300', 
          textAlign: 'center', 
          marginBottom: '60px',
          letterSpacing: '0.05em'
        }}>
          L'INGÉNIERIE SANS COMPROMIS
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '30px' 
        }}>
          {/* Spec 1 */}
          <div style={{ 
            borderLeft: '1px solid var(--accent-color)', 
            paddingLeft: '20px', 
            paddingTop: '10px',
            paddingBottom: '10px' 
          }}>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.2rem', 
              color: 'var(--accent-color)', 
              display: 'block',
              lineHeight: '1',
              marginBottom: '15px'
            }}>
              01
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Architecture Graphique
            </h3>
            <p style={{ color: '#a9cbb7', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Processeur graphique NVIDIA GeForce RTX pour un rendu photoréaliste et une latence ultra-faible.
            </p>
          </div>

          {/* Spec 2 */}
          <div style={{ 
            borderLeft: '1px solid var(--accent-color)', 
            paddingLeft: '20px', 
            paddingTop: '10px',
            paddingBottom: '10px' 
          }}>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.2rem', 
              color: 'var(--accent-color)', 
              display: 'block',
              lineHeight: '1',
              marginBottom: '15px'
            }}>
              02
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Processeurs d'Élite
            </h3>
            <p style={{ color: '#a9cbb7', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Puces Intel Core i9 et AMD Ryzen 9 de dernière génération pour piloter vos tâches de compilation et de gaming.
            </p>
          </div>

          {/* Spec 3 */}
          <div style={{ 
            borderLeft: '1px solid var(--accent-color)', 
            paddingLeft: '20px', 
            paddingTop: '10px',
            paddingBottom: '10px' 
          }}>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.2rem', 
              color: 'var(--accent-color)', 
              display: 'block',
              lineHeight: '1',
              marginBottom: '15px'
            }}>
              03
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Thermique Avancée
            </h3>
            <p style={{ color: '#a9cbb7', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Chambre à vapeur en cuivre et double ventilateur à pales optimisées pour dissiper la chaleur en silence absolu.
            </p>
          </div>

          {/* Spec 4 */}
          <div style={{ 
            borderLeft: '1px solid var(--accent-color)', 
            paddingLeft: '20px', 
            paddingTop: '10px',
            paddingBottom: '10px' 
          }}>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.2rem', 
              color: 'var(--accent-color)', 
              display: 'block',
              lineHeight: '1',
              marginBottom: '15px'
            }}>
              04
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Écran de Référence
            </h3>
            <p style={{ color: '#a9cbb7', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Dalle Liquid Retina HDR 120Hz calibrée individuellement en usine pour des couleurs d'une fidélité inégalée.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
