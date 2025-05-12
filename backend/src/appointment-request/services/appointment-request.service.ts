import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentRequest } from '../entity/appointment-request.entity';
import { CreateAppointmentRequestDto } from '../create-appointment-request/dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from '../update-appointment-request/dto/update-appointment-request.dto';
import { EmailService } from 'src/shared/services/email/email.service';
import { format } from 'date-fns';

@Injectable()
export class AppointmentRequestService {
  constructor(
    @InjectRepository(AppointmentRequest)
    private readonly repo: Repository<AppointmentRequest>,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateAppointmentRequestDto): Promise<AppointmentRequest> {
    const request = this.repo.create(dto);
    const saved = await this.repo.save(request);

    const createdAtDate =
      saved.createdAt instanceof Date
        ? saved.createdAt
        : new Date(saved.createdAt);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const formattedDate: string = format(createdAtDate, 'dd/MM/yyyy HH:mm');

    const htmlContent = `
      <h2>Nueva solicitud de cita</h2>
      <p><strong>Fecha:</strong> ${formattedDate}</p>
      <ul>
        <li><strong>Nombre:</strong> ${saved.name}</li>
        <li><strong>Apellidos:</strong> ${saved.surname}</li>
        <li><strong>Email:</strong> ${saved.email}</li>
        <li><strong>Teléfono:</strong> ${saved.phone}</li>
        <li><strong>Adulto:</strong> ${saved.is_adult ? 'Sí' : 'No'}</li>
        <li><strong>Primera vez:</strong> ${saved.is_first_time ? 'Sí' : 'No'}</li>
        <li><strong>Instagram:</strong> ${saved.instagram_handle || '-'}</li>
        <li><strong>Condiciones médicas:</strong> ${saved.medical_conditions}</li>
        <li><strong>Descripción del tattoo:</strong> ${saved.tattoo_description}</li>
        <li><strong>Parte del cuerpo:</strong> ${saved.body_part}</li>
        <li><strong>Tamaño:</strong> ${saved.size_height_cm}cm x ${saved.size_width_cm}cm</li>
        <li><strong>Disponibilidad:</strong> ${saved.availability}</li>
        <li><strong>Comentarios:</strong> ${saved.additional_comments || '-'}</li>
        <li><strong>Imagen 1:</strong> <a href="${saved.image_1_url}">Ver imagen</a></li>
        <li><strong>Imagen 2:</strong> <a href="${saved.image_2_url}">Ver imagen</a></li>
        <li><strong>Imagen 3:</strong> <a href="${saved.image_3_url}">Ver imagen</a></li>
      </ul>
    `;

    await this.emailService.sendAppointmentNotification(
      'vrviktor@gmail.com',
      `Nueva solicitud de cita de ${saved.name} ${saved.surname}`,
      htmlContent,
    );

    return saved;
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
