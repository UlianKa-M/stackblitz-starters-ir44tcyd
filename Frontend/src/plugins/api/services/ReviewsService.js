import { API_BASE_URL, fetchData } from '../apiConfig.js';
class ReviewsService {
  async getAllReviews() { return fetchData(`${API_BASE_URL}/reviews/`); }
  async createReview(data) {
    return fetchData(`${API_BASE_URL}/reviews/`, { method: 'POST', body: JSON.stringify(data) });
  }
  async updateReview(id, data) {
    return fetchData(`${API_BASE_URL}/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }
  async deleteReview(id) {
    return fetchData(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
  }
}
export default new ReviewsService();