import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';

const translations={
 fr:{
  home:'Accueil',shop:'Boutique',journal:'Journal',about:'À propos',contact:'Contact',bag:'Sac',search:'Recherche',account:'Compte',studio:'Studio',
  heroEyebrow:'AUTOMNE / HIVER 2026',heroTitle:'URBEX / CASABLANCA',heroText:'Des vêtements indépendants, des objets graphiques et des uniformes du quotidien, depuis Casablanca.',shopCollection:'VOIR LA COLLECTION',
  new:'NOUVEAUTÉS',newTitle:'Fraîchement sortis du studio.',allProducts:'TOUS LES PRODUITS',photobook:'PHOTOBOOK / 026',photobookTitle:'STREET / STUDY.',photobookText:'Un journal visuel de mouvement, béton, matière et ville après la tombée de la nuit.',readStory:'LIRE LE STORY',featured:'02 / SÉLECTION',featuredTitle:'La sélection LEXIGAM.',theHouse:'03 / LA MAISON',houseTitle:'Pensé pour le quotidien.',houseText:'LEXIGAM est un projet vestimentaire casablancais construit autour de proportions nettes, de matières fortes et de références graphiques.',aboutLink:'À PROPOS DE LEXIGAM',
  worlds:'04 / UNIVERS',worldsTitle:'Porte ta propre version.',men:'HOMME',women:'FEMME',objects:'OBJETS',service:'05 / SERVICE',serviceTitle:'Pensé autour de ta façon de shopper.',delivery:'LIVRAISON RAPIDE',payment:'PAIEMENT SÉCURISÉ',support:'SUPPORT DIRECT',newsletter:'06 / RESTONS PROCHES',newsletterTitle:'Nouveaux drops. Sans bruit.',email:'ADRESSE EMAIL',join:'REJOINDRE',
  journalTitle:'Des histoires autour des vêtements.',journalText:'Campagnes, carnets visuels, collaborations et références derrière chaque drop.',aboutTitle:'Made in Casablanca. Worn everywhere.',aboutText:'LEXIGAM est un projet indépendant autour du streetwear contemporain, des proportions propres et d’un graphisme brut.',contactTitle:'Parlons au studio.',contactText:'Une question sur une pièce, une taille, une commande ou une collaboration ? Écris-nous.',
  lang:'LANGUE',frLang:'FR',arLang:'AR',freeDelivery:'LIVRAISON OFFERTE DÈS 900 DH · MAROC / INTERNATIONAL'
 },
 ar:{
  home:'الرئيسية',shop:'المتجر',journal:'المجلة',about:'من نحن',contact:'تواصل',bag:'الحقيبة',search:'بحث',account:'الحساب',studio:'الاستوديو',
  heroEyebrow:'خريف / شتاء 2026',heroTitle:'أوربان / الدار البيضاء',heroText:'ملابس مستقلة، قطع بصرية وأزياء يومية من الدار البيضاء.',shopCollection:'اكتشف المجموعة',
  new:'الجديد',newTitle:'وصل حديثاً من الاستوديو.',allProducts:'كل المنتجات',photobook:'دفتر الصور / 026',photobookTitle:'دراسة الشارع.',photobookText:'يوميات بصرية للحركة، الإسمنت، الخامات والمدينة بعد حلول الليل.',readStory:'اقرأ القصة',featured:'02 / المختارات',featuredTitle:'اختيارات LEXIGAM.',theHouse:'03 / الدار',houseTitle:'مصمم للحياة اليومية.',houseText:'LEXIGAM مشروع أزياء من الدار البيضاء، يجمع بين القصّات النظيفة والخامات القوية والمراجع البصرية الجريئة.',aboutLink:'عن LEXIGAM',
  worlds:'04 / العوالم',worldsTitle:'ارتدِ نسختك الخاصة.',men:'رجال',women:'نساء',objects:'قطع',service:'05 / الخدمة',serviceTitle:'تجربة مبنية حول طريقتك في التسوق.',delivery:'توصيل سريع',payment:'دفع آمن',support:'دعم مباشر',newsletter:'06 / ابقَ قريباً',newsletterTitle:'إصدارات جديدة. بدون ضجيج.',email:'البريد الإلكتروني',join:'انضم',
  journalTitle:'قصص حول الملابس.',journalText:'حملات، يوميات بصرية، تعاونات والمراجع خلف كل إصدار.',aboutTitle:'صنع في الدار البيضاء. يُلبس في كل مكان.',aboutText:'LEXIGAM مشروع مستقل حول أزياء الشارع المعاصرة، القصّات النظيفة والهوية البصرية الجريئة.',contactTitle:'تواصل مع الاستوديو.',contactText:'لديك سؤال حول منتج أو مقاس أو طلب أو تعاون؟ راسلنا.',
  lang:'اللغة',frLang:'FR',arLang:'AR',freeDelivery:'توصيل مجاني للطلبات فوق 900 درهم · المغرب / دولياً'
 }
};

const LanguageContext=createContext(null);
export function LanguageProvider({children}){
 const [language,setLanguage]=useState(()=>localStorage.getItem('lexigam-language')||'fr');
 useEffect(()=>{localStorage.setItem('lexigam-language',language);document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr'},[language]);
 const value=useMemo(()=>({language,setLanguage,t:translations[language]}),[language]);
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const ctx=useContext(LanguageContext);if(!ctx)throw new Error('useLanguage must be used inside LanguageProvider');return ctx;}
