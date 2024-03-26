import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signUp(createUserDto: CreateUserDto) {
    const {name, password, email, dateOfBirth} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({data: {name, password: hashedPassword, email, dateOfBirth}})
  }
  async signIn(authUserDto: AuthUserDto){
    const {email, password} = authUserDto;
    const user = await this.prisma.user.findUnique({where:{
      email: email
    }})
    if(user && (await bcrypt.compare(password, user.password))){
      const payload: JWTPayload = {email}
      const accessToken: string = this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException("Please check ur information and login again!")
    }
  }
  async checkIn(userId: number){
    const user = await this.prisma.user.findUnique({where:{
      id: userId
    }})
    const currentDate = new Date()
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);
    if (!user) {
      throw new NotFoundException(`User not found with Id '${userId}'`);
    }
    const timeSheetCurrent = await this.prisma.timeSheet.findFirst({
      where:{
        workDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        userId: userId
      }
    })
    if (!timeSheetCurrent) {
      return await this.prisma.timeSheet.create({
        data: {
          workDate: currentDate,
          startTime: currentDate,
          userId: userId
        }
      });
    }
    return timeSheetCurrent
  }
  checkOut(){
  }
}
