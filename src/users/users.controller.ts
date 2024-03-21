import { Controller, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/sign_up")
  async sign_up(@Body() createUserDto: CreateUserDto) {
    return this.usersService.sign_up(createUserDto);
  }

  @Post("/sign_in")
  async sign_in(@Body() authUserDto: AuthUserDto) {
    return this.usersService.sign_in(authUserDto);
  }
}
