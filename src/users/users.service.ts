import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async timeKeeping(user: any){
    const currentDate = new Date();
    const timeSheetCurrent = await this.prisma.timeSheet.findFirst({
      where: {
        workDate: {
          gte: startOfDay(currentDate),
          lte: endOfDay(currentDate),
        },
        userId: user.id
      }
    });
  
    if (timeSheetCurrent) {
      return this.checkOut(timeSheetCurrent, currentDate)
    } else {
      return this.checkIn(currentDate, user.id)
    }
  }

  async checkIn(currentDate: Date, userId: number) {
    return this.prisma.timeSheet.create({
      data: {
        workDate: currentDate,
        startTime: currentDate,
        userId: userId
      }
    });
  }

  async checkOut(timeSheetCurrent: any, currentDate: Date){
    await this.prisma.timeSheet.update({
      where: { id: timeSheetCurrent.id },
      data: { endTime: currentDate }
    });

    return timeSheetCurrent;
  }
}
