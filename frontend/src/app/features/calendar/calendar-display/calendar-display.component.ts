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
import { CalendarEventModalComponent } from '../calendar-event-modal/calendar-event-modal.component';
import { BodyPart, BodyPartLabels } from '../../../core/enums/body-part.enum';
import {
  TattooSize,
  TattooSizeLabels,
} from '../../../core/enums/tattoo-size.enum';
import {
  TattooStyle,
  TattooStyleLabels,
} from '../../../core/enums/tattoo-style.enum';
import esLocale from '@fullcalendar/core/locales/es';
import { TattooFormModalComponent } from '../../tattoos/tattoo-form-modal/tattoo-form-modal.component';
import { ClientService } from '../../clients/clients-service/client.service';
import { ArtistService } from '../../artists/artist-services/artist.service';
import { firstValueFrom } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-calendar-display',
  imports: [FullCalendarModule, NzModalModule, NzIconModule],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.scss',
})
export class CalendarDisplayComponent implements OnChanges {
  @Input() events: any[] = [];
  private modal = inject(NzModalService);
  clientService = inject(ClientService);
  artistService = inject(ArtistService);

  readonly styleColorMap: Record<string, string> = {
    MINIMALIST: '#4ECDC4',
    GEOMETRIC: '#FF9F1C',
    ABSTRACT: '#6A4C93',
    WATERCOLOUR: '#E63946',
    MICROREALISM: '#1A535C',
    DOTWORK: '#A1C181',
    TRIBAL: '#FF6B6B',
    UNKNOWN: '#999999',
  };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dayMaxEventRows: true,
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
  async createTattoo(): Promise<void> {
    const [clients, artists] = await Promise.all([
      firstValueFrom(this.clientService.getAll()),
      firstValueFrom(this.artistService.getAll()),
    ]);

    const modalRef = this.modal.create({
      nzTitle: 'Añadir tatuaje',
      nzContent: TattooFormModalComponent,
      nzFooter: null,
      nzWidth: 400,
      nzCentered: true,
      nzData: {
        clients,
        artists,
      },
    });

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        const styleKey = result.style?.toUpperCase() ?? 'UNKNOWN';
        const color = this.styleColorMap[styleKey] || '#999999';

        const newEvent = {
          title: result.client?.name || 'Sin cliente',
          start: result.date,
          backgroundColor: color,
          borderColor: color,
          extendedProps: {
            artist:
              artists.find((a) => a.id === result.artist_id)?.name ||
              'Sin artista',
            style: result.style,
            price: result.price,
            bodyPart: result.body_part,
            notes: result.notes,
            size: result.size,
          },
        };

        this.events = [...this.events, newEvent];
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.events,
        };
      }
    });
  }
}
