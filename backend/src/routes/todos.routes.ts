import exporess from 'express';
import { TodosController } from '../controllers/todos.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = exporess.Router();

const todosController: TodosController = new TodosController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.get('/', authMiddleware.protectedRoute, todosController.getAll.bind(todosController));
router.get('/:id', authMiddleware.protectedRoute, todosController.getOne.bind(todosController));
router.post('/', authMiddleware.protectedRoute, todosController.create.bind(todosController));
router.patch('/:id', authMiddleware.protectedRoute, todosController.update.bind(todosController));
router.delete('/:id', authMiddleware.protectedRoute, todosController.delete.bind(todosController));

export default router;