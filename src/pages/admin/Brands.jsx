import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Brands() {
  const { brands, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Brands</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando brands</p>}
      <div className="list-group">
        {brands.map((b) => (
          <div key={b.id} className="list-group-item">
            <strong>{b.name}</strong>
            <div>{b.description}</div>
          </div>
        ))}
        {brands.length === 0 && !loading && <p>No hay brands.</p>}
      </div>
    </div>
  );
}

export default Brands;
