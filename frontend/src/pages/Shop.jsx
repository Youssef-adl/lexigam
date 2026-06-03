import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import api from '../axios'; // Import de notre axios très simple
import { addToCart } from '../store/cartSlice';

const Shop = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Code simple de Axios pour bien comprendre
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nomQuery = searchParams.get('nom');

  useEffect(() => {
    setLoading(true);
    const url = nomQuery ? `/produits?nom=${nomQuery}` : '/produits';
    api.get(url)
      .then(response => {
        setProduits(response.data.data || response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits:", error);
        setLoading(false);
      });
  }, [nomQuery]);

  const user = useSelector((state) => state.auth.user);
  
  if (loading) return <div className="container text-center mt-4"><h3>Chargement des laptops...</h3></div>;

  const canAddToCart = !user || user.role === 'client';

  return (
    <div className="container mt-4">
      <h1 className="cart-header text-center" style={{marginBottom: '2rem'}}>Nos Laptops Premium</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {produits.map(produit => (
          <div key={produit.id} className="glass br-12" style={{ padding: '20px', transition: 'all 0.3s ease' }}>
            <Link to={`/product/${produit.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              {produit.image && (
                <img 
                  src={produit.image.startsWith('http') ? produit.image : `http://localhost:8000${produit.image}`} 
                  alt={produit.nom} 
                  style={{width: '100%', height: '220px', borderRadius: '8px', objectFit: 'cover', marginBottom: '10px'}} 
                />
              )}
              <h3 style={{marginTop: '5px'}}>{produit.nom}</h3>
            </Link>
            <p style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px'}}>{produit.description}</p>
            <div className="flex-between">
              <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)'}}>
                {produit.prix} DH
              </span>
              {canAddToCart && (
                <button 
                  className="btn-primary"
                  onClick={() => dispatch(addToCart(produit))} // Redux: Action très simple
                >
                  Ajouter
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
