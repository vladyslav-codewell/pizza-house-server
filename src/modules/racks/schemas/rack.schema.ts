import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RackDocument = Rack & Document;

@Schema({ timestamps: true })
export class Rack {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 1 })
  totalUnits: number; 

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }], default: [] })
  devices: Types.ObjectId[];
}

export const RackSchema = SchemaFactory.createForClass(Rack);