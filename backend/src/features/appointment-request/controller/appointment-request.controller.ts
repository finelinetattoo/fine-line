import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AppointmentRequestService } from '../service/appointment-request.service';
import { UpdateAppointmentRequestDto } from '../dto/update-appointment-request.dto';
import { CreateAppointmentRequestDto } from '../dto/create-appointment-request.dto';

@Controller('appointment-requests')
export class AppointmentRequestController {
  constructor(private readonly service: AppointmentRequestService) {}

  @Post()
  create(@Body() dto: CreateAppointmentRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentRequestDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
