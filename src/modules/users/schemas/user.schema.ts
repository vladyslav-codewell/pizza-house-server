import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email address of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Password is not exposed in Swagger by default for security
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
