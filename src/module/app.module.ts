import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity.js';
import { TodoEntity } from '../entities/todo.entity.js';
import { DatabaseService } from '../database/database-service.js';
import { AuthModule } from '../auth/auth.module.js';
import { TodoModule } from '../todo/todo.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'saidat1985',
      database: 'todo-nest',
      synchronize: true,
      logging: false,
      autoLoadEntities: true, // 🔥 NestJS way
    }),

    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
    AuthModule,
    TodoModule,
  ],
  providers: [DatabaseService], // 👈 add this
})
export class AppModule {}