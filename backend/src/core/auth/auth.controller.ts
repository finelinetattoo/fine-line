import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../features/user/entity/user.entity';

type SafeUser = Omit<User, 'password'>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ access_token: string }> {
    const user: SafeUser = await this.authService.validateUser(
      body.username,
      body.password,
    );
    return this.authService.login(user);
  }
}
