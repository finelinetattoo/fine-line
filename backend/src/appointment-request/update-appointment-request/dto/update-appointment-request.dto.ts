import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentRequestDto } from 'src/appointment-request/create-appointment-request/dto/create-appointment-request.dto';

export class UpdateAppointmentRequestDto extends PartialType(
  CreateAppointmentRequestDto,
) {}
