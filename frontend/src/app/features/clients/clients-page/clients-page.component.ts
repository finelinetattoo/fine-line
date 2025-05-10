import { Component } from '@angular/core';
import { ClientsListComponent } from '../clients-list/clients-list.component';

@Component({
  selector: 'app-clients-page',
  imports: [ClientsListComponent],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss',
})
export class ClientsPageComponent {}
