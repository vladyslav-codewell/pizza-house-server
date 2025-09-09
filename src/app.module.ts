import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DevicesModule } from './modules/devices/devices.module';
import { RacksModule } from './modules/racks/racks.module';
import { ServicesModule } from './modules/services/services.module';
import { SystemsModule } from './modules/systems/systems.module';
import { RolesModule } from './modules/roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jeremyfan533:KfE4ZzVc4NzgH@shop-cluster.a03ny.mongodb.net/?retryWrites=true&w=majority&appName=shop-cluster'),
    UsersModule,
    DevicesModule,
    RacksModule,
    ServicesModule,
    SystemsModule,
    RolesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }