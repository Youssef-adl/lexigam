import React from 'react';

const Footer = () => {
  return (
    <footer className="glass" style={{marginTop: '120px', borderTop: '1px solid var(--border-color)', padding: '60px 0 30px 0'}}>
      <div className="container">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px'}}>
          <div>
            <h3 className="logo" style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', letterSpacing: '0.1em'}}>LEXIGAM<span style={{color: "var(--accent-color)"}}>.</span></h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6'}}>L'excellence du laptop reconditionné et neuf. Qualité Premium, Service Pro Max.</p>
          </div>
          <div>
            <h4 style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#ffffff'}}>Navigation</h4>
            <ul style={{listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li><a href="/" style={{color: 'inherit', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e)=>e.target.style.color='var(--accent-color)'} onMouseOut={(e)=>e.target.style.color='inherit'}>Accueil</a></li>
              <li><a href="/shop" style={{color: 'inherit', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e)=>e.target.style.color='var(--accent-color)'} onMouseOut={(e)=>e.target.style.color='inherit'}>Boutique</a></li>
              <li><a href="/cart" style={{color: 'inherit', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e)=>e.target.style.color='var(--accent-color)'} onMouseOut={(e)=>e.target.style.color='inherit'}>Mon Panier</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#ffffff'}}>Légal</h4>
            <ul style={{listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li>CGV</li>
              <li>Politique de retour</li>
              <li>Mentions légales</li>
            </ul>
          </div>
          <div>
            <h4 style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#ffffff'}}>Newsletter</h4>
            <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px'}}>Restez informé de nos arrivages.</p>
            <div style={{display: 'flex', gap: '10px'}}>
               <input 
                    type="email" 
                    placeholder="Votre email" 
                    style={{
                        padding: '10px 14px',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-muted)',
                        color: 'white',
                        fontSize: '0.85rem',
                        flex: 1,
                        outline: 'none',
                        transition: 'border-color 0.3s'
                    }}
                    onFocus={(e)=>e.target.style.borderColor='var(--accent-color)'}
                    onBlur={(e)=>e.target.style.borderColor='var(--border-muted)'}
               />
               <button className="btn-primary btn-solid" style={{padding: '10px 20px', fontSize: '0.8rem'}}>Ok</button>
            </div>
          </div>
          <div>
            <h4 style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#ffffff'}}>Contact</h4>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px'}}>support@lexigam.com</p>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>+212 600 000 000</p>
          </div>
        </div>
        <div style={{textAlign: 'center', borderTop: '1px solid var(--border-muted)', paddingTop: '25px', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', letterSpacing: '0.05em'}}>
          © 2026 Lexigam. Tous droits réservés. L'excellence sans compromis.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
