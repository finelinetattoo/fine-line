import { Component } from '@angular/core';
import { ClientListComponent } from '../../components/organisms/client-list/client-list.component';
import { ClientsComponent } from '../clients/clients.component';

@Component({
  selector: 'app-dashboard',
  imports: [ClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
