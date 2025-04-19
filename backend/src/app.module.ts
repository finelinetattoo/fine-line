import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // ← pon tu contraseña si tienes una
      database: 'fine_line_tattoo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // ¡Deja en false! Ya tienes las tablas creadas
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
