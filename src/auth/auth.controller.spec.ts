import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token when login is successful', async () => {
      const user = { name: 'test', email: 'test@example.com', id: 1 };
      const accessToken = 'mock-access-token';
      const info = { name: user.name, email: user.email, id: user.id };
      const responseInfo = {
        access_token: accessToken,
        info,
      };
      jest.spyOn(authService, 'login').mockResolvedValue(responseInfo);
      const result = await controller.login(user);
      expect(result).toEqual(responseInfo);
    });
  });

  describe('register', () => {
    it('should return created user when registration is successful', async () => {
      const signUpDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        dateOfBirth: '1990-01-01',
      };
      const createdUser = {
        id: 13,
        email: 'test@example.com',
        name: 'test',
        password: 'password',
        dateOfBirth: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(authService, 'register').mockResolvedValue(createdUser);
      const result = await controller.register(signUpDto);
      expect(result).toEqual(createdUser);
    });
  });
});
