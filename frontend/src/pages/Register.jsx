import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import api from '../axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/register', form);
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate('/shop');
    } catch (err) {
      const validationMessage = Object.values(err.response?.data?.errors || {})?.[0]?.[0];
      setError(
        validationMessage ||
        err.response?.data?.message ||
        'Could not create your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-auth">
      <div className="pb-auth-art">
        <img src="/molimao/slider-1.jpg" alt="LEXIGAM campaign" />
        <div>
          <small>LEXIGAM / MEMBERS</small>
          <h1>MAKE IT<br /><i>YOURS.</i></h1>
        </div>
      </div>

      <form className="pb-auth-form" onSubmit={submit}>
        <Link to="/shop" className="pb-back"><ArrowLeft size={14} /> BACK TO SHOP</Link>
        <small>CREATE ACCOUNT</small>
        <h2>Join the archive.</h2>

        {error && <p className="pb-error" role="alert">{error}</p>}

        <label>
          FULL NAME
          <input name="name" value={form.name} onChange={change} required autoComplete="name" />
        </label>
        <label>
          EMAIL
          <input name="email" type="email" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>
          PASSWORD
          <input name="password" type="password" value={form.password} onChange={change} minLength={8} required autoComplete="new-password" />
        </label>
        <label>
          CONFIRM PASSWORD
          <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={change} minLength={8} required autoComplete="new-password" />
        </label>

        <button className="pb-btn" disabled={loading}>
          {loading ? 'CREATING' : 'CREATE ACCOUNT'} <ArrowUpRight size={15} />
        </button>
        <p>Already a member? <Link to="/login">Sign in.</Link></p>
      </form>
    </div>
  );
}
