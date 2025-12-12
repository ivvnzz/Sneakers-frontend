import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function BaseTemplate({ children }) {
    return (
        <>
            <Navbar />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </>
    );
}

export default BaseTemplate;

