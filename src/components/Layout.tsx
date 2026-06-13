import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { authStorage } from '../shared/authStorage';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    authStorage.removeToken();
    setShowConfirm(false);
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavLink to="/products" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Productos
        </NavLink>
        <NavLink to="/products/new" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Nuevo Producto
        </NavLink>
        <button onClick={() => setShowConfirm(true)} style={{ marginLeft: 'auto' }}>
          Cerrar Sesión
        </button>
      </nav>

      {showConfirm && (
        <div style={{ background: '#fff3cd', padding: '1rem', border: '1px solid #ffeeba', margin: '1rem' }}>
          <p>¿Seguro que quieres salir de la aplicación?</p>
          <button onClick={handleLogout}>Sí, salir</button>
          <button onClick={() => setShowConfirm(false)}>Cancelar</button>
        </div>
      )}

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};