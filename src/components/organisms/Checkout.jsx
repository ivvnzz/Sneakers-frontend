import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CheckoutForm from '../molecules/CheckoutForm';
import CartSummary from '../molecules/CartSummary';
import CartItem from '../molecules/CartItem';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import AuthService from '../../services/AuthService';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Checkout() {
    const { items, total, itemCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [saleToken, setSaleToken] = useState(null);
    const [warning, setWarning] = useState(null);
    const [error, setError] = useState(null);

    const handleCheckout = async (formData) => {
        setIsProcessing(true);
        
        try {
            setError(null);
            const user = AuthService.getCurrentUser?.() || null;
            const s = {
                date: new Date().toISOString(),
                total: total,
            };
            if (user && user.id) s.user = { id: user.id };

            const res = await fetch(`${API_BASE}/api/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(AuthService.getAuthToken && { 'Authorization': `Bearer ${AuthService.getAuthToken()}` })
                },
                body: JSON.stringify(s)
            });
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText || 'Error creating sale');
            }
            let json = null;
            try {
                const text = await res.text();
                console.debug('Checkout response text:', text, 'status:', res.status);
                if (text && text.trim().length > 0) {
                    try { json = JSON.parse(text); } catch (e) { json = null; }
                }
            } catch(e) {
                console.warn('Error reading response body:', e);
            }
            const created = (json && json.sale) ? json.sale : json || null;
            if (!created || !created.id) {
                throw new Error('La venta fue creada pero la respuesta no contiene el ID de la transacción.');
            }
            for (const item of items) {
                try {
                    const psRes = await fetch(`${API_BASE}/api/product-sales`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(AuthService.getAuthToken && { 'Authorization': `Bearer ${AuthService.getAuthToken()}` })
                        },
                        body: JSON.stringify({
                            product: { id: item.id },
                            sales: { id: created.id },
                            quantity: item.quantity,
                            unitaryPrice: item.price
                        })
                    });
                    if (!psRes.ok) {
                        console.warn('Could not create product-sales for item', item.id);
                    }
                } catch(e) {
                    console.warn('Error creating product-sales for item', item.id, e);
                }
            }
            const token = json ? (json.token || (json.sale && json.sale.token)) : null;
            if (token) {
                setSaleToken(token);
                try { localStorage.setItem('lastSaleToken', token); } catch(e){}
            }
            if (json && json.warning) {
                setWarning(json.warning);
            }
            clearCart();
            setIsCompleted(true);
            
        } catch (err) {
            console.error('Error en el checkout:', err);
            setError(err.message || 'Error en el checkout');
        }
        finally {
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
                {warning && (
                    <div className="alert alert-warning">{warning}</div>
                )}
                {saleToken && (
                    <div className="alert alert-info mt-3">
                        <Text variant="p">Token de compra: <strong>{saleToken}</strong></Text>
                    </div>
                )}
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

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
                <CheckoutForm
                    onSubmit={handleCheckout}
                    onCancel={handleCancel}
                    isProcessing={isProcessing}
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
