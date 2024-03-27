import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should call checkIn method of UsersService with the correct user', async () => {
    const user = { id: 1, name: 'Test User' };
    const checkInResult = { id: 1, workDate: new Date(), startTime: new Date(), userId: 1 };
    
    jest.spyOn(userService, 'checkIn').mockResolvedValue(checkInResult);

    expect(await controller.checkIn(user)).toEqual(checkInResult);
    expect(userService.checkIn).toHaveBeenCalledWith(user);
  });
});
