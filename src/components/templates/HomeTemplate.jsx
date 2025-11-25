import { useEffect, useState } from 'react';
import BaseTemplate from './BaseTemplate';
import ProductCard from '../organisms/ProductCard';
import productosOF from '../../data/productosOF';
import ProductsService from '../../services/ProductsService.jsx';

function HomeTemplate() {
    const [products, setProducts] = useState(productosOF);

    useEffect(() => {
        let mounted = true;
        ProductsService.getAll()
            .then((data) => {
                if (!mounted) return;
                if (data && data.length) {
                    setProducts(data);
                }
            })
            .catch((err) => console.warn('Failed to load products from API', err));
        return () => { mounted = false; };
    }, []);

    return (
        <BaseTemplate>
            <div className="container my-5">
                <h1>PRODUCTOS DESTACADOS</h1>
                <p>Bienvenidos a nuestro sitio web.</p>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard product={product} section="products" />
                        </div>
                    ))}
                </div>
            </div>
        </BaseTemplate>
    );
}

export default HomeTemplate;
