import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const total = items.reduce((acc, curr) => acc + (curr.produit.prix * curr.quantite), 0);

    if (items.length === 0) {
        return (
            <div className="container mt-4 text-center">
                <ShoppingBag size={64} style={{marginBottom: '20px', opacity: 0.5}} />
                <h2>Votre panier est vide</h2>
                <Link to="/shop" className="btn-primary" style={{marginTop: '20px'}}>Aller à la boutique</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="cart-header">Mon Panier</h1>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                {items.map((item) => (
                    <div key={item.produit.id} className="glass br-12" style={{padding: '20px', display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <img 
                            src={item.produit.image?.startsWith('http') ? item.produit.image : `http://localhost:8000${item.produit.image}`} 
                            style={{width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover'}} 
                        />
                        <div style={{flex: 1}}>
                            <h3>{item.produit.nom}</h3>
                            <p style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>{item.produit.prix} DH</p>
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <button className="btn-primary" style={{padding: '5px 12px'}} 
                                    onClick={() => dispatch(updateQuantity({id: item.produit.id, quantite: Math.max(1, item.quantite - 1)}))}>-</button>
                            <span style={{fontSize: '1.2rem', minWidth: '30px', textAlign: 'center'}}>{item.quantite}</span>
                            <button className="btn-primary" style={{padding: '5px 12px'}}
                                    onClick={() => dispatch(updateQuantity({id: item.produit.id, quantite: item.quantite + 1}))}>+</button>
                        </div>

                        <div style={{minWidth: '120px', textAlign: 'right'}}>
                            <div style={{fontWeight: 'bold'}}>{item.produit.prix * item.quantite} DH</div>
                        </div>

                        <button className="btn-primary" style={{backgroundColor: '#ef4444', padding: '10px'}} 
                                onClick={() => dispatch(removeFromCart(item.produit.id))}>
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass br-12 mt-4" style={{padding: '30px', textAlign: 'right'}}>
                <div style={{fontSize: '1.5rem', marginBottom: '20px'}}>
                    Total: <span style={{fontWeight: 'bold', color: 'var(--accent-color)'}}>{total} DH</span>
                </div>
                <Link to="/checkout" className="btn-primary" style={{padding: '15px 40px', fontSize: '1.1rem'}}>
                    Passer à la commande
                </Link>
            </div>
        </div>
    );
};

export default Cart;
