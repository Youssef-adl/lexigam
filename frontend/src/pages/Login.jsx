import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { login } from '../store/authSlice';
import api from '../axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  const handleLogin = (e) => {
    e.preventDefault();
    api.post('/login', { email, password })
      .then(response => {
        // Supposons que Laravel retourne { token: '...', user: {...} }
        dispatch(login({ user: response.data.user, token: response.data.token }));
        const role = response.data.user.role;
        
        if (from) {
            navigate(from);
        } else if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'vendeur') navigate('/vendor/dashboard');
        else navigate('/shop');
      })
      .catch(err => {
        console.error("Erreur de connexion", err);
        setError("Email ou mot de passe incorrect");
      });
  };

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass br-12" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
        <h2 className="cart-header text-center" style={{fontSize: '2rem'}}>Connexion</h2>
        
        {error && <p style={{color: '#ef4444', textAlign: 'center'}}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px'}}>
          <input 
            type="email" 
            placeholder="Email" 
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>
            Se connecter
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#94a3b8'}}>
            Pas encore de compte ? <Link to="/register" style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>Créez-en un ici</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
