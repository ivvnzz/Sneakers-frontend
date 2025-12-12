import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/products`;

class ProductsService {
getAll() { return axios.get(BASE_URL).then((r) => r.data); }
getById(id) { return axios.get(`${BASE_URL}/${id}`).then((r) => r.data); }
}

export default new ProductsService();
