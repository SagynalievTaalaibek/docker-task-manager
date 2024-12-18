import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return this.usersService.sendOtp(email);
  }

  @Post('compare-otp')
  async compareOtp(@Body() body: { email: string; otp: string }) {
    return this.usersService.compareOtp(body.email, body.otp);
  }

  @Post('change-password')
  async changePassword(@Body() body: { email: string; password: string }) {
    return this.usersService.changePassword(body.email, body.password);
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return {
      message: 'Correct',
      user: req.user,
    };
  }

  @Delete('sessions')
  logout(@Req() req: Request) {
    return this.usersService.logout(req);
  }
}
