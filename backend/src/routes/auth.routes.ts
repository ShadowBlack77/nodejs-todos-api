import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const authRouter = Router();

const authController: AuthController = new AuthController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

authRouter.post('/sign-up', authController.signUp.bind(authController));
authRouter.post('/sign-in', authController.signIn.bind(authController));
authRouter.post('/sign-out', authMiddleware.protectedRoute, authController.singOut.bind(authController));
authRouter.post('/refresh-token', authController.refreshToken.bind(authController));
authRouter.get('/profile', authMiddleware.protectedRoute, authController.getProfile.bind(authController));

export default authRouter;