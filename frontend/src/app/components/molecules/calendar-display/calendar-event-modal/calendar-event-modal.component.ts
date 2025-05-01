import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { capitalize } from '../../../../utils/capitalize.util';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-calendar-event-modal',
  imports: [CommonModule, NzIconModule],
  templateUrl: './calendar-event-modal.component.html',
  styleUrl: './calendar-event-modal.component.scss',
})
export class CalendarEventModalComponent {
  modalData = inject(NZ_MODAL_DATA) as {
    clientName: string;
    style: string;
    date: string;
    price: number | null;
    artist: string | null;
    size: string;
    notes: string | null;
    body_part: string;
  };

  get formattedDate(): string {
    return capitalize(
      new Date(this.modalData.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }
}
