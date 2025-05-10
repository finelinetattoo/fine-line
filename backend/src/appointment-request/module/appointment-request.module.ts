import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRequest } from '../entity/appointment-request.entity';
import { AppointmentRequestController } from '../controller/appointment-request.controller';
import { AppointmentRequestService } from '../services/appointment-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRequest])],
  controllers: [AppointmentRequestController],
  providers: [AppointmentRequestService],
})
export class AppointmentRequestModule {}
