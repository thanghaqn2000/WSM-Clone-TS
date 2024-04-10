import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/time-keeping')
  @UseGuards(AuthenticationGuard)
  timeKeeping(@GetUser() user): Promise<any> {
    return this.usersService.timeKeeping(user);
  }

  @Get('/get-all')
  @UseGuards(AuthenticationGuard)
  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersService.getAllUser();
    return users.map((user: UserEntity) => new UserEntity(user));
  }
}
