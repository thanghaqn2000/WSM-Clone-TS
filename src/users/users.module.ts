import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule,
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: "mySecret",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
})
export class UsersModule {}
