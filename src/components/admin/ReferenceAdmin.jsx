import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function ReferenceAdmin({ path, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.request ? await api.request(path) : null;
      // fallback: try dedicated endpoints
      let list = data;
      if (!list) {
        // remove leading slash
        const p = path.startsWith('/') ? path : `/${path}`;
        const res = await api.request ? await api.request(p) : null;
        list = res;
      }
      // if still empty, try specific getters
      if (!list) {
        if (path.includes('brands')) list = await api.getBrands();
        else if (path.includes('materials')) list = await api.getMaterials();
        else if (path.includes('colors')) list = await api.getColors();
        else if (path.includes('genders')) list = await api.getGenders();
        else if (path.includes('sizes')) list = await api.getSizes();
        else if (path.includes('origins')) list = await api.getOrigins();
      }
      setItems(list || []);
    } catch (err) {
      console.error(err);
      setError('Error cargando');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [path]);

  async function createItem(e) {
    e.preventDefault();
    const payload = { name, description };
    const res = await api.createReference(path, payload);
    if (res) {
      setName(''); setDescription('');
      load();
    } else {
      alert('Error al crear');
    }
  }

  async function removeItem(id) {
    if (!confirm('Eliminar?')) return;
    const p = `${path}/${id}`;
    const res = await api.deleteReference(p);
    if (res === null) {
      // success (204)
      load();
    } else if (res) {
      load();
    } else {
      alert('Error al eliminar');
    }
  }

  return (
    <div className="container my-4">
      <h3>{title}</h3>
      <div className="mb-3">
        <form onSubmit={createItem} className="row g-2 align-items-end">
          <div className="col-auto">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-auto">
            <label className="form-label">Descripción</label>
            <input className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary">Crear</button>
          </div>
        </form>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {items.map((it) => (
          <div key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{it.name}</strong>
              <div className="small">{it.description}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-danger" onClick={() => removeItem(it.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {items.length === 0 && !loading && <p>No hay elementos.</p>}
      </div>
    </div>
  );
}

export default ReferenceAdmin;
