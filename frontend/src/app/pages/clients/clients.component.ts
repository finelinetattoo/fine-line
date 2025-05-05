import { Component } from '@angular/core';
import { ClientListComponent } from '../../shared/components/organisms/client-list/client-list.component';

@Component({
  selector: 'app-clients',
  imports: [ClientListComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {}
