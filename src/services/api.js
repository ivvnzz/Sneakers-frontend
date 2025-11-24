const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

let authToken = localStorage.getItem('authToken') || null;
export function setAuthToken(token) {
  authToken = token;
  if (token) localStorage.setItem('authToken', token);
async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  try {
    const data = await res.json();
    return data;
  } catch (err) {
export async function getProducts() {
  return (await request('/api/products')) || [];
}
export async function getProduct(id) {
  return (await request(`/api/products/${id}`)) || null;
}
export async function getBrands() { return (await request('/api/brands')) || []; }
export async function getMaterials() { return (await request('/api/materials')) || []; }
export async function getColors() { return (await request('/api/colors')) || []; }
export async function getGenders() { return (await request('/api/genders')) || []; }
export async function getSizes() { return (await request('/api/sizes')) || []; }
export async function getOrigins() { return (await request('/api/origins')) || []; }
// Generic CRUD for references (path should be like '/api/brands' or '/api/brands/{id}')
export async function createReference(path, payload) {
  return await request(path, { method: 'POST', body: JSON.stringify(payload) });
export async function deleteReference(path) {
  return await request(path, { method: 'DELETE' });
}
export async function updateReference(path, payload) {
  return await request(path, { method: 'PUT', body: JSON.stringify(payload) });
}
export async function login(credentials) {
  // expects { username, password } and returns { token }
  return await request('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export default {
  setAuthToken,
  getProducts,
  getProduct,
  getBrands,
  getMaterials,
  getColors,
  getGenders,
  getSizes,
  getOrigins,
  createReference,
  deleteReference,
  updateReference,
  login,
};
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API request error', err, url);
    return null;
  }
}

export async function getProducts() {
  return (await request('/api/products')) || [];
}

export async function getProduct(id) {
  return (await request(`/api/products/${id}`)) || null;
}

export async function getBrands() {
  return (await request('/api/brands')) || [];
}

export async function getMaterials() {
  return (await request('/api/materials')) || [];
}

export async function getColors() {
  return (await request('/api/colors')) || [];
}

export async function getGenders() {
  return (await request('/api/genders')) || [];
}

export async function getSizes() {
  return (await request('/api/sizes')) || [];
}

export async function getOrigins() {
  return (await request('/api/origins')) || [];
}

export default {
  getProducts,
  getProduct,
  getBrands,
  getMaterials,
  getColors,
  getGenders,
  getSizes,
  getOrigins,
};
