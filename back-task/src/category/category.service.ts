import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    const categoryName = createCategoryDto.name;
    const existingCategory = await this.categoryModel
      .findOne({ name: categoryName, userId })
      .exec();

    if (existingCategory) {
      return { message: `Category with name ${categoryName} already exists.` };
    }

    const category = new this.categoryModel({ ...createCategoryDto, userId });
    return category.save();
  }

  findAll(userId: string) {
    return this.categoryModel.find({userId});
  }

  async findOne(id: string, userId: string) {
    return this.categoryModel.findById({ _id: id , userId: userId });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string,
  ) {
    const updatedCategory = await this.categoryModel
      .findOneAndUpdate({ _id: id, userId }, updateCategoryDto, { new: true })
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException(
        `Category with ID ${id} not found for user ${userId}`,
      );
    }
    return updatedCategory;
  }

  async remove(id: string, userId: string) {
    const result = await this.categoryModel
      .findOneAndDelete({ _id: id, userId })
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Category with ID ${id} not found for user ${userId}`,
      );
    } else {
      return 'Category was removed successfully!';
    }
  }
}
