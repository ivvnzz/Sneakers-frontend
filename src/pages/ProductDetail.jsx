import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetailTemplate from '../components/templates/ProductDetailTemplate';
import BaseTemplate from '../components/templates/BaseTemplate';
import products from '../data/products.js';
import productosFemenino from '../data/productosFemenino.js';
import productosOF from '../data/productosOF.js';
import ProductsService from '../services/ProductsService.jsx';

function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            let apiProduct = null;
            try {
                apiProduct = await ProductsService.getById(id);
            } catch (err) {
                // If 404 => no product in API, fallback to local; else treat as network error
                if (err && err.response && err.response.status && err.response.status !== 404) {
                    setError('Error al comunicarse con el servidor');
                }
                apiProduct = null;
            }
            if (!mounted) return;
            if (apiProduct) {
                setProduct(apiProduct);
                setLoading(false);
                return;
            }

            let p;
            if (location.pathname.startsWith('/femenino')) {
                p = productosFemenino.find((x) => x.id === parseInt(id));
            } else if (location.pathname.startsWith('/masculino')) {
                p = products.find((x) => x.id === parseInt(id));
            } else {
                p = productosOF.find((x) => x.id === parseInt(id));
            }
            setProduct(p || null);
            setLoading(false);
        }
        load();
        return () => { mounted = false; };
    }, [id, location.pathname]);

    if (loading) {
        return (
            <BaseTemplate>
                <div className="container my-5 text-center">Cargando...</div>
            </BaseTemplate>
        );
    }
    return <ProductDetailTemplate product={product} error={error} />;
}

export default ProductDetail;