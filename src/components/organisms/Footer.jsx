import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <Container>
                <div className="mb-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="bi bi-facebook"></i> Facebook
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="bi bi-instagram"></i> Instagram
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="bi bi-twitter"></i> Twitter
                    </a>
                </div>
                <p className="mb-0">&copy; {new Date().getFullYear()} SneakeRs. Todos los derechos reservados.</p>
            </Container>
        </footer>
    );
}

export default Footer;