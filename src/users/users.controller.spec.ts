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

  describe('timeKeeping', () => {
    describe("when current user doesn't have timesheet of currentDate", () => {
      it('checkin and return timeSheet of current date', async () => {
        const currentUser = { id: 10, name: 'Messi' };
        const checkInResult = {
          id: 1,
          workDate: new Date(),
          startTime: new Date(),
          userId: 10,
        };

        jest.spyOn(userService, 'timeKeeping').mockResolvedValue(checkInResult);

        expect(await controller.timeKeeping(currentUser)).toEqual(checkInResult);
        expect(userService.timeKeeping).toHaveBeenCalledWith(currentUser);
      });
    });

    describe('when current user already have timesheet of currentDate', () => {
      it('checkout and return timeSheet of current date', async () => {
        const currentUser = { id: 10, name: 'Messi' };
        const checkOutResult = {
          id: 1,
          workDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          userId: 10,
        };

        jest.spyOn(userService, 'timeKeeping').mockResolvedValue(checkOutResult);

        expect(await controller.timeKeeping(currentUser)).toEqual(checkOutResult);
        expect(userService.timeKeeping).toHaveBeenCalledWith(currentUser);
      });
    });
  });
});
