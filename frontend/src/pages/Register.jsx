import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import api from '../axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client'
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        api.post('/register', formData)
            .then(response => {
                dispatch(login({ user: response.data.user, token: response.data.token }));
                const role = response.data.user.role;
                if (role === 'admin') navigate('/admin/dashboard');
                else if (role === 'vendeur') navigate('/vendor/dashboard');
                else navigate('/shop');
            })
            .catch(err => {
                console.error("Erreur d'inscription", err);
                setError("Erreur lors de l'inscription. Vérifiez vos informations.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass br-12" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                <h2 className="cart-header text-center" style={{fontSize: '2rem', marginBottom: '20px'}}>Inscription</h2>
                
                {error && <p style={{color: '#ef4444', textAlign: 'center', marginBottom: '15px'}}>{error}</p>}
                
                <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Nom complet" 
                        style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Mot de passe" 
                        style={{padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>
                        <p style={{width: '100%', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '5px'}}>Je veux m'inscrire en tant que :</p>
                        <label style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                            <input type="radio" name="role" value="client" checked={formData.role === 'client'} onChange={handleChange} />
                            <span>Client</span>
                        </label>
                        <label style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                            <input type="radio" name="role" value="vendeur" checked={formData.role === 'vendeur'} onChange={handleChange} />
                            <span>Vendeur</span>
                        </label>
                    </div>

                    <button type="submit" className="btn-primary" style={{marginTop: '10px'}} disabled={loading}>
                        {loading ? 'Création en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                <p style={{textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#94a3b8'}}>
                    Déjà un compte ? <Link to="/login" style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
