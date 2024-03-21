import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async sign_up(createUserDto: CreateUserDto) {
    const {name, password, email, dateOfBirth} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({data: {name, password: hashedPassword, email, dateOfBirth}})
  }

  async sign_in(authUserDto: AuthUserDto){
    const {email, password} = authUserDto;
    const user = await this.prisma.user.findUnique({where:{
      email: email
    }})
    if(user && (await bcrypt.compare(password, user.password))){
      const payload: JWTPayload = {email}
      const accessToken: string = await this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException("Please check ur information login again!")
    }
  }
}
