import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tattoo } from '../interfaces/tattoo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TattooService {
  private readonly baseUrl = environment.endpoint;
  private readonly API = `${this.baseUrl}tattoos`;

  private http = inject(HttpClient);

  getTattoos(): Observable<Tattoo[]> {
    return this.http.get<Tattoo[]>(this.API);
  }

  getTattoo(id: number): Observable<Tattoo> {
    return this.http.get<Tattoo>(`${this.API}/${id}`);
  }

  createTattoo(tattoo: Partial<Tattoo>): Observable<Tattoo> {
    return this.http.post<Tattoo>(this.API, tattoo);
  }

  updateTattoo(id: number, tattoo: Partial<Tattoo>): Observable<Tattoo> {
    return this.http.patch<Tattoo>(`${this.API}/${id}`, tattoo);
  }

  deleteTattoo(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`);
  }
}
