import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, PlusCircle, Tag, LogOut, Search } from 'lucide-react';
import { logout } from '../store/authSlice';
import { clearCart } from '../store/cartSlice';
import api from '../axios';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');

  // Synchronisation du panier avec la BDD pour les clients
  useEffect(() => {
    const syncCart = async () => {
        if (user && user.role === 'client' && cartItems.length >= 0) {
            try {
                await api.post('/paniers/sync', {
                    items: cartItems.filter(i => i.produit).map(i => ({
                        produit_id: i.produit.id,
                        quantite: i.quantite,
                        prix: i.produit.prix || 0
                    }))
                });
            } catch (err) {
                console.error("Erreur sync panier:", err);
            }
        }
    };
    
    const timeoutId = setTimeout(syncCart, 1000); // Debounce
    return () => clearTimeout(timeoutId);
  }, [cartItems, user]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?nom=${search}`);
  };
  
  return (
    <nav className="navbar glass">
      <div className="container flex-between">
        <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
           <Link to="/" className="logo">LEXIGAM<span style={{color: "var(--accent-color)"}}>.</span></Link>
           
           {user && user.role === 'client' && location.pathname === '/shop' && (
              <form onSubmit={handleSearch} style={{position: 'relative'}}>
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: '8px 35px 8px 15px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    width: '200px',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                <Search size={16} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
              </form>
           )}
        </div>

        <div className="nav-links flex-between" style={{alignItems: 'center'}}>
          <Link to="/">Accueil</Link>
          <Link to="/shop">Boutique</Link>
          
          {user && (user.role === 'admin' || user.role === 'vendeur') && (
            <div style={{display: 'flex', gap: '15px'}}>
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard'} style={{color: 'var(--accent-color)'}}>Dashboard</Link>
              <Link to="/admin/add-product" style={{color: '#f59e0b'}}>+ Produit</Link>
              <Link to="/admin/add-category" style={{color: '#10b981'}}>+ Catégorie</Link>
            </div>
          )}

          {user && user.role === 'client' && (
             <Link to="/dashboard">Commandes</Link>
          )}

          {(!user || user.role === 'client') && location.pathname !== '/login' && (
            <Link to="/cart" style={{display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}>
              <ShoppingCart size={20} /> ({cartItems.length})
            </Link>
          )}
          
          {user ? (
            <button onClick={handleLogout} className="btn-primary" style={{marginLeft: '15px', padding: '5px 15px'}}>Logout</button>
          ) : (
            <Link to="/login" style={{display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}><User size={20} /> / Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
