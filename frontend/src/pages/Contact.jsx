import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title={isAr ? 'تواصل مع LEXIGAM — الدار البيضاء' : 'Contact & Studio — LEXIGAM / Casablanca'}
        description={isAr ? 'تواصلوا مع استوديو LEXIGAM أو زوروا متجرنا في الدار البيضاء.' : 'Contactez le studio LEXIGAM ou rendez-nous visite dans notre espace boutique à Casablanca.'}
      />
      <div className="mm-section" style={{ paddingTop: '50px' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="mm-eyebrow">{isAr ? 'تواصل معنا' : 'NOUS CONTACTER'}</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800, margin: '8px 0 16px', color: '#0f0f0f' }}>
            {isAr ? 'لديكم سؤال حول قطعة أو طلبية؟' : 'Une question sur une pièce ou une commande ?'}
          </h1>
          <p style={{ maxWidth: '640px', fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
            {isAr ? 'تحتاجون إلى مساعدة في اختيار المقاس أو تتبّع شحنة أو معرفة المزيد عن إصداراتنا المحدودة؟ فريقنا يجيب خلال 24 ساعة.' : "Vous souhaitez un conseil sur le choix d'une taille, un suivi de colis ou une information sur nos séries limitées ? Notre équipe vous répond sous 24 heures."}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
          {/* Info Side */}
          <div>
            <div style={{ background: '#f8f8f8', padding: '36px', borderRadius: '4px', border: '1px solid #eaeaea', marginBottom: '24px' }}>
              <span className="mm-eyebrow">{isAr ? 'الاستوديو والمتجر الرئيسي' : 'STUDIO & FLAGSHIP'}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '10px 0 20px', color: '#0f0f0f' }}>
                Casablanca / Maroc
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#444' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={18} style={{ color: '#EB5728' }} />
                  <span>Boulevard d’Anfa, Casablanca, Maroc</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={18} style={{ color: '#EB5728' }} />
                  <span>+212 5 22 00 00 00</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} style={{ color: '#EB5728' }} />
                  <span>support@lexigam.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={18} style={{ color: '#EB5728' }} />
                  <span>{isAr ? 'من الاثنين إلى السبت: 10:00 — 19:30 (مغلق يوم الأحد)' : 'Du Lundi au Samedi : 10h00 — 19h30 (Fermé le dimanche)'}</span>
                </div>
              </div>
            </div>

            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid #eaeaea' }}>
              <img
                src="/molimao/flagship-store.jpg"
                alt="Entrée de l'espace LEXIGAM"
                style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Form Side */}
          <div style={{ background: '#ffffff', padding: '36px', borderRadius: '4px', border: '1px solid #eaeaea' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 20px', color: '#0f0f0f' }}>
              {isAr ? 'أرسلوا لنا رسالة' : 'Envoyez-nous un message'}
            </h3>

            {submitted ? (
              <div style={{ padding: '30px 20px', textAlign: 'center', background: '#f4fbf7', border: '1px solid #b7ebd0', borderRadius: '4px' }}>
                <CheckCircle2 size={40} style={{ color: '#03b361', margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 8px', fontSize: '18px', color: '#111' }}>{isAr ? 'تم استلام رسالتكم!' : 'Message bien reçu !'}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
                  {isAr ? 'شكراً لتواصلكم معنا. سنعود إليكم في أقرب وقت.' : 'Merci de nous avoir contactés. Nous reviendrons vers vous dans les plus brefs délais.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: '#444', marginBottom: '8px' }}>
                    {isAr ? 'الاسم الكامل' : 'NOM & PRÉNOM'}
                  </label>
                  <input
                    required
                    placeholder={isAr ? 'اكتبوا الاسم الكامل' : 'Votre nom complet'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '13px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: '#444', marginBottom: '8px' }}>
                    {isAr ? 'البريد الإلكتروني' : 'ADRESSE EMAIL'}
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="votre.email@exemple.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '13px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: '#444', marginBottom: '8px' }}>
                    {isAr ? 'الرسالة' : 'MESSAGE'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={isAr ? 'اكتبوا تفاصيل طلبكم أو سؤالكم...' : 'Détaillez votre demande ou question...'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="mm-primary-btn" style={{ alignSelf: 'flex-start' }}>
                  {isAr ? 'إرسال الرسالة' : 'ENVOYER LE MESSAGE'} <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
