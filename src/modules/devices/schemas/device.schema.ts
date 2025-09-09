import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
    @Prop({ required: true })
    name: string;  // "Dell R740"

    @Prop({ required: true, enum: ['server', 'switch', 'router'] })
    type: string;

    @Prop({ required: true })
    ipAddress: string;

    @Prop({ type: Types.ObjectId, ref: 'Rack' })
    rack: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'System' })
    system: Types.ObjectId;

    // 🔹 Юніти
    @Prop({ required: true, min: 1 })
    unitStart: number;

    @Prop({ required: true, min: 1 })
    unitSize: number;

    // 🔹 Credentials
    @Prop({ type: [Types.ObjectId], ref: 'Credential' })
    credentials: Types.ObjectId[]; // тепер тільки посилання

    // 🔹 Characteristics
    @Prop({
        type: {
            cpu: String,
            ram: String,
            storage: String,
            os: String,
        },
        default: {},
    })
    characteristics: {
        cpu?: string;
        ram?: string;
        storage?: string;
        os?: string;
    };

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Service' }], default: [] })
    services: Types.ObjectId[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);