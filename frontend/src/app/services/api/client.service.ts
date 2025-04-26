import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../interfaces/client';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends ApiService<Client> {
  constructor() {
    super(inject(HttpClient), 'clients');
  }
}
