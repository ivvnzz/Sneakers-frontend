import React, { useEffect, useState } from 'react';
import ProductsService from '../../services/ProductsService.jsx';
import BrandsService from '../../services/BrandsService.jsx';
import MaterialsService from '../../services/MaterialsService.jsx';
import ColorsService from '../../services/ColorsService.jsx';
import GendersService from '../../services/GendersService.jsx';
import SizesService from '../../services/SizesService.jsx';
import OriginsService from '../../services/OriginsService.jsx';

function ListSample({ title, items }) {
  return (
    <div className="mb-4">
      <h5>{title} — {items.length}</h5>
      <ul>
        {items.slice(0, 5).map((it) => (
          <li key={it.id}>{it.name || it.label || JSON.stringify(it)}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Status() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    products: [], brands: [], materials: [], colors: [], genders: [], sizes: [], origins: [],
  });

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [products, brands, materials, colors, genders, sizes, origins] = await Promise.all([
        ProductsService.getAll(),
        BrandsService.getAll(),
        MaterialsService.getAll(),
        ColorsService.getAll(),
        GendersService.getAll(),
        SizesService.getAll(),
        OriginsService.getAll(),
      ]);
      setData({
        products: products || [],
        brands: brands || [],
        materials: materials || [],
        colors: colors || [],
        genders: genders || [],
        sizes: sizes || [],
        origins: origins || [],
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container my-4">
      <h2>Estado del API y recuentos</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={load} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div>
        <ListSample title="Productos" items={data.products} />
        <ListSample title="Brands" items={data.brands} />
        <ListSample title="Materials" items={data.materials} />
        <ListSample title="Colors" items={data.colors} />
        <ListSample title="Genders" items={data.genders} />
        <ListSample title="Sizes" items={data.sizes} />
        <ListSample title="Origins" items={data.origins} />
      </div>
    </div>
  );
}
