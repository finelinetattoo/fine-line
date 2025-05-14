import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client } from './../entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async create(client: Partial<Client>): Promise<Client> {
    try {
      const newClient = this.clientRepository.create(client);
      return await this.clientRepository.save(newClient);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to create client: ${error.message}`,
        );
      }
      throw new BadRequestException('Unknown error while creating client');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    await this.clientRepository.delete(id);
    return { message: `Client with ID ${id} successfully deleted` };
  }

  async update(id: number, updateDto: Partial<Client>): Promise<Client> {
    const client = await this.findOne(id);

    Object.assign(client, updateDto);
    return this.clientRepository.save(client);
  }
}
