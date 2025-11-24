import { Navbar, Nav, Container } from 'react-bootstrap';
import CartIcon from '../atoms/CartIcon';

function NavBar() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="/">SneakeRS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/products">Masculino</Nav.Link>
            <Nav.Link href="/femenino">Femenino</Nav.Link>
            </Nav>
            <Nav>
                <CartIcon />
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
    }


export default NavBar;