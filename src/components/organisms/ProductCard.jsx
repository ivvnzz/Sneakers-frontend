import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import { resolveImageUrl } from '../../utils/imageUtils';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, section = "products" }) {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem' }} className="m-2 h-100 d-flex flex-column">
            <Image src={resolveImageUrl(product)} alt={product.name} className="card-img-top" />
            <Card.Body className="d-flex flex-column">
                <CardBody
                    title={product.name}
                    description={product.description}
                    price={product.price}
                />
                <div className="mt-auto">
                    <Button variant="primary" onClick={() => navigate(`/${section}/${product.id}`)}>
                        Ver detalles
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;