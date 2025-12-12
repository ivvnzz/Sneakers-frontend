import React, { useEffect, useState } from 'react';
import BrandsService from '../../services/BrandsService.jsx';
import MaterialsService from '../../services/MaterialsService.jsx';
import ColorsService from '../../services/ColorsService.jsx';
import GendersService from '../../services/GendersService.jsx';
import SizesService from '../../services/SizesService.jsx';
import OriginsService from '../../services/OriginsService.jsx';

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
      let list = [];
      if (path.includes('brands')) list = await BrandsService.getAll();
      else if (path.includes('materials')) list = await MaterialsService.getAll();
      else if (path.includes('colors')) list = await ColorsService.getAll();
      else if (path.includes('genders')) list = await GendersService.getAll();
      else if (path.includes('sizes')) list = await SizesService.getAll();
      else if (path.includes('origins')) list = await OriginsService.getAll();
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
    try {
      if (path.includes('brands')) await BrandsService.create(payload);
      else if (path.includes('materials')) await MaterialsService.create(payload);
      else if (path.includes('colors')) await ColorsService.create(payload);
      else if (path.includes('genders')) await GendersService.create(payload);
      else if (path.includes('sizes')) await SizesService.create(payload);
      else if (path.includes('origins')) await OriginsService.create(payload);
      setName(''); setDescription('');
      load();
    } catch (err) {
      console.error(err);
      alert('Error al crear');
    }
  }

  async function removeItem(id) {
    if (!confirm('Eliminar?')) return;
    try {
      if (path.includes('brands')) await BrandsService.remove(id);
      else if (path.includes('materials')) await MaterialsService.remove(id);
      else if (path.includes('colors')) await ColorsService.remove(id);
      else if (path.includes('genders')) await GendersService.remove(id);
      else if (path.includes('sizes')) await SizesService.remove(id);
      else if (path.includes('origins')) await OriginsService.remove(id);
      load();
    } catch (err) {
      console.error(err);
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
