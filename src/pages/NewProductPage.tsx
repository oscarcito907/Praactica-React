import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  
  const [image, setImage] = useState('');

  const availableTags = ["motor", "work", "lifestyle", "mobile", "motorcycle"];

  const handleTagChange = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const isFormValid = name.trim() !== '' && price !== '' && description.trim() !== '' && tags.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const newProd = await api.createProduct({
        name,
        price: Number(price),
        description,
        isOnSale,
        tags,
        image: image.trim() !== '' ? image : undefined
      });
      
      navigate(`/products/${newProd.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <label>
          Nombre del Producto *:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>

        <label>
          Precio (€) *:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>

        <label>
          Descripción *:
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>

        <label>
          <input type="checkbox" checked={isOnSale} onChange={e => setIsOnSale(e.target.checked)} />
          Es una Oferta (Venta)
        </label>

        <label>
          URL de la Imagen / Foto (Opcional):
          <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="http://ejemplo.com/foto.jpg" />
        </label>

        <div>
          <p style={{ margin: '0 0 0.5rem 0' }}>Selecciona Tags (Mínimo 1) *:</p>
          {availableTags.map(tag => (
            <label key={tag} style={{ marginRight: '1rem' }}>
              <input type="checkbox" checked={tags.includes(tag)} onChange={() => handleTagChange(tag)} />
              {tag}
            </label>
          ))}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Guardar Producto
        </button>
      </form>
    </div>
  );
};