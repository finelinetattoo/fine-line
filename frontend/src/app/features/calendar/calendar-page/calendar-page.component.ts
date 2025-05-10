import { Component, inject } from '@angular/core';
import { CalendarDisplayComponent } from '../calendar-display/calendar-display.component';
import { TattooService } from '../../tattoos/tattoos-service/tattoo.service';
import { firstValueFrom } from 'rxjs';
import { Tattoo } from '../../../core/interfaces/tattoo';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-calendar-page',
  imports: [CalendarDisplayComponent, LoaderComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent {
  private tattooService = inject(TattooService);
  tattooEvents: any[] = [];
  readonly styleColorMap: Record<string, string> = {
    MINIMALIST: '#4ECDC4',
    GEOMETRIC: '#FF9F1C',
    ABSTRACT: '#6A4C93',
    WATERCOLOUR: '#E63946',
    MICROREALISM: '#1A535C',
    DOTWORK: '#A1C181',
    TRIBAL: '#FF6B6B',
  };
  loading = true;

  async ngOnInit() {
    this.loading = true;
    try {
      const tattoos = await firstValueFrom(this.tattooService.getAll());

      this.tattooEvents = tattoos.map((t: Tattoo) => {
        const style = t.style ?? 'UNKNOWN';
        const color = this.styleColorMap[style.toUpperCase()] || '#999';

        return {
          title: t.client!.name,
          date: t.date,
          backgroundColor: color,
          borderColor: color,
          extendedProps: {
            style: t.style ?? 'Sin estilo',
            price: t.price ?? null,
            artist: t.artist?.name ?? 'Sin artista',
            size: t.size ?? 'Sin tamaño',
            notes: t.notes ?? null,
            bodyPart: t.body_part ?? 'Sin parte del cuerpo',
          },
        };
      });
    } catch (error) {
      console.error('Error loading tattoos:', error);
    } finally {
      this.loading = false;
    }
  }
}
