import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../shared/services/api/api.service';
import { AppointmentRequest } from '../../../core/interfaces/appointment-request';

@Injectable({
  providedIn: 'root',
})
export class AppointmentRequestService extends ApiService<AppointmentRequest> {
  constructor() {
    super(inject(HttpClient), 'appointment-requests');
  }
}
