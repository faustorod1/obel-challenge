import { Router } from 'express';
import * as roleController from '../controllers/roleController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', authMiddleware, roleController.getRoles);
router.post('/', authMiddleware, roleController.postRole);
router.put('/:id', authMiddleware, roleController.putRole);
router.get('/:id', authMiddleware, roleController.getRoleById);

export default router;