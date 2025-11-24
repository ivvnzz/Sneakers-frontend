import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Materials() {
  const { materials, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Materials</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando materials</p>}
      <div className="list-group">
        {materials.map((m) => (
          <div key={m.id} className="list-group-item">
            <strong>{m.name}</strong>
            <div>{m.description}</div>
          </div>
        ))}
        {materials.length === 0 && !loading && <p>No hay materials.</p>}
      </div>
    </div>
  );
}

export default Materials;
