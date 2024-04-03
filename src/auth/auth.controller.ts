import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from '../common/get-user.decorator';
import { LocalAuthGuard } from './guards/local.guards';
import { AuthenticationGuard } from './guards/auth.guard';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@GetUser() user): Promise<any> {
    return this.authService.login(user);
  }

  @Post("/register")
  async register(@Body() signInDto: SignUpDto) {
    return this.authService.register(signInDto);
  }
}
