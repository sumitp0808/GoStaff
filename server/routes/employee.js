import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, getEmployeesByDep} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/',authMiddleware,getEmployees)
router.post('/add',authMiddleware,upload.single('image'),addEmployee)
router.get('/:id',authMiddleware,getEmployee)
router.get('/department/:id', authMiddleware, getEmployeesByDep)
// router.delete('/:id', authMiddleware, deleteDepartment)

export default router