import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

const authController: AuthController = new AuthController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.post('/sign-up', authController.signUp.bind(authController));
router.post('/sign-in', authController.signIn.bind(authController));
router.post('/sign-out', authMiddleware.protectedRoute, authController.singOut.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.get('/profile', authMiddleware.protectedRoute, authController.getProfile.bind(authController));

export default router;