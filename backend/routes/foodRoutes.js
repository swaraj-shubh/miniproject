// routes/foodRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  donateFood,
  getAvailableFoods,
  getFoodById,
  reserveFood,
  getDonatedFoods,
  getReceivedFoods,
  getAllDonatedFoods
} from '../controllers/foodController.js';

const router = express.Router();

router.route('/donate')
  .post(protect, donateFood)
  .get(getAvailableFoods);

  router.get('/test', (req, res) => {
    try {
      console.log('Test route reached'); // Check if this appears in logs
      res.json({ message: '✅ Food route is working!' });
    } catch (error) {
      console.error('Test route error:', error);
      res.status(500).json({ message: 'Test route failed', error: error.message });
    }
  });
  
router.route('/admin').get(getAllDonatedFoods);
router.route('/donated').get(protect, getDonatedFoods);
router.route('/received').get(protect, getReceivedFoods);
router.route('/:id').get(getFoodById);
router.route('/:id/reserve').put(protect, reserveFood);
router.get('/all', getAllDonatedFoods);
export default router;
