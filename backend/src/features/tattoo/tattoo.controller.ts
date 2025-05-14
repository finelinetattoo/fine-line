import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TattooService } from './tattoo.service';
import { CreateTattooDto } from './dto/create-tattoo.dto';
import { UpdateTattooDto } from './dto/update-tattoo.dto';
import { Tattoo } from './tattoo.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tattoos')
export class TattooController {
  constructor(private readonly tattooService: TattooService) {}

  @Get()
  findAll(): Promise<Tattoo[]> {
    return this.tattooService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tattoo> {
    return this.tattooService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateTattooDto): Promise<Tattoo> {
    return this.tattooService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTattooDto,
  ): Promise<Tattoo> {
    return this.tattooService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.tattooService.remove(+id);
  }
}
