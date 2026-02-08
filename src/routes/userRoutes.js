import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/', authMiddleware, userController.getUsers);//Me pareció util agregarlo para que quien pruebe la API pueda conocer facilmente sus id´s u otra info de interes
router.post('/assign', authMiddleware, userController.assignRole);
router.post('/unassign', authMiddleware, userController.unassignRole);
router.get('/:id/roles', authMiddleware, userController.getUserRoles);

export default router;