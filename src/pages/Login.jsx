import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.login({ username, password });
      if (res && res.token) {
        navigate('/admin/status');
      } else {
        setError('Login fallido');
      }
    } catch (err) {
      setError('Error en login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-5">
      <h2>Login</h2>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
    </div>
  );
}

export default Login;
