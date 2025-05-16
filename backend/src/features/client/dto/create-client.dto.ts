import { IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsOptional()
  @IsInt({ message: 'age must be an integer' })
  @Min(0, { message: 'age must be a positive number' })
  age?: number;
}
