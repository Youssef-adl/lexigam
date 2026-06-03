import React, { useState, useEffect } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie_id: '' 
  });
  const [imageFile, setImageFile] = useState(null); // Changement pour gérer un fichier
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        const allCats = res.data.data || res.data;
        // Filter unique by name to avoid repetition
        const uniqueCats = allCats.filter((cat, index, self) => 
          index === self.findIndex((c) => c.nom === cat.nom)
        );
        setCategories(uniqueCats);
      })
      .catch(err => console.error("Erreur de récupération des catégories", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Utilisation de FormData pour envoyer un fichier
    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('description', formData.description);
    data.append('prix', formData.prix);
    data.append('stock', formData.stock);
    data.append('categorie_id', formData.categorie_id);
    if (imageFile) {
      data.append('image', imageFile);
    }

    api.post('/produits', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setMessage({ type: 'success', text: 'Produit ajouté avec succès !' });
        setTimeout(() => navigate('/shop'), 1500);
      })
      .catch(error => {
        console.error(error);
        const msg = error.response?.data?.message || 'Erreur lors de l\'ajout';
        setMessage({ type: 'error', text: msg });
      });
  };

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass br-12" style={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
        <h2 className="cart-header text-center" style={{fontSize: '2rem'}}>Ajouter un Produit</h2>
        
        {message && (
          <p style={{
            color: message.type === 'success' ? '#22c55e' : '#ef4444', 
            textAlign: 'center', marginBottom: '15px'
          }}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <input 
            type="text" name="nom" placeholder="Nom du produit" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            onChange={handleChange}
          />
          <textarea 
            name="description" placeholder="Description courte" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', minHeight: '80px'}}
            onChange={handleChange}
          />
          <input 
            type="number" name="prix" placeholder="Prix (ex: 5000)" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            onChange={handleChange}
          />
          <input 
            type="number" name="stock" placeholder="Stock disponible" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            onChange={handleChange}
          />
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <label style={{color: '#94a3b8', fontSize: '0.9rem'}}>Image du produit :</label>
            <input 
              type="file" name="image" accept="image/*"
              style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
              onChange={handleFileChange}
            />
          </div>

          <select 
            name="categorie_id" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: '#1e293b', color: 'white'}}
            onChange={handleChange}
            value={formData.categorie_id}
          >
            <option value="" disabled>Sélectionnez une catégorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))}
          </select>
          
          <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>
            Créer le produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
