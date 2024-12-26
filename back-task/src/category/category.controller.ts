import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthenticatedRequest } from '../interface/user.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(TokenAuthGuard)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.categoryService.create(createCategoryDto, request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.categoryService.findAll(request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.categoryService.findOne(id, request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.categoryService.update(id, updateCategoryDto, request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.categoryService.remove(id, request.user._id);
  }
}
