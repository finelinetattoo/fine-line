import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CalendarEventModalComponent } from './calendar-event-modal/calendar-event-modal.component';
import { BodyPart, BodyPartLabels } from '../../../enums/body-part.enum';
import { TattooSize, TattooSizeLabels } from '../../../enums/tattoo-size.enum';
import {
  TattooStyle,
  TattooStyleLabels,
} from '../../../enums/tattoo-style.enum';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-display',
  imports: [FullCalendarModule, NzModalModule],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.scss',
})
export class CalendarDisplayComponent implements OnChanges {
  @Input() events: any[] = [];
  private modal = inject(NzModalService);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    displayEventTime: false,
    eventClick: this.onEventClick.bind(this),
    eventDisplay: 'block',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events,
      };
    }
  }

  onEventClick(info: any) {
    const event = info.event;
    const { title, extendedProps, start } = event;
    const rawStyle = extendedProps.style;
    const style = TattooStyleLabels[rawStyle as TattooStyle] || 'Sin estilo';
    const price = extendedProps.price || 'Sin precio';
    const artist = extendedProps.artist || 'Sin artista';
    const rawBodyPart = extendedProps.bodyPart;
    const body_part =
      BodyPartLabels[rawBodyPart as BodyPart] || 'Sin parte del cuerpo';
    const notes = extendedProps.notes || 'Sin notas';
    const rawSize = extendedProps.size;
    const size = TattooSizeLabels[rawSize as TattooSize] || 'Sin tamaño';

    this.modal.create({
      nzTitle: 'Detalles del tatuaje',
      nzContent: CalendarEventModalComponent,
      nzData: {
        clientName: title,
        style,
        date: start,
        price,
        artist,
        body_part,
        notes,
        size,
      },
      nzFooter: null,
      nzCentered: true,
    });
  }
}
