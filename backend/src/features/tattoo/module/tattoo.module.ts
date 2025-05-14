import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tattoo } from '../entity/tattoo.entity';
import { TattooService } from '../service/tattoo.service';
import { TattooController } from '../controller/tattoo.controller';
import { Client } from '../../client/entity/client.entity';
import { Artist } from '../../artist/entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tattoo, Client, Artist])],
  controllers: [TattooController],
  providers: [TattooService],
})
export class TattooModule {}
