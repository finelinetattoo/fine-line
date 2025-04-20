import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  IsInt,
} from 'class-validator';
import { TattooSize } from '../tattoo.entity';

export class CreateTattooDto {
  @IsInt()
  clientId: number;

  @IsInt()
  artistId: number;

  @IsEnum(TattooSize, {
    message: 'Size must be one of SMALL, MEDIUM, LARGE, XLARGE',
  })
  size: TattooSize;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsDateString({}, { message: 'Date must be a valid ISO string' })
  date: string;

  @IsNotEmpty()
  @IsString()
  bodyPart: string;

  @IsNotEmpty()
  @IsString()
  style: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
