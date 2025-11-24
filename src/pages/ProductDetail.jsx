import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetailTemplate from '../components/templates/ProductDetailTemplate';
import products from '../data/products.js';
import productosFemenino from '../data/productosFemenino.js';
import productosOF from '../data/productosOF.js';
import api from '../services/api';

function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            // try API first
            const apiProduct = await api.getProduct(id);
            if (!mounted) return;
            if (apiProduct) {
                setProduct(apiProduct);
                return;
            }

            // fallback to local datasets
            let p;
            if (location.pathname.startsWith('/femenino')) {
                p = productosFemenino.find((x) => x.id === parseInt(id));
            } else if (location.pathname.startsWith('/masculino')) {
                p = products.find((x) => x.id === parseInt(id));
            } else {
                p = productosOF.find((x) => x.id === parseInt(id));
            }
            setProduct(p || null);
        }
        load();
        return () => { mounted = false; };
    }, [id, location.pathname]);

    return <ProductDetailTemplate product={product} />;
}

export default ProductDetail;