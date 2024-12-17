import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;
