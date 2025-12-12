import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Colors() {
  const { colors, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Colors</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando colors</p>}
      <div className="list-group">
        {colors.map((c) => (
          <div key={c.id} className="list-group-item">
            <strong>{c.name}</strong>
          </div>
        ))}
        {colors.length === 0 && !loading && <p>No hay colors.</p>}
      </div>
    </div>
  );
}

export default Colors;
