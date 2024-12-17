import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req, Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthenticatedRequest } from '../interface/user.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(TokenAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() request: AuthenticatedRequest) {
    return this.tasksService.create(createTaskDto, request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest, @Query() query: {taskSearch: boolean, search: string}) {
    return this.tasksService.findAll(request.user._id, query.taskSearch, query.search);
  }

  @UseGuards(TokenAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(TokenAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tasksService.update(id, updateTaskDto, request.user._id);
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.tasksService.remove(id, request.user._id);
  }
}
