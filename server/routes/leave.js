import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeaves, getAllEmpLeaves, getLeaveDetails, updateLeave} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add',authMiddleware,addLeave)
router.get('/:id',authMiddleware,getLeaves)
router.get('/',authMiddleware,getAllEmpLeaves)
router.get('/details/:id',authMiddleware,getLeaveDetails)
router.put('/:id', authMiddleware,updateLeave)



export default router