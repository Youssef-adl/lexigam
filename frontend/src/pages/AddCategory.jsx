import React, { useState } from 'react';
import api from '../axios';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    statut: 1
  });
  const [imageFile, setImageFile] = useState(null); // Changement pour gérer un fichier
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Récupère le premier fichier sélectionné
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Utilisation de FormData pour envoyer un fichier
    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('description', formData.description);
    data.append('statut', formData.statut);
    if (imageFile) {
      data.append('image', imageFile);
    }

    api.post('/categories', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setMessage({ type: 'success', text: 'Catégorie ajoutée avec succès !' });
        setFormData({ nom: '', description: '', statut: 1 });
        setImageFile(null); // Reset
      })
      .catch(error => {
        console.error(error);
        const msg = error.response?.data?.message || 'Erreur lors de la création de la catégorie. Assurez-vous d\'être admin.';
        setMessage({ type: 'error', text: msg });
      });
  };

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass br-12" style={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
        <h2 className="cart-header text-center" style={{fontSize: '2rem'}}>Ajouter Catégorie</h2>
        
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
            type="text" name="nom" placeholder="Nom de la catégorie" required
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
            onChange={handleChange}
            value={formData.nom}
          />
          <textarea 
            name="description" placeholder="Description courte (optionnel)"
            style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', minHeight: '80px'}}
            onChange={handleChange}
            value={formData.description}
          />
          
          {/* Nouveau champ input type="file" au lieu du texte URL */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <label style={{color: '#94a3b8', fontSize: '0.9rem'}}>Image de la catégorie :</label>
            <input 
              type="file" name="image" accept="image/*"
              style={{padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'}}
              onChange={handleFileChange}
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>
            Créer la catégorie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
