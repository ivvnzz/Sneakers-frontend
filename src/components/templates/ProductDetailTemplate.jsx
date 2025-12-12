import BaseTemplate from './BaseTemplate';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import AddToCartButton from '../organisms/AddToCartButton';

function ProductDetailTemplate({ product, error }) {
    if (error) {
        return (
            <BaseTemplate>
                <div className="container my-5">
                    <Text variant="h1">{error}</Text>
                </div>
            </BaseTemplate>
        );
    }
    if (!product) {
        return (
            <BaseTemplate>
                <div className="container my-5">
                    <Text variant="h1">Producto no encontrado</Text>
                </div>
            </BaseTemplate>
        );
    }

    return (
        <BaseTemplate>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <Image 
                            src={product.image || (product.images && product.images.length ? (product.images[0].image?.url || product.images[0].url) : null)} 
                            alt={product.name} 
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6">
                        <Text variant="h2" className="mb-3">{product.name}</Text>
                        <Text variant="p" className="mb-3">{product.description}</Text>
                        <Text variant="h4" className="mb-4 text-primary">${product.price}</Text>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </BaseTemplate>
    );
}

export default ProductDetailTemplate;
