import { Router } from 'express';
import { TodosController } from '../controllers/todos.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const todosRouter = Router();

const todosController: TodosController = new TodosController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

todosRouter.get('/', authMiddleware.protectedRoute, todosController.getAll.bind(todosController));
todosRouter.get('/:id', authMiddleware.protectedRoute, todosController.getOne.bind(todosController));
todosRouter.post('/', authMiddleware.protectedRoute, todosController.create.bind(todosController));
todosRouter.patch('/:id', authMiddleware.protectedRoute, todosController.update.bind(todosController));
todosRouter.delete('/:id', authMiddleware.protectedRoute, todosController.delete.bind(todosController));

export default todosRouter;