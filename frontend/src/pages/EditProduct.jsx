import React, { useState, useEffect } from 'react';
import api from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie_id: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get(`/produits/${id}`)
        ]);
        const allCats = catRes.data.data || catRes.data;
        const uniqueCats = allCats.filter((cat, index, self) => 
          index === self.findIndex((c) => c.nom === cat.nom)
        );
        setCategories(uniqueCats);
        const p = prodRes.data.data;
        setFormData({
          nom: p.nom,
          description: p.description,
          prix: p.prix,
          stock: p.stock,
          categorie_id: p.categorie_id
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_method', 'PUT'); // Trick for Laravel when sending files with PUT
    data.append('nom', formData.nom);
    data.append('description', formData.description);
    data.append('prix', formData.prix);
    data.append('stock', formData.stock);
    data.append('categorie_id', formData.categorie_id);
    if (imageFile) {
      data.append('image', imageFile);
    }

    api.post(`/produits/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setMessage({ type: 'success', text: 'Produit mis à jour !' });
        setTimeout(() => navigate('/vendor/dashboard'), 1500);
      })
      .catch(error => {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Erreur' });
      });
  };

  if (loading) return <div className="container mt-4"><h3>Chargement...</h3></div>;

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass br-12" style={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
        <h2 className="cart-header text-center">Modifier le Produit</h2>
        {message && <p style={{ color: message.type === 'success' ? '#22c55e' : '#ef4444', textAlign: 'center' }}>{message.text}</p>}
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="form-control-custom" />
          <textarea name="description" value={formData.description} onChange={handleChange} required className="form-control-custom" />
          <input type="number" name="prix" value={formData.prix} onChange={handleChange} required className="form-control-custom" />
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="form-control-custom" />
          <select name="categorie_id" value={formData.categorie_id} onChange={handleChange} required className="form-control-custom">
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
          </select>
          <input type="file" onChange={handleFileChange} className="form-control-custom" />
          <button type="submit" className="btn-primary">Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
