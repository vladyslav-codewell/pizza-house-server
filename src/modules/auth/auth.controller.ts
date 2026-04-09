import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import {
<<<<<<< HEAD
  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody,
=======
  Body,
  Controller,
  Get,
  Post,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
} from '@nestjs/swagger';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

<<<<<<< HEAD
@ApiTags('Auth')
=======
@ApiTags('Authentication')
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
<<<<<<< HEAD
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and receive JWT token' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Returns access_token', schema: { example: { access_token: 'eyJhbGci...' } } })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.email, dto.password);
=======
  @ApiOperation({ summary: 'User login' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  }

  @ApiBearerAuth('JWT-auth')
  @Get('profile')
<<<<<<< HEAD
  @ApiOperation({ summary: 'Get current authenticated user from token' })
  @ApiResponse({ status: 200, description: 'JWT payload of current user' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req: { user: unknown }) {
=======
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req) {
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
    return req.user;
  }
}
