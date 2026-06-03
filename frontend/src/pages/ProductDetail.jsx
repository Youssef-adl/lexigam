import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../axios';
import { Star, MessageCircle } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ note: 5, commentaire: '' });
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const [pRes, aRes] = await Promise.all([
                    api.get(`/produits/${id}`),
                    api.get(`/produits/${id}/avis`)
                ]);
                setProduct(pRes.data.data);
                setReviews(aRes.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/avis', {
                produit_id: id,
                ...newReview
            });
            setReviews([...reviews, { ...res.data.data, user: user }]);
            setNewReview({ note: 5, commentaire: '' });
            alert("Avis publié !");
        } catch (err) {
            alert(err.response?.data?.message || "Erreur");
        }
    };

    if (loading) return <div className="container mt-4"><h3>Chargement du produit...</h3></div>;
    if (!product) return <div className="container mt-4"><h3>Produit introuvable.</h3></div>;

    return (
        <div className="container mt-4">
            <div className="glass br-12" style={{padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
                <div>
                     <img src={product.image?.startsWith('http') ? product.image : `http://localhost:8000${product.image}`} 
                          style={{width: '100%', borderRadius: '12px', objectFit: 'cover'}} />
                </div>
                <div>
                    <h1 className="cart-header">{product.nom}</h1>
                    <p className="badge" style={{marginBottom: '20px'}}>{product.categorie?.nom}</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '20px'}}>
                        {product.prix} DH
                    </p>
                    <p style={{marginBottom: '30px', color: '#94a3b8'}}>{product.description}</p>
                    
                    {user?.role === 'client' && (
                        <button className="btn-primary" style={{width: '100%'}} onClick={() => alert("Ajouté au panier (utilisez la boutique pour l'instant)")}>
                            Ajouter au Panier
                        </button>
                    )}
                </div>
            </div>

            <div style={{marginTop: '50px', marginBottom: '100px'}}>
                <h2 style={{marginBottom: '30px'}}>Avis des clients</h2>
                
                {reviews.length === 0 ? (
                    <p style={{color: '#94a3b8'}}>Aucun avis pour le moment.</p>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        {reviews.map((r, i) => (
                            <div key={i} className="glass" style={{padding: '20px', borderRadius: '12px'}}>
                                <div className="flex-between" style={{marginBottom: '10px'}}>
                                    <div style={{fontWeight: 'bold'}}>{r.user?.name}</div>
                                    <div style={{color: '#f59e0b', display: 'flex', gap: '2px'}}>
                                        {[...Array(r.note)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                    </div>
                                </div>
                                <p style={{color: '#94a3b8'}}>{r.commentaire}</p>
                            </div>
                        ))}
                    </div>
                )}

                {user?.role === 'client' && (
                    <div className="glass" style={{padding: '30px', borderRadius: '12px', marginTop: '40px'}}>
                        <h4 style={{marginBottom: '20px'}}>Laisser un avis</h4>
                        <form onSubmit={handleSubmitReview}>
                            <div style={{marginBottom: '15px'}}>
                                <label style={{display: 'block', marginBottom: '5px'}}>Note</label>
                                <select 
                                    value={newReview.note} 
                                    onChange={(e) => setNewReview({...newReview, note: parseInt(e.target.value)})}
                                    style={{padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none'}}
                                >
                                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Etoiles</option>)}
                                </select>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <label style={{display: 'block', marginBottom: '5px'}}>Commentaire</label>
                                <textarea 
                                    value={newReview.commentaire}
                                    onChange={(e) => setNewReview({...newReview, commentaire: e.target.value})}
                                    placeholder="Partagez votre expérience..."
                                    style={{width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', minHeight: '100px'}}
                                />
                            </div>
                            <button type="submit" className="btn-primary">Publier l'avis</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
