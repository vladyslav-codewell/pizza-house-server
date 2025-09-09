import { Module } from '@nestjs/common';
import { RacksController } from './racks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rack, RackSchema } from './schemas/rack.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rack.name, schema: RackSchema }])],
  controllers: [RacksController]
})
export class RacksModule {}
