import { Request, Response } from 'express';
import Todo from '../models/todo.model';
import redisClient from '../lib/redis.lib';

export class TodosController {

  public async getAll(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;
      
      const cachedTodos = await redisClient.get(`${user._id}_todos`);

      if (cachedTodos) {
        return res.status(200).json({ todos: JSON.parse(cachedTodos) });
      }

      const todos = await Todo.find({ userId: user._id });

      await this.saveInCache(`${user._id}_todos`, JSON.stringify(todos));

      return res.status(200).json({ todos });
    } catch (error: any) {
      return res.status(500).json({ content: error.message });
    }
  }

  public async getOne(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;
      const todosId = req.params.id;

      const todo = await Todo.find({ userId: user._id, _id: todosId });

      return res.status(200).json({ todo });
    } catch (error: any) {
      return res.status(404).json({ content: 'todos not found' });
    }
  }

  public async create(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;
      const { title, content } = req.body;

      await Todo.create({ title, content, userId: user._id });

      return res.status(201).json({ content: 'created' });
    } catch (error: any) {
      return res.status(500).json({ content: error.message });
    }
  }

  public async update(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;
      const todoId = req.params.id;
      const { title, content, isCompleted } = req.body;

      const todo = await Todo.find({ userId: user._id, _id: todoId });

      if (todo.length <= 0) {
        return res.status(404).json({ content: 'todos not found' });
      }

      await Todo.updateOne({ userId: user._id, _id: todoId }, { title, content, isCompleted });

      const todos = await Todo.find({ userId: user._id });
      await this.saveInCache(`${user._id}_todos`, JSON.stringify(todos));

      return res.status(201).json({ content: 'updated' });
    } catch (error) {
      
    }
  }

  public async delete(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;
      const todoId = req.params.id;

      await Todo.deleteOne({ userId: user._id, _id: todoId });

      const todos = await Todo.find({ userId: user._id });
      await this.saveInCache(`${user._id}_todos`, JSON.stringify(todos));

      return res.status(201).json({ content: 'deleted' });
    } catch (error: any) {
      return res.status(500).json({ content: error.message });
    }
  }

  private async saveInCache(key: string, data: string) {
    redisClient.set(key, data);
  }
}