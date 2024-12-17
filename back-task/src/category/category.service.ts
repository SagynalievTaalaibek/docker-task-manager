import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private taskModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.taskModel(createCategoryDto);
    return category.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.taskModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
