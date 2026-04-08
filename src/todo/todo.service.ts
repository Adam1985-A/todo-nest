import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity.js';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity.js';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepo: Repository<TodoEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

   //Create a new todo item for the authenticated user
   async create(body: any, user: { userId: number}) {
    const UserEntity = await this.userRepo.findOne({ 
      where: { id: user.userId }
     });
     if(!UserEntity) {
      throw new Error('User not found');
     }
    const todo = this.todoRepo.create({
      title: body.title,
      description: body.description,
      completed: body.completed ?? false,
      user: UserEntity,
    });
    return this.todoRepo.save(todo);
  }

  findAll(userId: number) {
    return this.todoRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  findOne(id: number, userId: number) {
    return this.todoRepo.findOne({ 
      where: { id, user: { id: userId } }, 
      relations: ['user'], 
    });

  }

  async update(id: number, body: any, userId: number) {
  const todo = await this.todoRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ['user'],
  });

  if (!todo) {
    throw new Error('Not authorized or todo not found');
  }
    
  //Merge update data with existing todo, only if provided
  
  if (body.title !== undefined) todo.title = body.title;
  if (body.description !== undefined) todo.description = body.description;
  if (body.completed !== undefined) todo.completed = body.completed;

  
  return this.todoRepo.save(todo); // Save merged entity back to the database
}

  async delete(id: number, userId: number) {
    const todo = await this.todoRepo.findOne({ 
      where: { id, user: { id: userId } },
       relations: ['user'],
       });
    if (!todo) {
      throw new Error('Todo not found or unauthorized');
    }
    await this.todoRepo.remove(todo);
    return { message: 'Todo deleted successfully' };
  }

}