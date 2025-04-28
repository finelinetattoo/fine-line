import { Component } from '@angular/core';
import { TattooListComponent } from '../../components/organisms/tattoo-list/tattoo-list.component';

@Component({
  selector: 'app-tattoos',
  imports: [TattooListComponent],
  templateUrl: './tattoos.component.html',
  styleUrl: './tattoos.component.scss',
})
export class TattoosComponent {}
