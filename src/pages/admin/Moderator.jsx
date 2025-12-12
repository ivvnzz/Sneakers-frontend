import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { Table, Button, Modal, Form } from 'react-bootstrap';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Moderator() {
  const location = useLocation();
  const [tokens, setTokens] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('tokens'); // 'tokens' | 'products'
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true);
        const authToken = AuthService.getAuthToken?.() || '';
        const adminKey = import.meta.env.VITE_ADMIN_KEY || '';
        // If we're in public demo mode, use the public endpoint; otherwise, prefer the secure one.
        const usePublic = location.pathname && location.pathname.includes('/admin/moderator/public');
        const endpoint = usePublic ? `${API_BASE}/api/sales/tokens` : `${API_BASE}/api/sales/tokens/secure`;
        const res = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            ...(adminKey && { 'X-ADMIN-KEY': adminKey }),
          },
        });
        if (res.status === 204) {
          setTokens([]);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          if (res.status === 403) throw new Error('Acceso denegado. Verifica la clave de administrador (VITE_ADMIN_KEY).');
          throw new Error('Error fetching tokens');
        }
        const data = await res.json();
        setTokens(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  useEffect(() => {
    if (view !== 'products') return;
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/products`, {
          headers: {
            'Content-Type': 'application/json',
            ...(AuthService.getAuthToken && AuthService.getAuthToken() ? { Authorization: `Bearer ${AuthService.getAuthToken()}` } : {})
          }
        });
        if (res.status === 204) {
          if (!mounted) return;
          setProducts([]);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('Error fetching products');
        const data = await res.json();
        if (!mounted) return;
        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => { mounted = false; };
  }, [view]);

  function openEditModal(product = null) {
    setEditing(product ? { ...product } : { name: '', price: 0, image: '', description: '' });
    setShowModal(true);
  }

  async function saveProduct() {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing.id ? 'PUT' : 'POST';
      const url = editing.id ? `${API_BASE}/api/products/${editing.id}` : `${API_BASE}/api/products`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(AuthService.getAuthToken && AuthService.getAuthToken() ? { Authorization: `Bearer ${AuthService.getAuthToken()}` } : {})
        },
        body: JSON.stringify(editing)
      });
      if (!res.ok) throw new Error('Error saving product');
      // Refresh list
      const data = await res.json();
      // Reload products
      setShowModal(false);
      setEditing(null);
      setSaving(false);
      setView('products');
      // Reload products by switching view (or re-fetch)
      const reload = await fetch(`${API_BASE}/api/products`);
      if (reload.ok) setProducts(await reload.json());
    } catch (err) {
      console.error(err);
      setSaving(false);
      setError(err.message || 'Error saving');
    }
  }

  async function deleteProduct(id) {
    if (!confirm('¿Eliminar producto? Esta acción es irreversible.')) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(AuthService.getAuthToken && AuthService.getAuthToken() ? { Authorization: `Bearer ${AuthService.getAuthToken()}` } : {})
        }
      });
      if (res.status !== 204) throw new Error('Error eliminando');
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error eliminando producto');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="container my-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Moderador</h2>
      {location.pathname && location.pathname.includes('/admin/moderator/public') && (
        <div className="alert alert-info">Modo demostración: esta vista es pública para la presentación.</div>
      )}
      <div className="mb-3">
        <Button variant={view==='tokens' ? 'primary' : 'secondary'} onClick={() => setView('tokens')} className="me-2">Tokens</Button>
        <Button variant={view==='products' ? 'primary' : 'secondary'} onClick={() => setView('products')}>Productos</Button>
      </div>

      {view === 'tokens' && (
        <div>
          <h4>Tokens de ventas</h4>
          {tokens.length === 0 ? (
            <p>No hay tokens registrados.</p>
          ) : (
            <div className="table-responsive">
              <Table striped>
                <thead>
                  <tr>
                    <th>Sale ID</th>
                    <th>Token</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((t) => (
                    <tr key={t.salesId}>
                      <td>{t.salesId}</td>
                      <td style={{ wordBreak: 'break-all' }}>{t.token}</td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}

      {view === 'products' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Productos</h4>
            <Button variant="success" onClick={() => openEditModal(null)}>Crear Producto</Button>
          </div>
          {products.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            <div className="table-responsive">
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(p)}>Editar</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => deleteProduct(p.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setEditing(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{editing && editing.id ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as="textarea" rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" value={editing.price || 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value || 0) })} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Imagen URL</Form.Label>
                <Form.Control value={editing.image || ''} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); setEditing(null); }}>Cancelar</Button>
          <Button variant="primary" disabled={saving} onClick={saveProduct}>{saving ? 'Guardando...' : 'Guardar'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
