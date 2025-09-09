import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SystemDocument = System & Document;

@Schema({ timestamps: true })
export class System {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }], default: [] })
  devices: Types.ObjectId[];
}

export const SystemSchema = SchemaFactory.createForClass(System);