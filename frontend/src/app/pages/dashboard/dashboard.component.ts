import { Component } from '@angular/core';
import { ClientListComponent } from '../../components/organisms/client-list/client-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [ClientListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
