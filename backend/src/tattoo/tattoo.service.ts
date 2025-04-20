import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tattoo } from './tattoo.entity';
import { CreateTattooDto } from './dto/create-tattoo.dto';
import { UpdateTattooDto } from './dto/update-tattoo.dto';
import { Client } from '../client/client.entity';
import { Artist } from '../artist/artist.entity';

@Injectable()
export class TattooService {
  constructor(
    @InjectRepository(Tattoo)
    private readonly tattooRepository: Repository<Tattoo>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Tattoo[]> {
    return this.tattooRepository.find();
  }

  async findOne(id: number): Promise<Tattoo> {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) {
      throw new NotFoundException(`Tattoo with ID ${id} not found`);
    }
    return tattoo;
  }

  async create(dto: CreateTattooDto): Promise<Tattoo> {
    const client = await this.clientRepository.findOneBy({ id: dto.clientId });
    if (!client) {
      throw new NotFoundException(`Client with ID ${dto.clientId} not found`);
    }

    const artist = await this.artistRepository.findOneBy({ id: dto.artistId });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${dto.artistId} not found`);
    }

    try {
      const tattoo = this.tattooRepository.create({
        ...dto,
        date: new Date(dto.date),
        client,
        artist,
      });

      return await this.tattooRepository.save(tattoo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to create tattoo: ${error.message}`,
        );
      }
      throw new BadRequestException('Failed to create tattoo');
    }
  }

  async update(id: number, dto: UpdateTattooDto): Promise<Tattoo> {
    const tattoo = await this.findOne(id);

    if (dto.clientId) {
      const client = await this.clientRepository.findOneBy({
        id: dto.clientId,
      });
      if (!client)
        throw new NotFoundException(`Client ID ${dto.clientId} not found`);
      tattoo.client = client;
    }

    if (dto.artistId) {
      const artist = await this.artistRepository.findOneBy({
        id: dto.artistId,
      });
      if (!artist)
        throw new NotFoundException(`Artist ID ${dto.artistId} not found`);
      tattoo.artist = artist;
    }

    Object.assign(tattoo, {
      ...dto,
      date: dto.date ? new Date(dto.date) : tattoo.date,
    });

    return this.tattooRepository.save(tattoo);
  }

  async remove(id: number): Promise<{ message: string }> {
    const tattoo = await this.findOne(id);
    if (!tattoo) {
      throw new NotFoundException(`Tattoo with ID ${id} not found`);
    }
    await this.tattooRepository.delete(id);
    return { message: `Tattoo with ID ${id} successfully deleted` };
  }
}
