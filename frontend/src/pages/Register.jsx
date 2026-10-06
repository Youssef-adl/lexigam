import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import api from '../axios';
import { ArrowUpRight } from 'lucide-react';

export default function Register() {
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'client' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ch = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.post('/register', f)
      .then((r) => {
        dispatch(login({ user: r.data.user, token: r.data.token }));
        navigate(
          r.data.user.role === 'admin'
            ? '/admin/dashboard'
            : r.data.user.role === 'vendeur'
            ? '/vendor/dashboard'
            : '/shop'
        );
      })
      .catch(() => setError('Could not create your account.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-page">
      <div className="auth-copy">
        <span className="eyebrow">LEXIGAM / MEMBERS</span>
        <h1>
          Make it<br />
          <em>yours.</em>
        </h1>
        <p>Create an account and keep your pieces in one place.</p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        <span className="eyebrow">CREATE ACCOUNT</span>
        <h2>Join the archive.</h2>
        {error && <p className="auth-error">{error}</p>}
        <input name="name" placeholder="FULL NAME" value={f.name} onChange={ch} required />
        <input name="email" type="email" placeholder="EMAIL ADDRESS" value={f.email} onChange={ch} required />
        <input name="password" type="password" placeholder="PASSWORD" value={f.password} onChange={ch} required />
        <button className="fashion-cta" disabled={loading}>
          {loading ? 'CREATING' : 'CREATE ACCOUNT'} <ArrowUpRight />
        </button>
        <p>
          Already a member? <Link to="/login">Sign in.</Link>
        </p>
      </form>
    </div>
  );
}