import { API_BASE_URL, fetchData } from '../apiConfig.js';
class ContactsService {
  async getContacts() { return fetchData(`${API_BASE_URL}/contacts/`); }
  async sendMessage(data) {
    return fetchData(`${API_BASE_URL}/contacts/message`, { method: 'POST', body: JSON.stringify(data) });
  }
}
export default new ContactsService();