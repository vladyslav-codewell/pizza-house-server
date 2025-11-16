
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  image: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupedProduct' }] })
  category_group_products: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  category_products: Types.ObjectId[];

}


export const CategorySchema = SchemaFactory.createForClass(Category);