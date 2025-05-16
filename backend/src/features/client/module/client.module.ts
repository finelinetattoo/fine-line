import { Module } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientController } from '../controller/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entity/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
