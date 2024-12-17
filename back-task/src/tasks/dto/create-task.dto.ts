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
  @IsEnum(['pending', 'in_progress', 'completed'])
  status: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}
