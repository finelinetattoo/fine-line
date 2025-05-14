import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Availability } from 'src/appointment-request/enums/availability.enum';

export class CreateAppointmentRequestDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsBoolean()
  is_adult: boolean;

  @IsBoolean()
  is_first_time: boolean;

  @IsOptional()
  @IsString()
  medical_conditions?: string;

  @IsOptional()
  @MaxLength(100)
  instagram_handle?: string;

  @IsNotEmpty()
  tattoo_description: string;

  @IsNotEmpty()
  body_part: string;

  @IsNotEmpty()
  size_height_cm: number;

  @IsNotEmpty()
  size_width_cm: number;

  @IsNotEmpty()
  image_1_url: string;

  @IsNotEmpty()
  image_2_url: string;

  @IsNotEmpty()
  image_3_url: string;

  @IsEnum(Availability)
  availability: Availability;

  @IsOptional()
  additional_comments?: string;
}
