import { Module } from '@nestjs/common';
import { ArtistService } from './../services/artist.service';
import { ArtistController } from './../controller/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
