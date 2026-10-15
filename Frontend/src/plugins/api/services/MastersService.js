import { API_BASE_URL, fetchData } from '../apiConfig.js';
class MastersService {
  async getAllMasters() { return fetchData(`${API_BASE_URL}/masters/`); }
  async getMasterById(id) { return fetchData(`${API_BASE_URL}/masters/getById?id=${id}`); }
}
export default new MastersService();