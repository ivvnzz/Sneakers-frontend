import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartIcon({ className = "" }) {
    const { itemCount, debugCart } = useCart();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cart');
    };

    const handleDebugClick = (e) => {
        e.stopPropagation(); //Evitar que navegue al carrito
        debugCart();
    };

    return (
        <button 
            className={`btn btn-outline-light position-relative ${className}`}
            onClick={handleClick}
            title="Ver carrito"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                className="bi bi-cart3" 
                viewBox="0 0 16 16"
            >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                </span>
            )}
            {/* Botón de debug temporal - doble click */}
            <span 
                className="position-absolute top-0 start-0 translate-middle"
                style={{ fontSize: '8px', color: 'transparent' }}
                onDoubleClick={handleDebugClick}
                title="Doble click para debug"
            >
                D
            </span>
        </button>
    );
}

export default CartIcon;
