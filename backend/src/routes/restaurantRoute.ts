import { Router } from 'express';
import {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  getMyRestaurant,
} from '../controllers/restaurantController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRestaurant } from '../middleware/validation';

const restaurantRouter = Router();

// Public routes
restaurantRouter.get('/', getAllRestaurants);
restaurantRouter.get('/:id', getRestaurant);

// Protected routes - User/Restaurant
restaurantRouter.post(
  '/',
  authenticate,
  authorize('USER', 'RESTAURANT'),
  validateRestaurant,
  createRestaurant
);

// Protected routes - Restaurant only
restaurantRouter.get('/my/profile', authenticate, authorize('RESTAURANT'), getMyRestaurant);
restaurantRouter.put('/', authenticate, authorize('RESTAURANT'), updateRestaurant);

export default restaurantRouter;
