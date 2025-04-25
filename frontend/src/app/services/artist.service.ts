import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../interfaces/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly baseUrl = environment.endpoint;
  private readonly API = `${this.baseUrl}artists`;

  private http = inject(HttpClient);

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.API);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.API}/${id}`);
  }

  createArtist(artist: Partial<Artist>): Observable<Artist> {
    return this.http.post<Artist>(this.API, artist);
  }

  updateArtist(id: number, artist: Partial<Artist>): Observable<Artist> {
    return this.http.patch<Artist>(`${this.API}/${id}`, artist);
  }

  deleteArtist(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`);
  }
}
