import { Component } from '@angular/core';
import { ClientsPageComponent } from '../../clients/clients-page/clients-page.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [ClientsPageComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
