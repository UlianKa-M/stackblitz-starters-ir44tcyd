import { API_BASE_URL, fetchData } from '../apiConfig.js';
class LoginService {
  async authorizationUser(email, password) {
    const url = `${API_BASE_URL}/login/auth?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return fetchData(url);
  }
  async registerUser(data) {
    return fetchData(`${API_BASE_URL}/login/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
export default new LoginService();