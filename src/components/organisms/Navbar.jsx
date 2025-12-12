import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartIcon from '../atoms/CartIcon';
import AuthService from '../../services/AuthService';
import Button from '../atoms/Button';

function NavBar() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="/">SneakeRS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/products">Masculino</Nav.Link>
            <Nav.Link as={Link} to="/femenino">Femenino</Nav.Link>
            </Nav>
            { (AuthService.getAuthToken && AuthService.getCurrentUser) && (() => {
                const user = AuthService.getCurrentUser();
                const r = user?.rol || user?.role || '';
                if (r && (r.toLowerCase() === 'admin' || r.toLowerCase() === 'moderator')) {
                    return (
                        <Nav>
                        <Nav.Link as={Link} to="/admin/moderator">Moderador</Nav.Link>
                        </Nav>
                    );
                }
                return null;
            })()}
                    {import.meta.env.VITE_DEV_ADMIN === 'true' && (
                        <Nav>
                            <Nav.Item>
                                <Button variant="outline-light" size="sm" onClick={() => {
                                    const u = AuthService.getCurrentUser?.() || { username: 'dev-admin', rol: 'admin' };
                                    try { localStorage.setItem('authUser', JSON.stringify({ ...u, rol: 'admin'})); localStorage.setItem('authToken', 'devtoken'); } catch(e) {}
                                    window.location.reload();
                                }}>Dev Admin</Button>
                            </Nav.Item>
                        </Nav>
                    )}
                    <Nav>
                        <Nav.Link as={Link} to="/admin/moderator/public">Moderador (demo)</Nav.Link>
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