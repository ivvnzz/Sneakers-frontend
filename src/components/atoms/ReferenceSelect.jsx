import React from 'react';
import useReferenceData from '../../hooks/useReferenceData';

function ReferenceSelect({ type, value, onChange, label, placeholder = 'Seleccionar...', nameKey = 'name' }) {
  const { brands, materials, colors, genders, sizes, origins, loading } = useReferenceData();

  let options = [];
  switch (type) {
    case 'brands': options = brands; break;
    case 'materials': options = materials; break;
    case 'colors': options = colors; break;
    case 'genders': options = genders; break;
    case 'sizes': options = sizes; break;
    case 'origins': options = origins; break;
    default: options = [];
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select className="form-select" value={value || ''} onChange={(e) => onChange && onChange(e.target.value)} disabled={loading}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt[nameKey] || opt.name || opt.id}</option>
        ))}
      </select>
    </div>
  );
}

export default ReferenceSelect;
