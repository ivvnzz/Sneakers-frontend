import { useEffect, useState } from 'react';
import ProductListTemplate from '../components/templates/ProductListTemplate';
import productsLocal from '../data/products';
import ProductsService from '../services/ProductsService.jsx';

function Masculino() {
    const [items, setItems] = useState(productsLocal);

    useEffect(() => {
        let mounted = true;
        ProductsService.getAll()
            .then((data) => {
                if (!mounted) return;
                if (data && data.length) {
                    const filtered = data.filter((p) => {
                        const g = (p.gender && (p.gender.name || '')).toString().toLowerCase();
                        return g.includes('mascul') || g.includes('male') || g.includes('hombre');
                    });
                    setItems(filtered);
                }
            })
            .catch(() => {
            });
        return () => { mounted = false; };
    }, []);

    return (
        <ProductListTemplate 
            title="PRODUCTOS MASCULINOS"
            description="Zapatillas para hombre"
            products={items}
            section="masculino"
        />
    );
}

export default Masculino;