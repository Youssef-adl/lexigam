import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowUp, MapPin, Phone, Mail, Music2 } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const backTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="mm-footer">
      <div className="mm-footer-main">
        {/* Colonne 1: Identité LEXIGAM */}
        <div className="mm-footer-brand-col">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#0f0f0f',
              textTransform: 'uppercase'
            }}>
              LEXIGAM
            </span>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#EB5728',
              display: 'inline-block',
              marginBottom: '7px'
            }} />
          </Link>
          <p className="mm-footer-slogan">
            {isAr ? 'LEXIGAM علامة أزياء مستقلة تقوم على قصّات واضحة وخامات متينة وهوية مستوحاة من فن الشارع. صُممت للحركة.' : 'LEXIGAM est un label vestimentaire indépendant fondé sur des coupes nettes, des matières lourdes et une esthétique street art contemporaine. Conçu pour le mouvement.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="mm-footer-contact-item">
              <MapPin size={15} style={{ color: '#EB5728' }} /> {isAr ? 'شارع أنفا، الدار البيضاء، المغرب' : 'Boulevard d’Anfa, Casablanca, Maroc'}
            </span>
            <a href="tel:+212522000000" className="mm-footer-contact-item">
              <Phone size={15} style={{ color: '#EB5728' }} /> +212 5 22 00 00 00
            </a>
            <a href="mailto:support@lexigam.com" className="mm-footer-contact-item">
              <Mail size={15} style={{ color: '#EB5728' }} /> support@lexigam.com
            </a>
          </div>
          <div className="mm-footer-socials">
            <a href="#" className="mm-social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="mm-social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="mm-social-link" aria-label="TikTok">
              <Music2 size={16} />
            </a>
          </div>
        </div>

        {/* Colonne 2: BOUTIQUE */}
        <div className="mm-footer-col">
          <h4>{isAr ? 'المتجر' : 'BOUTIQUE'}</h4>
          <ul>
            <li><Link to="/women">{isAr ? 'مجموعة النساء' : 'Vestiaire Femmes'}</Link></li>
            <li><Link to="/men">{isAr ? 'مجموعة الرجال' : 'Vestiaire Hommes'}</Link></li>
            <li><Link to="/shop?category=Art">{isAr ? 'إصدارات فنية وطباعة حريرية' : 'Éditions Art & Sérigraphies'}</Link></li>
            <li><Link to="/shop?category=Accessoires">{isAr ? 'إكسسوارات وقطع مختارة' : 'Accessoires & Objets'}</Link></li>
            <li><Link to="/shop">{isAr ? 'جميع المنتجات' : 'Tous les produits'}</Link></li>
          </ul>
        </div>

        {/* Colonne 3: INFORMATIONS */}
        <div className="mm-footer-col">
          <h4>{isAr ? 'معلومات' : 'INFORMATIONS'}</h4>
          <ul>
            <li><Link to="/about">{isAr ? 'عن LEXIGAM' : 'À propos de LEXIGAM'}</Link></li>
            <li><Link to="/blog">{isAr ? 'مجلة الاستوديو' : 'Le Journal du Studio'}</Link></li>
            <li><Link to="/contact">{isAr ? 'اتصل بنا' : 'Nous contacter'}</Link></li>
            <li><Link to="/terms">{isAr ? 'الشروط والأحكام' : 'Conditions Générales'}</Link></li>
            <li><Link to="/returns">{isAr ? 'التوصيل والإرجاع' : 'Livraison & Retours'}</Link></li>
            <li><Link to="/privacy">{isAr ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}</Link></li>
          </ul>
        </div>

        {/* Colonne 4: PAIEMENT & SÉCURITÉ */}
        <div className="mm-footer-col">
          <h4>{isAr ? 'الدفع والأمان' : 'PAIEMENT & SÉCURITÉ'}</h4>
          <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.6, margin: '0 0 12px' }}>
            {isAr ? 'دفع إلكتروني آمن بالبطاقة البنكية باستخدام 3D Secure وتشفير SSL. كما نقبل الدفع عند الاستلام.' : 'Paiement en ligne sécurisé par carte bancaire avec technologie 3D Secure et cryptage SSL. Paiement à la livraison également accepté.'}
          </p>
          <div className="mm-payment-logos">
            <img src="/molimao/payweb.png" alt="Passerelle sécurisée" loading="lazy" />
            <img src="/molimao/monri-cards.jpg" alt="Cartes bancaires acceptées" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mm-footer-bottom">
        <span>© 2026 LEXIGAM SARL. {isAr ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</span>
        <span>{isAr ? 'الدار البيضاء / المغرب' : 'Casablanca / Maroc'}</span>
        <button
          type="button"
          className="mm-back-top-btn"
          onClick={backTop}
          aria-label={isAr ? 'العودة إلى الأعلى' : 'Retour en haut'}
          title={isAr ? 'العودة إلى الأعلى' : 'Retour en haut'}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
