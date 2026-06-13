import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { authStorage } from '../shared/authStorage';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.login({ email, password });
      authStorage.setToken(data.accessToken, remember);
      navigate('/products');
    } catch (err: any) {
      setError('Credenciales incorrectas o error en el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Usuario / Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <label>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          Recordar contraseña
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};