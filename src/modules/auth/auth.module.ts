import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD
import { ConfigModule, ConfigService } from '@nestjs/config';
=======
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
<<<<<<< HEAD
=======
import { jwtConstants } from './constants';
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836

@Module({
  imports: [
    UsersModule,
<<<<<<< HEAD
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
=======
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, // Recommended: 1 day or similar
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
    }),
  ],
  providers: [
    AuthService,
    {
<<<<<<< HEAD
      provide: APP_GUARD,
      useClass: AuthGuard, // global guard — all routes protected by default
=======
      provide: APP_GUARD, // This makes the AuthGuard global for the whole app
      useClass: AuthGuard,
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
