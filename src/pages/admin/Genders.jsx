import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function Genders() {
  const { genders, loading, error, refresh } = useReferenceData();

  return (
    <div className="container my-4">
      <h2>Genders</h2>
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={refresh} disabled={loading}>Refrescar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error cargando genders</p>}
      <div className="list-group">
        {genders.map((g) => (
          <div key={g.id} className="list-group-item">
            <strong>{g.name}</strong>
          </div>
        ))}
        {genders.length === 0 && !loading && <p>No hay genders.</p>}
      </div>
    </div>
  );
}

export default Genders;
