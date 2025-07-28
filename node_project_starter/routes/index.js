import express from 'express';
import userRoutes from './user.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is working');
});
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);

export default router; 
