import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, userId });
    return task.save();
  }

  async findAll(
    userId: string,
    taskSearch: boolean,
    search: string,
    dashboard: boolean,
    dashboardSearch: string,
    category: boolean,
    categorySearch: string,
  ): Promise<Task[]> {
    const today = new Date();
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    // Устанавливаем время на 00:00:00 для сегодняшней даты
    today.setHours(0, 0, 0, 0);

    // Создаем копию для следующего дня с временем 00:00:00
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    // Создаем копию для 7 дней позже
    sevenDaysLater.setHours(23, 59, 59, 999); // Конец дня через 7 дней

    if (taskSearch) {
      return this.taskModel.find({
        title: { $regex: search, $options: 'i' },
      });
    }

    if (dashboard) {
      if (dashboardSearch == 'today') {
        return this.taskModel.find({
          userId,
          dueDate: {
            $gte: today, // Начало сегодняшнего дня
            $lt: nextDay, // Начало следующего дня
          },
        });
      }

      if (dashboardSearch == 'seven') {
        return this.taskModel.find({
          userId,
          dueDate: {
            $gte: today, // Сегодня
            $lt: sevenDaysLater, // Через 7 дней
          },
        });
      }

      if (dashboardSearch == 'inbox') {
        return this.taskModel.find({
          userId,
          categoryId: null,
        });
      }

      if (dashboardSearch == 'completed') {
        return this.taskModel.find({
          userId,
          status: 'completed',
        });
      }
    }

    if (category && categorySearch) {
      const category = await this.categoryModel.findOne({ name: categorySearch }).exec();
      if (!category) {
        throw new NotFoundException(`Category with name "${categorySearch}" not found`);
      }

      return this.taskModel.find({
        userId,
        categoryId: category._id,
      });
    }


    return this.taskModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById({ _id: id }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, userId }, updateTaskDto, { new: true })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(
        `Task with ID ${id} not found for user ${userId}`,
      );
    }
    return updatedTask;
  }

  async remove(id: string, userId: string): Promise<string> {
    const result = await this.taskModel
      .findOneAndDelete({ _id: id, userId })
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Task with ID ${id} not found for user ${userId}`,
      );
    } else {
      return 'Task was removed successfully!';
    }
  }
}
