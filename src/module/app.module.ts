import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity.js';
import { TodoEntity } from '../entities/todo.entity.js';
import { DatabaseService } from '../database/database-service.js';
import { AuthModule } from '../auth/auth.module.js';
import { TodoModule } from '../todo/todo.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
 
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL!,
      synchronize: true,
      logging: false,
      autoLoadEntities: true, // 🔥 NestJS way
      ssl:{ rejectUnauthorized: false },
    
    }),

    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
    AuthModule,
    TodoModule,
  ],
  providers: [DatabaseService], // 👈 add this
})
export class AppModule {}