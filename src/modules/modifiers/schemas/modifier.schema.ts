import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Modifier extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, min: 0 }) 
    price: number; 

    @Prop()
    weight: string;

    @Prop()
    image: string;
    
    @Prop({ default: true })
    is_active: boolean; 
}

export const ModifierSchema = SchemaFactory.createForClass(Modifier);