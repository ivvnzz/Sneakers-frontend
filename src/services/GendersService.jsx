import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/genders`;

class GendersService {
getAll() { return axios.get(BASE_URL).then((r) => r.data); }
create(payload) { return axios.post(BASE_URL, payload).then((r) => r.data); }
update(id, payload) { return axios.put(`${BASE_URL}/${id}`, payload).then((r) => r.data); }
remove(id) { return axios.delete(`${BASE_URL}/${id}`).then((r) => r.data); }
}

export default new GendersService();
