import { API_BASE_URL, fetchData } from '../apiConfig.js';

class UserService {
  async getAllUsers() { return fetchData(`${API_BASE_URL}/users/`); }
  async getUserById(userId) { return fetchData(`${API_BASE_URL}/users/getById?id=${userId}`); }
}
export default new UserService();