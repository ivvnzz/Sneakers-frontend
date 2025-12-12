import BaseTemplate from './BaseTemplate';
import Cart from '../organisms/Cart';

function CartTemplate() {
    return (
        <BaseTemplate>
            <div className="container my-5">
                <Cart />
            </div>
        </BaseTemplate>
    );
}

export default CartTemplate;
