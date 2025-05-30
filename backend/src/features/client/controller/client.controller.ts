import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Client } from '../entity/client.entity';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client | null> {
    return this.clientService.findOne(+id);
  }

  @Post()
  create(@Body() client: CreateClientDto): Promise<Client> {
    return this.clientService.create(client);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.clientService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(+id, updateDto);
  }
}
