import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../shared/types';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      api.getProduct(id)
        .then(setProduct)
        .catch(() => setError(true)); 
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await api.deleteProduct(id);
        navigate('/products');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (error) {
    return (
      <div>
        <h3>El producto solicitado no existe.</h3>
        <button onClick={() => navigate('/products')}>Volver al listado</button>
      </div>
    );
  }

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '2rem', maxWidth: '600px' }}>
      <h2>{product.name}</h2>
      {product.image ? (
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <div style={{ width: '200px', height: '150px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Placeholder de Imagen
        </div>
      )}
      <p><strong>Precio:</strong> {product.price}€</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
      {product.isOnSale && <p style={{ color: 'green', fontWeight: 'bold' }}>Este artículo está rebajado.</p>}

      <hr />
      {!showConfirm ? (
        <button onClick={() => setShowConfirm(true)} style={{ backgroundColor: 'red', color: 'white' }}>
          Eliminar Producto
        </button>
      ) : (
        <div style={{ background: '#f8d7da', padding: '1rem', border: '1px solid #f5c6cb', marginTop: '1rem' }}>
          <p style={{ color: '#721c24' }}>¿Estás completamente seguro de borrar este producto?</p>
          <button onClick={handleDelete} style={{ marginRight: '1rem' }}>Sí, Eliminar</button>
          <button onClick={() => setShowConfirm(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};