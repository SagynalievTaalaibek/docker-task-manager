import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed'], {
    message: 'Status must be either "pending", "in_progress", or "completed"',
  })
  status?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}
