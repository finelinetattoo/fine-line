import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from '../entity/contact-message.entity';
import { CreateContactMessageDto } from '../create-contact-message/dto/create-contact-message.dto';
import { UpdateContactMessageDto } from '../update-contact-message/dto/update-contact-message.dto';
import { EmailService } from 'src/shared/services/email/email.service';

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateContactMessageDto): Promise<ContactMessage> {
    const message = this.repo.create(dto);
    const saved = await this.repo.save(message);

    const htmlContent = `
    <h2>Nuevo mensaje de contacto</h2>
    <ul>
      <li><strong>Nombre:</strong> ${saved.name}</li>
      <li><strong>Email:</strong> ${saved.email}</li>
      <li><strong>Mensaje:</strong> ${saved.message}</li>
    </ul>
  `;

    await this.emailService.sendAppointmentNotification(
      'vrviktor@gmail.com',
      `Nuevo mensaje de contacto de ${saved.name}`,
      htmlContent,
    );

    return saved;
  }

  findAll(): Promise<ContactMessage[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
  findOne(id: number): Promise<ContactMessage> {
    return this.repo.findOneByOrFail({ id });
  }

  async update(
    id: number,
    dto: UpdateContactMessageDto,
  ): Promise<ContactMessage> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('Message not found');

    Object.assign(message, dto);
    return this.repo.save(message);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Message not found');
  }
}
