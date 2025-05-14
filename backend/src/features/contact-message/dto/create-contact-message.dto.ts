import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateContactMessageDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  message: string;
}
