import { Component } from '@angular/core';
import { ClientsComponent } from '../clients/clients.component';

@Component({
  selector: 'app-dashboard',
  imports: [ClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
