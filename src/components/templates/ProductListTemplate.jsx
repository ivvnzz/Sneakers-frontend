import BaseTemplate from './BaseTemplate';
import ProductCard from '../organisms/ProductCard';

function ProductListTemplate({ title, description, products, section }) {
    return (
        <BaseTemplate>
            <div className="container my-5">
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard product={product} section={section} />
                        </div>
                    ))}
                </div>
            </div>
        </BaseTemplate>
    );
}

export default ProductListTemplate;
