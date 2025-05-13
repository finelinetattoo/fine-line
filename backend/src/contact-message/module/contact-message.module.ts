import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from '../entity/contact-message.entity';
import { ContactMessageService } from '../services/contact-message.service';
import { ContactMessageController } from '../controller/contact-message.controller';
import { EmailService } from 'src/shared/services/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage])],
  providers: [ContactMessageService, EmailService],
  controllers: [ContactMessageController],
})
export class ContactMessageModule {}
