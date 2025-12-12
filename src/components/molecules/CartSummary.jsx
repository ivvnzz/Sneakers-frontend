import Text from '../atoms/Text';
import Button from '../atoms/Button';

function CartSummary({ total, itemCount, onCheckout, onClearCart, showButtons = true }) {
    return (
        <div className="card">
            <div className="card-header">
                <Text variant="h5">Resumen del Carrito</Text>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                    <Text variant="span">Productos ({itemCount}):</Text>
                    <Text variant="span">${total}</Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                    <Text variant="h6">Total:</Text>
                    <Text variant="h6" className="text-primary fw-bold">${total}</Text>
                </div>
                {showButtons && (
                    <div className="d-grid gap-2">
                        <Button 
                            variant="success" 
                            size="lg"
                            onClick={onCheckout}
                            disabled={itemCount === 0}
                        >
                            Proceder al Pago
                        </Button>
                        {itemCount > 0 && (
                        <Button 
                            variant="outline-danger"
                            onClick={() => {
                                console.log('Clear cart button clicked');
                                onClearCart();
                            }}
                        >
                            Limpiar Carrito
                        </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartSummary;
