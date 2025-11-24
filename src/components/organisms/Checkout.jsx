import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CheckoutForm from '../molecules/CheckoutForm';
import CartSummary from '../molecules/CartSummary';
import CartItem from '../molecules/CartItem';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function Checkout() {
    const { items, total, itemCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleCheckout = async (formData) => {
        setIsProcessing(true);
        
        try {
            //Simular procesamiento de pago
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Datos del cliente:', formData);
            console.log('Productos:', items);
            console.log('Total:', total);
            
            //Limpiar el carrito inmediatamente
            clearCart();
            
            //Mostrar confirmación
            setIsProcessing(false);
            setIsCompleted(true);
            
        } catch (error) {
            console.error('Error en el checkout:', error);
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        navigate('/cart');
    };

    const handleBackToShop = () => {
        navigate('/');
    };

    if (itemCount === 0 && !isCompleted) {
        return (
            <div className="text-center py-5">
                <Text variant="h3" className="text-muted">No hay productos para comprar</Text>
                <Text variant="p" className="text-muted">
                    Agrega algunos productos al carrito primero.
                </Text>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Ver Productos
                </Button>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-success" role="alert">
                    <Text variant="h2" className="text-success">¡Compra realizada con éxito!</Text>
                    <Text variant="p" className="mt-3">
                        Tu pedido ha sido procesado correctamente. 
                        Recibirás un email de confirmación pronto.
                    </Text>
                </div>
                <Button variant="primary" onClick={handleBackToShop}>
                    Continuar Comprando
                </Button>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <Text variant="h2" className="mb-4">Finalizar Compra</Text>
                
                <div className="card mb-4">
                    <div className="card-header">
                        <Text variant="h5">Productos en tu carrito</Text>
                    </div>
                    <div className="card-body">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                readonly={true}
                            />
                        ))}
                    </div>
                </div>

                <CheckoutForm
                    onSubmit={handleCheckout}
                    onCancel={handleCancel}
                />
            </div>

            <div className="col-md-4">
                <CartSummary
                    total={total}
                    itemCount={itemCount}
                    showButtons={false}
                />
                
                {isProcessing && (
                    <div className="card mt-3">
                        <div className="card-body text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Procesando...</span>
                            </div>
                            <Text variant="p" className="mt-2">Procesando tu compra...</Text>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
