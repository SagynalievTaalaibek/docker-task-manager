import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
