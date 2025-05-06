import { Component } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-clients-page',
  imports: [ClientListComponent],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss',
})
export class ClientsPageComponent {}
