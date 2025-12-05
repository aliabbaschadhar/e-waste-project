import { Router } from 'express';
import {
  createFoodListing,
  getAllFoodListings,
  getFoodListing,
  updateFoodListing,
  deleteFoodListing,
  getMyFoodListings,
} from '../controllers/foodController';
import { authenticate, authorize } from '../middleware/auth';
import { validateFoodListing } from '../middleware/validation';

const foodRouter = Router();

// Public routes
foodRouter.get('/', getAllFoodListings);
foodRouter.get('/:id', getFoodListing);

// Protected routes - Restaurant only
foodRouter.post(
  '/',
  authenticate,
  authorize('RESTAURANT'),
  validateFoodListing,
  createFoodListing
);
foodRouter.get('/my/listings', authenticate, authorize('RESTAURANT'), getMyFoodListings);
foodRouter.put('/:id', authenticate, authorize('RESTAURANT'), updateFoodListing);
foodRouter.delete('/:id', authenticate, authorize('RESTAURANT'), deleteFoodListing);

export default foodRouter;
