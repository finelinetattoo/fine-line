import { Component } from '@angular/core';
import { ClientsComponent } from '../client/clients-page/clients-page.component';

@Component({
  selector: 'app-dashboard',
  imports: [ClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
