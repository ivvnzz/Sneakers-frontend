import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Origins() {
  const { origins, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Origins</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando origins</p>}
      <div className="list-group">
        {origins.map((o) => (
          <div key={o.id} className="list-group-item">
            <strong>{o.name}</strong>
            <div>{o.description}</div>
          </div>
        ))}
        {origins.length === 0 && !loading && <p>No hay origins.</p>}
      </div>
    </div>
  );
}

export default Origins;
