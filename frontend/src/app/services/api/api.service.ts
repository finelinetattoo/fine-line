import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export class ApiService<T> {
  protected readonly baseUrl = environment.endpoint;
  protected API = '';
  protected http: HttpClient;

  constructor(http: HttpClient, endpoint: string) {
    this.http = http;
    this.API = `${this.baseUrl}${endpoint}`;
  }

  getAll() {
    return this.http.get<T[]>(this.API);
  }

  getOne(id: number) {
    return this.http.get<T>(`${this.API}/${id}`);
  }

  create(item: Partial<T>) {
    return this.http.post<T>(this.API, item);
  }

  update(id: number, item: Partial<T>) {
    return this.http.patch<T>(`${this.API}/${id}`, item);
  }

  delete(id: number) {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`);
  }
}
