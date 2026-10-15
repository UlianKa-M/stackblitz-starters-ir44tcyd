import { API_BASE_URL, fetchData } from '../apiConfig.js';
class ServicesService {
  async getAllServices() { return fetchData(`${API_BASE_URL}/services/`); }
  async getByCategory(category) {
    return fetchData(`${API_BASE_URL}/services/byCategory?category=${encodeURIComponent(category)}`);
  }
}
export default new ServicesService();