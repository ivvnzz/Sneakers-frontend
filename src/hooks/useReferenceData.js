import { useEffect, useState, useCallback } from 'react';
import BrandsService from '../services/BrandsService.jsx';
import MaterialsService from '../services/MaterialsService.jsx';
import ColorsService from '../services/ColorsService.jsx';
import GendersService from '../services/GendersService.jsx';
import SizesService from '../services/SizesService.jsx';
import OriginsService from '../services/OriginsService.jsx';

// Hook centralizado para cargar y cachear datos de referencia (brands, materials, colors, genders, sizes, origins)
export default function useReferenceData() {
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, m, c, g, s, o] = await Promise.all([
        BrandsService.getAll(),
        MaterialsService.getAll(),
        ColorsService.getAll(),
        GendersService.getAll(),
        SizesService.getAll(),
        OriginsService.getAll(),
      ]);
      setBrands(b || []);
      setMaterials(m || []);
      setColors(c || []);
      setGenders(g || []);
      setSizes(s || []);
      setOrigins(o || []);
    } catch (err) {
      console.error('Failed loading reference data', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    brands,
    materials,
    colors,
    genders,
    sizes,
    origins,
    loading,
    error,
    refresh: loadAll,
  };
}
