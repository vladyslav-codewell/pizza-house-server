import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ModifiersModule } from './modules/modifiers/modifiers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jeremyfan533:KfE4ZzVc4NzgH@shop-cluster.a03ny.mongodb.net/?retryWrites=true&w=majority&appName=shop-cluster'),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    ModifiersModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    AppService]
})
export class AppModule { }