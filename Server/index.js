import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import UserController from './controllers/UserController.js';
import LoginController from './controllers/LoginController.js';
import ServicesController from './controllers/ServicesController.js';
import OrdersController from './controllers/OrdersController.js';
import MastersController from './controllers/MastersController.js';
import PortfolioController from './controllers/PortfolioController.js';
import ReviewsController from './controllers/ReviewsController.js';
import ContactsController from './controllers/ContactsController.js';

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

app.use('/api/users', UserController);
app.use('/api/login', LoginController);
app.use('/api/services', ServicesController);
app.use('/api/orders', OrdersController);
app.use('/api/masters', MastersController);
app.use('/api/portfolio', PortfolioController);
app.use('/api/reviews', ReviewsController);
app.use('/api/contacts', ContactsController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});