import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth`;

class AuthService {
async login(credentials) {
    const res = await axios.post(`${BASE_URL}/login`, credentials);
    const data = res.data;
    if (data && data.token) {
      try { localStorage.setItem('authToken', data.token); } catch (e) { /* ignore */ }
    }
    return data;
}

logout() {
    try { localStorage.removeItem('authToken'); } catch (e) { /* ignore */ }
}
}

export default new AuthService();
