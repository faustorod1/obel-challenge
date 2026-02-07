import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.post('/assign', authMiddleware, userController.assignRole);
router.post('/unassign', authMiddleware, userController.unassignRole);
router.get('/:id/roles', authMiddleware, userController.getUserRoles);

export default router;