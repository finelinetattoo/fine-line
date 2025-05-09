import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactMessage } from '../../../core/interfaces/contact-message';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService extends ApiService<ContactMessage> {
  constructor() {
    super(inject(HttpClient), 'contact-messages');
  }
}
