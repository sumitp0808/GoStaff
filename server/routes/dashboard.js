import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { getAdminSummary } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/',authMiddleware,getAdminSummary)
// router.get('/:id',authMiddleware,getSalary)


export default router