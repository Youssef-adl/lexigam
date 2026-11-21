import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { login } from '../store/authSlice';
import api from '../axios';
import { useLanguage } from '../i18n/LanguageContext';

export default function Login() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      dispatch(login({ user: response.data.user, token: response.data.token }));

      const role = response.data.user.role;
      navigate(
        location.state?.from ||
        (role === 'admin' ? '/admin/dashboard' : role === 'vendeur' ? '/vendor/dashboard' : '/shop')
      );
    } catch (err) {
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Email or password is incorrect.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-auth">
      <div className="pb-auth-art">
        <img src="/molimao/slider-shibica.jpg" alt="LEXIGAM campaign" />
        <div>
          <small>LEXIGAM / MEMBERS</small>
          <h1>YOUR<br /><i>ARCHIVE.</i></h1>
        </div>
      </div>

      <form className="pb-auth-form" onSubmit={submit}>
        <Link to="/shop" className="pb-back"><ArrowLeft size={14} /> {isAr ? 'العودة إلى المتجر' : 'BACK TO SHOP'}</Link>
        <small>{isAr ? 'تسجيل الدخول' : 'SIGN IN'}</small>
        <h2>{isAr ? 'مرحباً بعودتك.' : 'Welcome back.'}</h2>

        {error && <p className="pb-error" role="alert">{error}</p>}

        <label>
          {isAr ? 'البريد الإلكتروني' : 'EMAIL'}
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
        </label>
        <label>
          {isAr ? 'كلمة المرور' : 'PASSWORD'}
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
        </label>

        <button className="pb-btn" disabled={loading}>
          {loading ? (isAr ? 'جارٍ الدخول...' : 'SIGNING IN') : (isAr ? 'دخول' : 'SIGN IN')} <ArrowUpRight size={15} />
        </button>
        <p>{isAr ? 'مستخدم جديد؟' : 'New here?'} <Link to="/register">{isAr ? 'أنشئ حساباً.' : 'Create an account.'}</Link></p>
      </form>
    </div>
  );
}
