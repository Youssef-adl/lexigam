import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, UserRound, Heart, ChevronRight, LogOut } from 'lucide-react';
import { logout } from '../store/authSlice';
import { clearCart } from '../store/cartSlice';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const cartItems = useSelector((s) => s.cart.items);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const isAr = language === 'ar';
  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Close drawer on page navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Sync cart for clients
  useEffect(() => {
    if (!user || user.role !== 'client') return;
    const id = setTimeout(
      () =>
        api
          .post('/paniers/sync', {
            items: cartItems
              .filter((i) => i.produit?.id)
              .map((i) => ({ produit_id: i.produit.id, quantite: i.quantite })),
          })
          .catch(() => {}),
      700
    );
    return () => clearTimeout(id);
  }, [cartItems, user]);

  // Auth expired listener
  useEffect(() => {
    const onExpired = () => {
      dispatch(logout());
      dispatch(clearCart());
      navigate('/login?expired=1');
    };
    window.addEventListener('lexigam:auth-expired', onExpired);
    return () => window.removeEventListener('lexigam:auth-expired', onExpired);
  }, [dispatch, navigate]);

  const submit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/shop?nom=' + encodeURIComponent(search.trim()));
      setSearchOpen(false);
    }
  };

  const logoutUser = async () => {
    setOpen(false);
    try {
      await api.post('/logout');
    } catch {}
    finally {
      dispatch(logout());
      dispatch(clearCart());
      navigate('/');
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantite || 1), 0);

  return (
    <div className="mm-nav-shell">
      {/* Announcement Bar */}
      <div className="mm-announcement">
{isAr ? 'توصيل مجاني عبر خدمة سريعة لجميع الطلبات التي تتجاوز 500 درهم' : 'LIVRAISON OFFERTE PAR COURSIER RAPIDE POUR TOUTE COMMANDE SUPÉRIEURE À 500 DH'}
      </div>

      {/* Main Sticky Navbar */}
      <header className="mm-navbar">
        <div className="mm-nav-left">
          <button
            type="button"
            className="mm-mobile-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={isAr ? 'فتح القائمة' : 'Open menu'}
            aria-expanded={open}
            aria-controls="lexigam-mobile-drawer"
          >
            <Menu size={20} />
            <span className="hidden-mobile">{isAr ? 'القائمة' : 'MENU'}</span>
          </button>
          <nav className="mm-desktop-nav">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>{isAr ? 'الرئيسية' : 'Accueil'}</Link>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>{isAr ? 'المتجر' : 'Boutique'}</Link>
            <Link to="/women" className={location.pathname === '/women' ? 'active' : ''}>{isAr ? 'نساء' : 'Femmes'}</Link>
            <Link to="/men" className={location.pathname === '/men' ? 'active' : ''}>{isAr ? 'رجال' : 'Hommes'}</Link>
            <Link to="/shop?category=Art">{isAr ? 'إصدارات فنية' : 'Éditions Art'}</Link>
            <Link to="/blog">{isAr ? 'المجلة' : 'Journal'}</Link>
            <Link to="/about">{isAr ? 'من نحن' : 'À propos'}</Link>
            <Link to="/contact">{isAr ? 'اتصل بنا' : 'Contact'}</Link>
          </nav>
        </div>

        {/* Brand Center Logo */}
        <div className="mm-brand-link">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '24px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#0f0f0f',
              textTransform: 'uppercase'
            }}>
              LEXIGAM
            </span>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#EB5728',
              display: 'inline-block',
              marginBottom: '9px'
            }} />
          </Link>
        </div>

        {/* Actions Right */}
        <div className="mm-nav-actions">
          <button type="button" className="mm-language-switch" onClick={() => setLanguage(isAr ? 'fr' : 'ar')} aria-label={isAr ? 'Passer en français' : 'التبديل إلى العربية'}>{isAr ? 'FR' : 'العربية'}</button>
          <button
            type="button"
            className="mm-action-btn"
            onClick={() => setSearchOpen(true)}
            aria-label={isAr ? 'بحث' : 'Rechercher'}
            title={isAr ? 'بحث' : 'Rechercher'}
          >
            <Search size={19} />
          </button>

          <button
            type="button"
            className="mm-action-btn"
            onClick={() => navigate(user ? '/dashboard' : '/login')}
            aria-label={isAr ? 'الحساب' : 'Compte'}
            title={user ? user.nom || (isAr ? 'حسابي' : 'Mon compte') : (isAr ? 'تسجيل الدخول' : 'Se connecter')}
          >
            <UserRound size={19} />
          </button>

          <button
            type="button"
            className="mm-action-btn hidden-mobile"
            aria-label={isAr ? 'المفضلة' : 'Favoris'}
            title={isAr ? 'المفضلة' : 'Favoris'}
          >
            <Heart size={19} />
          </button>

          <Link to="/cart" className="mm-action-btn mm-bag-btn" aria-label={isAr ? 'سلة التسوق' : 'Panier'} title={isAr ? 'سلة التسوق' : 'Panier'}>
            <ShoppingBag size={19} />
            {totalCartCount > 0 && <span className="mm-bag-badge">{totalCartCount}</span>}
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="mm-studio-badge">
              {isAr ? 'الاستوديو' : 'STUDIO'}
            </Link>
          )}


        </div>
      </header>

      {/* Offcanvas Drawer Menu */}
      <div
        className={`mm-drawer-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside id="lexigam-mobile-drawer" className={`mm-drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label={isAr ? 'القائمة الجانبية' : 'Menu latéral'}>
        <div className="mm-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#0f0f0f', letterSpacing: '-0.04em' }}>
              LEXIGAM
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EB5728', display: 'inline-block', marginBottom: '8px' }} />
          </div>
          <button
            type="button"
            className="mm-drawer-close"
            onClick={() => setOpen(false)}
            aria-label={isAr ? 'إغلاق القائمة' : 'Fermer le menu'}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mm-drawer-nav">
          <Link to="/" onClick={() => setOpen(false)}>{isAr ? 'الرئيسية' : 'Accueil'}</Link>
          <Link to="/shop" onClick={() => setOpen(false)}>
            {isAr ? 'المتجر' : 'Boutique'} <ChevronRight size={16} />
          </Link>
          <div className="mm-drawer-sub">
            <Link to="/women" onClick={() => setOpen(false)}>{isAr ? 'نساء' : 'Femmes'}</Link>
            <Link to="/men" onClick={() => setOpen(false)}>{isAr ? 'رجال' : 'Hommes'}</Link>
            <Link to="/shop?category=Art" onClick={() => setOpen(false)}>{isAr ? 'إصدارات فنية' : 'Éditions Art'}</Link>
            <Link to="/shop?category=Accessoires" onClick={() => setOpen(false)}>{isAr ? 'إكسسوارات' : 'Accessoires'}</Link>
          </div>
          <Link to="/blog" onClick={() => setOpen(false)}>{isAr ? 'المجلة' : 'Journal'}</Link>
          <Link to="/about" onClick={() => setOpen(false)}>{isAr ? 'من نحن' : 'À propos'}</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>{isAr ? 'اتصل بنا' : 'Contact'}</Link>
        </nav>

        <div className="mm-drawer-footer">
          <span style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>{isAr ? 'اللغة' : 'LANGUE / LANGUAGE'}</span>
          <div className="mm-lang-chips">
            <button
              type="button"
              className={`mm-lang-chip ${language === 'fr' ? 'active' : ''}`}
              onClick={() => selectLanguage('fr')}
            >
              Français
            </button>
            <button
              type="button"
              className={`mm-lang-chip ${language === 'ar' ? 'active' : ''}`}
              onClick={() => selectLanguage('ar')}
            >
              العربية
            </button>
          </div>
          {user && (
            <div className="mm-drawer-account">
              <Link to="/dashboard" className="mm-drawer-account-link" onClick={() => setOpen(false)}>
                <UserRound size={17} />
                <span>{isAr ? 'حسابي' : 'Mon compte'}</span>
              </Link>
              <div className="mm-drawer-account-meta">
                <strong>{user.nom || user.name || (isAr ? 'حساب LEXIGAM' : 'Compte LEXIGAM')}</strong>
                {user.email && <span>{user.email}</span>}
              </div>
              <button type="button" className="mm-drawer-logout" onClick={logoutUser}>
                <LogOut size={16} />
                <span>{isAr ? 'تسجيل الخروج' : 'Se déconnecter'}</span>
              </button>
            </div>
          )}
          <div className="mm-drawer-location" style={{ fontSize: '11px', color: '#777', lineHeight: 1.7 }}>
            <strong>{isAr ? 'استوديو ومتجر LEXIGAM' : 'Studio & Boutique LEXIGAM'}</strong><br />
            {isAr ? 'الدار البيضاء / المغرب' : 'Casablanca / Maroc'}<br />
            support@lexigam.com
          </div>
        </div>
      </aside>

      {/* Fullscreen Search Overlay */}
      {searchOpen && (
        <div className="mm-search-overlay">
          <button
            type="button"
            className="mm-search-close-btn"
            onClick={() => setSearchOpen(false)}
            aria-label={isAr ? 'إغلاق البحث' : 'Fermer la recherche'}
          >
            <X size={28} />
          </button>
          <form onSubmit={submit} className="mm-search-form">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث عن قطعة...' : 'Rechercher une pièce...'}
            />
            <button type="submit" aria-label={isAr ? 'بدء البحث' : 'Lancer la recherche'}>
              <Search size={28} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
