import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entity/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async create(data: CreateArtistDto): Promise<Artist> {
    try {
      const newArtist = this.artistRepository.create(data);
      return await this.artistRepository.save(newArtist);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to create artist: ${error.message}`,
        );
      }
      throw new BadRequestException('Unknown error while creating artist');
    }
  }

  async update(id: number, data: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    Object.assign(artist, data);
    return this.artistRepository.save(artist);
  }

  async remove(id: number): Promise<{ message: string }> {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.artistRepository.delete(id);
    return { message: `Artist with ID ${id} successfully deleted` };
  }
}
