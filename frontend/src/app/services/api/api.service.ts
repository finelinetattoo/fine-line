import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

export class ApiService<T> {
  protected readonly baseUrl = environment.endpoint;
  protected API = '';
  protected http: HttpClient;
  protected notificationService = inject(NotificationService);

  constructor(http: HttpClient, endpoint: string) {
    this.http = http;
    this.API = `${this.baseUrl}${endpoint}`;
  }

  getAll() {
    return this.http.get<T[]>(this.API).pipe(catchError(this.handleError));
  }

  getOne(id: number) {
    return this.http
      .get<T>(`${this.API}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(item: Partial<T>) {
    return this.http.post<T>(this.API, item).pipe(catchError(this.handleError));
  }

  update(id: number, item: Partial<T>) {
    return this.http
      .patch<T>(`${this.API}/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http
      .delete<{ message: string }>(`${this.API}/${id}`)
      .pipe(catchError(this.handleError));
  }

  protected handleError = (error: any) => {
    const customError = {
      status: error.status,
      message: this.getErrorMessage(error.status),
      originalError: error,
    };

    this.notificationService.error('Error', customError.message);

    return throwError(() => customError);
  };

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Solicitud incorrecta (400).';
      case 401:
        return 'No autorizado (401). Por favor inicia sesión.';
      case 403:
        return 'Acceso prohibido (403).';
      case 404:
        return 'Recurso no encontrado (404).';
      case 500:
        return 'Error interno del servidor (500).';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }
}
