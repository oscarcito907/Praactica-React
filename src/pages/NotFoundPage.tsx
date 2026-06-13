import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Error 404</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/products">Volver al inicio</Link>
    </div>
  );
};