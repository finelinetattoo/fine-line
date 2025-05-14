import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './features/client/client.module';
import { ArtistModule } from './features/artist/artist.module';
import { TattooModule } from './features/tattoo/tattoo.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './core/admin/admin.controller';
import { ContactMessageModule } from './features/contact-message/module/contact-message.module';
import { AppointmentRequestModule } from './features/appointment-request/module/appointment-request.module';
import { EmailService } from './shared/services/email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fine_line_tattoo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ClientModule,
    ArtistModule,
    TattooModule,
    AuthModule,
    ContactMessageModule,
    AppointmentRequestModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, EmailService],
})
export class AppModule {}
