import { API_BASE_URL, fetchData } from '../apiConfig.js';

class OrdersService {
  async getAllOrders() { return fetchData(`${API_BASE_URL}/orders/`); }
  async createOrder(orderData) {
    return fetchData(`${API_BASE_URL}/orders/`, { method: 'POST', body: JSON.stringify(orderData) });
  }
  async updateOrder(recordId, data) {
    return fetchData(`${API_BASE_URL}/orders/${recordId}`, { method: 'PUT', body: JSON.stringify(data) });
  }
  async deleteOrder(recordId) {
    return fetchData(`${API_BASE_URL}/orders/${recordId}`, { method: 'DELETE' });
  }
}
export default new OrdersService();