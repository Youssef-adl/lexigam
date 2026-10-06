import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUp,ArrowUpRight,Music2,Mail,MapPin,Phone} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';

export default function Footer(){
 const {language}=useLanguage();
 const ar=language==='ar';
 const backTop=()=>window.scrollTo({top:0,behavior:'smooth'});
 return <footer className="pb-footer-retail">
   <div className="pb-footer-social">
    <a href="#" aria-label="Facebook">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <a href="#" aria-label="X">X</a>
    <a href="#" aria-label="Instagram">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    </a>
    <a href="#" aria-label="TikTok"><Music2 size={16}/></a>
   </div>

   <div className="pb-footer-retail-main">
    <div className="pb-footer-contact">
      <Link to="/" className="pb-footer-retail-logo">LEXIGAM<sup>®</sup></Link>
      <p>{ar?'أزياء مستقلة من الدار البيضاء.':'Independent clothing from Casablanca.'}</p>
      <div className="pb-footer-contact-lines">
       <span><MapPin size={13}/> CASABLANCA / MOROCCO</span>
       <a href="tel:+212500000000"><Phone size={13}/> +212 5 00 00 00 00</a>
       <a href="mailto:support@lexigam.com"><Mail size={13}/> support@lexigam.com</a>
      </div>
    </div>

    <nav className="pb-footer-retail-links" aria-label="Footer navigation">
      <div>
       <small>{ar?'المتجر':'SHOP'}</small>
       <Link to="/new-arrivals">{ar?'الجديد':'NEW IN'}</Link>
       <Link to="/men">{ar?'رجال':'MEN'}</Link>
       <Link to="/women">{ar?'نساء':'WOMEN'}</Link>
       <Link to="/shop">{ar?'كل المنتجات':'ALL PRODUCTS'}</Link>
      </div>
      <div>
       <small>{ar?'المعلومات':'INFO'}</small>
       <Link to="/about">{ar?'عنّا':'ABOUT'}</Link>
       <Link to="/blog">{ar?'المجلة':'JOURNAL'}</Link>
       <Link to="/contact">{ar?'تواصل':'CONTACT'}</Link>
       <Link to="/cart">{ar?'السلة':'BAG'}</Link>
      </div>
      <div>
       <small>{ar?'القانوني':'LEGAL'}</small>
       <Link to="/privacy">{ar?'الخصوصية':'PRIVACY'}</Link>
       <Link to="/terms">{ar?'الشروط':'TERMS'}</Link>
       <Link to="/returns">{ar?'الإرجاع':'RETURNS'}</Link>
      </div>
    </nav>

    <div className="pb-footer-payments">
      <small>{ar?'طرق الدفع':'PAYMENT METHODS'}</small>
      <div className="pb-payment-chips">
       <span>VISA</span>
       <span>MASTERCARD</span>
       <span>COD</span>
      </div>
      <p>{ar?'الدفع عند الاستلام متاح حالياً.':'Cash on delivery is currently available at checkout.'}</p>
    </div>
   </div>

   <div className="pb-footer-bottom-retail">
     <span>© 2026 LEXIGAM®</span>
     <span>CASABLANCA / MOROCCO</span>
     <span>FR / AR</span>
     <button type="button" className="pb-back-top" onClick={backTop} aria-label="Back to top"><ArrowUp size={14}/></button>
   </div>
 </footer>
}