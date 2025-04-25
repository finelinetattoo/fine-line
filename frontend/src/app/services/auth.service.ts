import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.endpoint;
  private readonly API = `${this.baseUrl}auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

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
  }
}
