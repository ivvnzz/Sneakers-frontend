import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../atoms/Button';

function AddToCartButton({ product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        
        //Mostrar mensaje de confirmación por 2 segundos
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <Button 
            variant={isAdded ? "success" : "primary"} 
            size="lg"
            onClick={handleAddToCart}
            disabled={isAdded}
        >
            {isAdded ? "✓ Agregado al carrito" : "Agregar al carrito"}
        </Button>
    );
}

export default AddToCartButton;
