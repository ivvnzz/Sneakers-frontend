import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth`;

class AuthService {
async login(credentials) {
    const res = await axios.post(`${BASE_URL}/login`, credentials);
    const data = res.data;
    if (data && data.token) {
      try { localStorage.setItem('authToken', data.token); } catch (e) { }
      
      if (data.user) {
        try { localStorage.setItem('authUser', JSON.stringify(data.user)); } catch (e) { }
      }
    }
    return data;
}

logout() {
  try { localStorage.removeItem('authToken'); } catch (e) { }
}

getAuthToken() {
  try { return localStorage.getItem('authToken'); } catch (e) { return null; }
}

getCurrentUser() {
  try {
    const raw = localStorage.getItem('authUser');
    if (raw) return JSON.parse(raw);
    const token = this.getAuthToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
    if (payload && (payload.rol || payload.role || payload.username)) return payload;
    return null;
  } catch (e) { return null; }
}

setAuthToken(token) {
  try { localStorage.setItem('authToken', token); } catch (e) { }
}
}

export default new AuthService();
