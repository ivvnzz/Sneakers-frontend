import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import QuantityInput from '../atoms/QuantityInput';

function CartItem({ item, onUpdateQuantity, onRemove, readonly = false }) {
    const handleQuantityChange = (newQuantity) => {
        if (!readonly && onUpdateQuantity) {
            onUpdateQuantity(item.id, newQuantity);
        }
    };

    const handleRemove = () => {
        if (!readonly && onRemove) {
            onRemove(item.id);
        }
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <Image 
                        src={item.image} 
                        alt={item.name}
                        className="img-fluid rounded-start"
                        style={{ height: '100px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <Text variant="h5" className="card-title">{item.name}</Text>
                        <Text variant="p" className="card-text text-muted">{item.description}</Text>
                        <Text variant="span" className="text-primary fw-bold">
                            ${item.price}
                        </Text>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                        {readonly ? (
                            <div className="text-center">
                                <Text variant="span" className="fw-bold">Cantidad: {item.quantity}</Text>
                            </div>
                        ) : (
                            <QuantityInput 
                                value={item.quantity}
                                onChange={handleQuantityChange}
                            />
                        )}
                        {!readonly && (
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={handleRemove}
                                className="mt-2"
                            >
                                Eliminar
                            </Button>
                        )}
                        <Text variant="span" className="fw-bold text-end mt-2">
                            Total: ${item.price * item.quantity}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
