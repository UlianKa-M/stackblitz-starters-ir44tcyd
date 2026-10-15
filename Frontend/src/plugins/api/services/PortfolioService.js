import { API_BASE_URL, fetchData } from '../apiConfig.js';
class PortfolioService {
  async getAllWorks() { return fetchData(`${API_BASE_URL}/portfolio/`); }
  async getByCategory(category) { return fetchData(`${API_BASE_URL}/portfolio/byCategory?category=${encodeURIComponent(category)}`); }
}
export default new PortfolioService();