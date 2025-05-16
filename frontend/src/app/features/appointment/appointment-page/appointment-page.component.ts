import { Component } from '@angular/core';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { appointmentPageData } from './appointment-page.config';

@Component({
  selector: 'app-appointment-page',
  imports: [AppointmentFormComponent],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.scss',
})
export class AppointmentPageComponent {
  appointmentData = appointmentPageData;
}
