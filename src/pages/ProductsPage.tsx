import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../shared/types';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchName, setSearchName] = useState('');
  
  const [saleFilter, setSaleFilter] = useState('todos'); 

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesSale =
      saleFilter === 'todos' ||
      (saleFilter === 'venta' && product.isOnSale) ||
      (saleFilter === 'compra' && !product.isOnSale);
    return matchesName && matchesSale;
  });

  return (
    <div>
      <h2>Filtros</h2>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', background: '#f9f9f9', padding: '1rem' }}>
        <label>
          Buscar por nombre:
          <input type="text" value={searchName} onChange={e => setSearchName(e.target.value)} />
        </label>

        <label>
          Tipo de oferta:
          <select value={saleFilter} onChange={e => setSaleFilter(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="venta">Venta (En Oferta)</option>
            <option value="compra">Compra (Precio Normal)</option>
          </select>
        </label>
      </div>

      <h2>Listado de Productos</h2>
      {filteredProducts.length === 0 ? (
        <p>No hay productos que cumplan los criterios. <Link to="/products/new">¡Crea uno nuevo!</Link></p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredProducts.map(product => (
            <li key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
              <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
              <p>Precio: {product.price}€</p>
              <p>Etiquetas: {product.tags.join(', ')}</p>
              {product.isOnSale && <strong style={{ color: 'green' }}>🔥 ¡OFERTA!</strong>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};