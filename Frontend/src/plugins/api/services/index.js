import LoginService from './LoginService.js';
import UserService from './UserService.js';
import ServicesService from './ServicesService.js';
import OrdersService from './OrdersService.js';
import MastersService from './MastersService.js';
import PortfolioService from './PortfolioService.js';
import ReviewsService from './ReviewsService.js';
import ContactsService from './ContactsService.js';

export const registerServices = (app) => {
  app.provide('loginService', LoginService);
  app.provide('userService', UserService);
  app.provide('servicesService', ServicesService);
  app.provide('ordersService', OrdersService);
  app.provide('mastersService', MastersService);
  app.provide('portfolioService', PortfolioService);
  app.provide('reviewsService', ReviewsService);
  app.provide('contactsService', ContactsService);
};