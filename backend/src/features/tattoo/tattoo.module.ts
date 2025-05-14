import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tattoo } from './tattoo.entity';
import { TattooService } from './tattoo.service';
import { TattooController } from './tattoo.controller';
import { Client } from '../client/client.entity';
import { Artist } from '../artist/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tattoo, Client, Artist])],
  controllers: [TattooController],
  providers: [TattooService],
})
export class TattooModule {}
