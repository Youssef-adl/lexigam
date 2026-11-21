import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, UserRound, Heart, ChevronRight } from 'lucide-react';
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

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Close drawer on page navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
        LIVRAISON OFFERTE PAR COURSIER RAPIDE POUR TOUTE COMMANDE SUPÉRIEURE À 500 DH
      </div>

      {/* Main Sticky Navbar */}
      <header className="mm-navbar">
        <div className="mm-nav-left">
          <button
            type="button"
            className="mm-mobile-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu size={20} />
            <span className="hidden-mobile">MENU</span>
          </button>
          <nav className="mm-desktop-nav">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Boutique</Link>
            <Link to="/women" className={location.pathname === '/women' ? 'active' : ''}>Femmes</Link>
            <Link to="/men" className={location.pathname === '/men' ? 'active' : ''}>Hommes</Link>
            <Link to="/shop?category=Art">Éditions Art</Link>
            <Link to="/blog">Journal</Link>
            <Link to="/about">À propos</Link>
            <Link to="/contact">Contact</Link>
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
          <button
            type="button"
            className="mm-action-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher"
            title="Rechercher"
          >
            <Search size={19} />
          </button>

          <button
            type="button"
            className="mm-action-btn"
            onClick={() => navigate(user ? '/dashboard' : '/login')}
            aria-label="Compte"
            title={user ? user.nom || 'Mon compte' : 'Se connecter'}
          >
            <UserRound size={19} />
          </button>

          <button
            type="button"
            className="mm-action-btn hidden-mobile"
            aria-label="Favoris"
            title="Favoris"
          >
            <Heart size={19} />
          </button>

          <Link to="/cart" className="mm-action-btn mm-bag-btn" aria-label="Panier">
            <ShoppingBag size={19} />
            {totalCartCount > 0 && <span className="mm-bag-badge">{totalCartCount}</span>}
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="mm-studio-badge">
              STUDIO
            </Link>
          )}

          {user && (
            <button type="button" className="mm-logout-btn" onClick={logoutUser}>
              DÉCONNEXION
            </button>
          )}
        </div>
      </header>

      {/* Offcanvas Drawer Menu */}
      <div
        className={`mm-drawer-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside className={`mm-drawer ${open ? 'open' : ''}`} aria-label="Menu latéral">
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
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mm-drawer-nav">
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/shop" onClick={() => setOpen(false)}>
            Boutique <ChevronRight size={16} />
          </Link>
          <div className="mm-drawer-sub">
            <Link to="/women" onClick={() => setOpen(false)}>Femmes</Link>
            <Link to="/men" onClick={() => setOpen(false)}>Hommes</Link>
            <Link to="/shop?category=Art" onClick={() => setOpen(false)}>Éditions Art</Link>
            <Link to="/shop?category=Accessoires" onClick={() => setOpen(false)}>Accessoires</Link>
          </div>
          <Link to="/blog" onClick={() => setOpen(false)}>Journal</Link>
          <Link to="/about" onClick={() => setOpen(false)}>À propos</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>

        <div className="mm-drawer-footer">
          <span style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>LANGUE / LANGUAGE</span>
          <div className="mm-lang-chips">
            <button
              type="button"
              className={`mm-lang-chip ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              Français
            </button>
            <button
              type="button"
              className={`mm-lang-chip ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              العربية
            </button>
          </div>
          <div style={{ fontSize: '11px', color: '#777', lineHeight: 1.5 }}>
            <strong>Studio & Boutique LEXIGAM</strong><br />
            Casablanca / Maroc<br />
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
            aria-label="Fermer la recherche"
          >
            <X size={28} />
          </button>
          <form onSubmit={submit} className="mm-search-form">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une pièce..."
            />
            <button type="submit" aria-label="Lancer la recherche">
              <Search size={28} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
