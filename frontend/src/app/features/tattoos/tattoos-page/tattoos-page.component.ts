import { Component } from '@angular/core';
import { TattooListComponent } from '../tattoo-list/tattoo-list.component';

@Component({
  selector: 'app-tattoos-page',
  imports: [TattooListComponent],
  templateUrl: './tattoos-page.component.html',
  styleUrl: './tattoos-page.component.scss',
})
export class TattoosPageComponent {}
