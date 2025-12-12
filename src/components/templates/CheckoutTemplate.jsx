import BaseTemplate from './BaseTemplate';
import Checkout from '../organisms/Checkout';

function CheckoutTemplate() {
    return (
        <BaseTemplate>
            <div className="container my-5">
                <Checkout />
            </div>
        </BaseTemplate>
    );
}

export default CheckoutTemplate;
