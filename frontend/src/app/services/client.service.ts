import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = environment.endpoint;
  private readonly API = `${this.baseUrl}clients`;

  private http = inject(HttpClient);

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.API}/${id}`);
  }

  createClient(client: Partial<Client>): Observable<Client> {
    return this.http.post<Client>(this.API, client);
  }

  updateClient(id: number, client: Partial<Client>): Observable<Client> {
    return this.http.patch<Client>(`${this.API}/${id}`, client);
  }

  deleteClient(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`);
  }
}
