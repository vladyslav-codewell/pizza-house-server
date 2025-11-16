
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Схема для зображення
@Schema({ _id: false })
class Image {
  @Prop()
  large: string;

  @Prop()
  medium: string;

  @Prop()
  small: string;
}

const ImageSchema = SchemaFactory.createForClass(Image);

// Основна схема продукту
@Schema()
export class Product extends Document {

  @Prop({ required: true, index: true }) // Додано індекс для швидкого пошуку за ціною
  price: number;

  @Prop()
  weight: string; // Наприклад: "350 г", "30 см"

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  unit: string;


  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;


  @Prop({ type: ImageSchema })
  image: Image;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupModifier' }] })
  group_modifiers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  well_together_products: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  group: Types.ObjectId[];

  @Prop({ default: 1 }) // Статус активності, за замовчуванням активний
  is_active: number; // 1 - активний, 0 - неактивний
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Додаткові індекси, якщо потрібно
ProductSchema.index({ title: 1 }); // Індекс для пошуку за назвою

export type ProductDocument = Product & Document