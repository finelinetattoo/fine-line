import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tattoo } from '../../interfaces/tattoo';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TattooService extends ApiService<Tattoo> {
  constructor() {
    super(inject(HttpClient), 'tattoos');
  }
}
