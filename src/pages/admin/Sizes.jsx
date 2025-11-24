import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Sizes() {
  const { sizes, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Sizes</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando sizes</p>}
      <div className="list-group">
        {sizes.map((s) => (
          <div key={s.id} className="list-group-item">
            <strong>{s.name || s.label || s.id}</strong>
          </div>
        ))}
        {sizes.length === 0 && !loading && <p>No hay sizes.</p>}
      </div>
    </div>
  );
}

export default Sizes;
