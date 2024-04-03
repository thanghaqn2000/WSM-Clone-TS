import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { SignUpDto } from './dto/sign-up.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  
  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  
    const check = user && await bcrypt.compare(password, user.password);
    return check ? user : false;
  }

  async login(user: any) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return { access_token: this.jwtService.sign(payload), info: payload };
  }

  async register(signUpDto: SignUpDto) {
    const {name, password, email, dateOfBirth} = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({data: {name, password: hashedPassword, email, dateOfBirth}})
  }
}
