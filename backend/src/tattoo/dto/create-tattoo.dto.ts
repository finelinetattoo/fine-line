import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  IsInt,
} from 'class-validator';
import { TattooSize } from '../enums/tattoo-size.enum';
import { BodyPart } from '../enums/body-part.enum';
import { TattooStyle } from '../enums/tattoo-style.enum';

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

  @IsEnum(BodyPart, { message: 'BodyPart must be a valid body area' })
  bodyPart: BodyPart;

  @IsEnum(TattooStyle, {
    message: 'Style must be a valid tattoo style',
  })
  style: TattooStyle;

  @IsOptional()
  @IsString()
  notes?: string;
}
