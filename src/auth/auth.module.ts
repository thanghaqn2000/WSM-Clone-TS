import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JsonWebTokenStrategy } from './stragegies/jwt.strategy';
import { LocalStrategy } from './stragegies/local.strategy';

@Module({
  imports: [PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: "secret",
      signOptions: {
        expiresIn: '1 hour'
      },
    })
   ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JsonWebTokenStrategy]
})
export class AuthModule {}
