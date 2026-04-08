import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity.js'; 


@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;


  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

export default TodoEntity;