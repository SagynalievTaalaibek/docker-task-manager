import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  priority: string;

  @Prop({
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop()
  dueDate?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name }) // Ссылка на категорию
  categoryId?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true }) // ID пользователя
  userId: mongoose.Schema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = Task & Document;
