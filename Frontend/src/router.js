import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ServicesPage from './views/ServicesPage.vue';
import OrdersPage from './views/OrdersPage.vue';
import MastersPage from './views/MastersPage.vue';
import PortfolioPage from './views/PortfolioPage.vue';
import ContactsPage from './views/ContactsPage.vue';
import ReviewsPage from './views/ReviewsPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/services', name: 'services', component: ServicesPage },
  { path: '/orders', name: 'orders', component: OrdersPage },
  { path: '/masters', name: 'masters', component: MastersPage },
  { path: '/portfolio', name: 'portfolio', component: PortfolioPage },
  { path: '/contacts', name: 'contacts', component: ContactsPage },
  { path: '/reviews', name: 'reviews', component: ReviewsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;