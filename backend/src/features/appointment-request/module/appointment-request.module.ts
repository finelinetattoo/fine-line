import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRequest } from '../entity/appointment-request.entity';
import { AppointmentRequestController } from '../controller/appointment-request.controller';
import { AppointmentRequestService } from '../service/appointment-request.service';
import { EmailService } from 'src/shared/services/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRequest])],
  controllers: [AppointmentRequestController],
  providers: [AppointmentRequestService, EmailService],
})
export class AppointmentRequestModule {}
