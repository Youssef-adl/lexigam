import React from 'react';
import {Link,useParams} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';

const copy={
 privacy:{fr:{title:'Politique de confidentialité',intro:'Cette page décrit de façon simple les données utilisées par LEXIGAM pour gérer les comptes, commandes, livraisons et demandes de support.',blocks:[['Données collectées','Nom, email, adresse de livraison, ville, téléphone, historique de commandes et informations nécessaires au fonctionnement du compte.'],['Utilisation','Les données servent à authentifier le compte, préparer les commandes, assurer la livraison, gérer les retours et répondre aux demandes.'],['Conservation','Les données sont conservées uniquement pendant la durée nécessaire aux obligations opérationnelles et légales applicables.'],['Vos droits','Pour demander l’accès, la correction ou la suppression de données, contactez support@lexigam.com.']]},ar:{title:'سياسة الخصوصية',intro:'توضح هذه الصفحة بشكل مبسط البيانات التي تستخدمها LEXIGAM لإدارة الحسابات والطلبات والتوصيل والدعم.',blocks:[['البيانات','الاسم والبريد الإلكتروني وعنوان التوصيل والمدينة والهاتف وسجل الطلبات والبيانات اللازمة للحساب.'],['الاستخدام','تستخدم البيانات للمصادقة وإعداد الطلبات والتوصيل وإدارة الإرجاع والرد على الطلبات.'],['الاحتفاظ','يتم الاحتفاظ بالبيانات فقط للمدة اللازمة للتشغيل والالتزامات القانونية.'],['الحقوق','للوصول إلى البيانات أو تصحيحها أو حذفها تواصل مع support@lexigam.com.']]}},
 terms:{fr:{title:'Conditions de vente',intro:'Les présentes conditions encadrent l’achat de produits LEXIGAM via le site.',blocks:[['Commandes','Une commande est enregistrée après validation du panier et des informations de livraison.'],['Prix','Les prix affichés sont en MAD et le montant final est confirmé au checkout.'],['Paiement','Le checkout actuel supporte le paiement à la livraison. Les moyens non activés ne sont pas proposés comme paiements réels.'],['Livraison','Les délais et zones dépendent de la disponibilité du service de livraison au moment de la commande.']]},ar:{title:'شروط البيع',intro:'تنظم هذه الشروط شراء منتجات LEXIGAM عبر الموقع.',blocks:[['الطلبات','يتم تسجيل الطلب بعد تأكيد السلة ومعلومات التوصيل.'],['الأسعار','الأسعار المعروضة بالدرهم المغربي ويتم تأكيد المبلغ النهائي عند الدفع.'],['الدفع','الدفع الحالي متاح عند التوصيل فقط. وسائل الدفع غير المفعلة لا تعتبر وسائل دفع حقيقية.'],['التوصيل','المدة والمناطق تعتمد على توفر خدمة التوصيل وقت الطلب.']]}},
 returns:{fr:{title:'Retours & remboursements',intro:'Les demandes de retour sont contrôlées par l’équipe avant validation.',blocks:[['Éligibilité','La quantité retournée ne peut pas dépasser la quantité achetée pour la ligne concernée.'],['Demande','Une demande peut être créée depuis l’espace client avec une raison détaillée.'],['Validation','Une demande déjà traitée ne peut pas être réutilisée ni validée une deuxième fois.'],['Support','Pour une situation particulière, contactez support@lexigam.com avec votre numéro de commande.']]},ar:{title:'الإرجاع والاسترداد',intro:'تتم مراجعة طلبات الإرجاع من طرف فريق LEXIGAM قبل قبولها.',blocks:[['الأهلية','لا يمكن أن تتجاوز الكمية المراد إرجاعها الكمية التي تم شراؤها في الطلب.'],['الطلب','يمكن إنشاء طلب إرجاع من حساب العميل مع ذكر السبب.'],['المراجعة','لا يمكن معالجة طلب سبق قبوله أو رفضه مرة أخرى.'],['الدعم','للحالات الخاصة تواصل مع support@lexigam.com مع رقم الطلب.']]}}
};

export default function LegalPage(){
 const {type='privacy'}=useParams();
 const {language}=useLanguage();
 const data=(copy[type]||copy.privacy)[language] || (copy[type]||copy.privacy).fr;
 return <div className="ma-page ma-legal">
  <Link to="/" className="pb-back"><ArrowLeft size={14}/> {language==='ar'?'الرئيسية':'ACCUEIL'}</Link>
  <div className="ma-page-head"><small>LEXIGAM / {type.toUpperCase()}</small><h1>{data.title}</h1><p>{data.intro}</p></div>
  <div className="ma-legal-grid">{data.blocks.map(([title,text])=><article key={title}><small>{title}</small><p>{text}</p></article>)}</div>
 </div>;
}
