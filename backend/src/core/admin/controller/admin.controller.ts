import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return {
      message: 'This is a protected admin dashboard route',
    };
  }

  @Get('clients')
  getClients() {
    return {
      message: 'List of clients (also protected)',
    };
  }
}
