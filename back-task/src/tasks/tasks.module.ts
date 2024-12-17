import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../schemas/task.schema';
import { UsersModule } from '../users/users.module';
import { Category, CategorySchema } from '../schemas/category.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
