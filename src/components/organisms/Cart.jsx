import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../molecules/CartItem';
import CartSummary from '../molecules/CartSummary';
import Text from '../atoms/Text';

function Cart() {
    const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    //mostrar estado actual
    console.log('Cart render - items:', items.length, 'itemCount:', itemCount, 'total:', total);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-5">
                <Text variant="h3" className="text-muted">Tu carrito está vacío</Text>
                <Text variant="p" className="text-muted">
                    ¡Agrega algunos productos para comenzar a comprar!
                </Text>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/')}
                >
                    Ver Productos
                </button>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <Text variant="h2" className="mb-4">Mi Carrito</Text>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                ))}
            </div>
            <div className="col-md-4">
                <CartSummary
                    total={total}
                    itemCount={itemCount}
                    onCheckout={handleCheckout}
                    onClearCart={clearCart}
                />
            </div>
        </div>
    );
}

export default Cart;
