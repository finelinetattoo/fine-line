import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentRequest } from '../entity/appointment-request.entity';
import { CreateAppointmentRequestDto } from '../create-appointment-request/dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from '../update-appointment-request/dto/update-appointment-request.dto';

@Injectable()
export class AppointmentRequestService {
  constructor(
    @InjectRepository(AppointmentRequest)
    private readonly repo: Repository<AppointmentRequest>,
  ) {}

  create(dto: CreateAppointmentRequestDto): Promise<AppointmentRequest> {
    const request = this.repo.create(dto);
    return this.repo.save(request);
  }

  findAll(): Promise<AppointmentRequest[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number): Promise<AppointmentRequest | null> {
    return this.repo.findOneBy({ id });
  }

  update(
    id: number,
    dto: UpdateAppointmentRequestDto,
  ): Promise<AppointmentRequest> {
    return this.repo.findOneBy({ id }).then((existing) => {
      if (!existing) throw new Error('Appointment request not found');
      const updated = this.repo.merge(existing, dto);
      return this.repo.save(updated);
    });
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }
}
