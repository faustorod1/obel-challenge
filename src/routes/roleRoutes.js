import { Router } from 'express';
import * as roleController from '../controllers/roleController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', authMiddleware, roleController.getRoles);
router.post('/', authMiddleware, roleController.postRole);
router.put('/:id', authMiddleware, roleController.putRole);
router.get('/:id', authMiddleware, roleController.getRoleById);
router.delete('/:id', authMiddleware, roleController.deleteRole);
export default router;