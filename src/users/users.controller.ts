import { Controller, Get, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/common/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/time-keeping")
  @UseGuards(AuthenticationGuard)
  timeKeeping(@GetUser() user){
    return this.usersService.timeKeeping(user);
  }
}
