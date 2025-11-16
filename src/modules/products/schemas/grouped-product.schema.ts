import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupedProductDocument = GroupedProduct & Document;

@Schema()
export class GroupedProduct {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category_id: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }]
  })
  products: Types.ObjectId[];

  @Prop({ default: 0 })
  order: number;
}

export const GroupedProductSchema = SchemaFactory.createForClass(GroupedProduct);
