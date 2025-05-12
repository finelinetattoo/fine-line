import { Component } from '@angular/core';
import { AppointmentRequestsListComponent } from '../appointment-requests-list/appointment-requests-list.component';

@Component({
  selector: 'app-appointment-requests-page',
  imports: [AppointmentRequestsListComponent],
  templateUrl: './appointment-requests-page.component.html',
  styleUrl: './appointment-requests-page.component.scss',
})
export class AppointmentRequestsPageComponent {}
