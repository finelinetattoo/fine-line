import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SeoService } from '../../../seo/seo.service';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private seo = inject(SeoService);
  errorMessage = '';

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Login | Área Administrativa',
      description: 'Inicio de sesión para administradores de Fine Line Tattoo.',
      url: 'https://www.finelinetattoostudio.com/admin/login',
      indexFollow: false,
    });

    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  handleLogin(credentials: { username: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: () => {
        this.authService.setUsername(credentials.username);
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      },
    });
  }
}
