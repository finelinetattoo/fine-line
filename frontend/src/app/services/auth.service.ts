import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.endpoint;
  private readonly API = `${this.baseUrl}auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.API}/login`, credentials)
      .pipe(
        tap((response) => {
          this.storageService.setItem('token', response.access_token);
        })
      );
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('username');
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  getUsername(): string | null {
    return this.storageService.getItem('username');
  }

  setUsername(username: string): void {
    this.storageService.setItem('username', username);
  }
}
