import { Controller, Post, Body, Request, Get, Query, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/sign_up")
  async sign_up(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post("/sign_in")
  async sign_in(@Body() authUserDto: AuthUserDto) {
    return this.usersService.signIn(authUserDto);
  }

  @Get("/checkin")
  checkIn(@Query('userId', ParseIntPipe) userId: number){
    return this.usersService.checkIn(userId);
  }
}
