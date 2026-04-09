import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ example: 'john@pizza.com', description: 'Unique user email' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
=======

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email address of the user',
  })
  @Prop({ required: true, unique: true })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  email: string;

  @Exclude() // never expose in API responses
  @Prop({ required: true })
  password: string; // Password is not exposed in Swagger by default for security
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
