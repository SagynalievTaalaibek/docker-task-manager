import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, userId });
    return task.save();
  }

  async findAll(userId: string, taskSearch: boolean, search: string): Promise<Task[]> {
    if (taskSearch) {
      return this.taskModel.find({
        title: { $regex: search, $options: 'i' },
      })
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
