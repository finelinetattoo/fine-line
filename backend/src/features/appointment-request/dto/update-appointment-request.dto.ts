import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAppointmentRequestDto {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
