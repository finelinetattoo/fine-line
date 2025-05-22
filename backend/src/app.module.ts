import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './features/client/module/client.module';
import { ArtistModule } from './features/artist/module/artist.module';
import { TattooModule } from './features/tattoo/module/tattoo.module';
import { AuthModule } from './core/auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './core/admin/controller/admin.controller';
import { ContactMessageModule } from './features/contact-message/module/contact-message.module';
import { AppointmentRequestModule } from './features/appointment-request/module/appointment-request.module';
import { EmailService } from './shared/services/email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:
        process.env.DB_HOST ||
        (() => {
          throw new Error('DB_HOST is missing');
        })(),
      port: parseInt(
        process.env.DB_PORT ||
          (() => {
            throw new Error('DB_PORT is missing');
          })(),
        10,
      ),
      username:
        process.env.DB_USER ||
        (() => {
          throw new Error('DB_USER is missing');
        })(),
      password:
        process.env.DB_PASSWORD ||
        (() => {
          throw new Error('DB_PASSWORD is missing');
        })(),
      database:
        process.env.DB_NAME ||
        (() => {
          throw new Error('DB_NAME is missing');
        })(),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
