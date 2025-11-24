import { useEffect, useState } from 'react';
import ProductListTemplate from '../components/templates/ProductListTemplate';
import productosFemeninoLocal from '../data/productosFemenino.js';
import api from '../services/api';

function Femenino() {
    const [items, setItems] = useState(productosFemeninoLocal);

    useEffect(() => {
        let mounted = true;
        api.getProducts()
            .then((data) => {
                if (!mounted) return;
                if (data && data.length) {
                    const filtered = data.filter((p) => {
                        const g = (p.gender && (p.gender.name || '')).toString().toLowerCase();
                        return g.includes('femen') || g.includes('female') || g.includes('mujer');
                    });
                    setItems(filtered);
                }
            })
            .catch(() => {
                // keep local
            });
        return () => { mounted = false; };
    }, []);

    return (
        <ProductListTemplate 
            title="PRODUCTOS FEMENINOS"
            description="Descubre nuestra selección exclusiva para mujeres."
            products={items}
            section="femenino"
        />
    );
}

export default Femenino;