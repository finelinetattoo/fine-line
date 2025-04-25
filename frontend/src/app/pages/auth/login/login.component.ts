import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginFormComponent } from '../../../components/molecules/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = '';

  handleLogin(credentials: { username: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      },
    });
  }
}
