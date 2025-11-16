import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Modifier } from './modifier.schema';

@Schema()
export class GroupModifier extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ enum: ['select_one', 'select_many', 'required'], default: 'select_many' })
    type: string;

    @Prop({ default: 0 }) 
    min_quantity: number; 
    
    @Prop({ default: 10 })
    max_quantity: number; 

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Modifier' }] })
    modifiers: Types.ObjectId[];
}

export const GroupModifierSchema = SchemaFactory.createForClass(GroupModifier);