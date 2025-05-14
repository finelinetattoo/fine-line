import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { TattooFormModalComponent } from '../tattoo-form-modal/tattoo-form-modal.component';
import { Client } from '../../../core/interfaces/client';
import { Artist } from '../../../core/interfaces/artist';
import { Tattoo } from '../../../core/interfaces/tattoo';
import { firstValueFrom, forkJoin } from 'rxjs';
import { TattooService } from '../../tattoos/tattoos-service/tattoo.service';
import { ArtistService } from '../../artists/artist-services/artist.service';
import { ClientService } from '../../clients/clients-service/client.service';
import { DashboardListComponent } from '../../dashboard/dashboard-list/dashboard-list.component';

@Component({
  selector: 'app-tattoo-list',
  imports: [NzModalModule, DashboardListComponent],
  templateUrl: './tattoo-list.component.html',
  styleUrl: './tattoo-list.component.scss',
})
export class TattooListComponent {
  private tattooService = inject(TattooService);
  private artistsService = inject(ArtistService);
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  tattoos: Tattoo[] = [];
  clients: Client[] = [];
  artists: Artist[] = [];
  filteredTattoos: Tattoo[] = [];
  loading = true;
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    forkJoin({
      tattoos: this.tattooService.getAll(),
      artists: this.artistsService.getAll(),
      clients: this.clientService.getAll(),
    }).subscribe({
      next: ({ tattoos, artists, clients }) => {
        this.artists = artists;
        this.clients = clients;
        this.tattoos = tattoos.map((tattoo: any) => ({
          ...tattoo,
          clientName: tattoo.client?.name || 'Desconocido',
          artistName: tattoo.artist?.name || 'Desconocido',
        }));
        this.filteredTattoos = [...this.tattoos];
        this.sortKey = 'date';
        this.sortDirection = 'desc';
        this.applySorting();
        this.loading = false;
      },
      error: (err) => {
        this.notificationService.error(
          'Error',
          'No se pudieron cargar los tatuajes.'
        );
        console.error('Error loading data:', err);
        this.loading = false;
      },
    });
  }

  deleteTattoo(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este tatuaje?',
      nzContent: 'Esta acción no se puede deshacer.',
      nzOkText: 'Sí, eliminar',
      nzOkDanger: true,
      nzCancelText: 'Cancelar',
      nzCentered: true,
      nzOnOk: () => this.confirmDelete(id),
    });
  }

  private confirmDelete(id: number): void {
    this.loading = true;
    this.tattooService.delete(id).subscribe({
      next: () => {
        this.tattoos = this.tattoos.filter((tattoo) => tattoo.id !== id);
        this.filteredTattoos = [...this.tattoos];
        this.applySorting();
        this.notificationService.success(
          'Tatuaje eliminado',
          'El tatuaje se eliminó correctamente.'
        );
        this.loading = false;
      },
      error: () => {
        this.notificationService.error(
          'Error',
          'No se pudo eliminar el tatuaje.'
        );
        this.loading = false;
      },
    });
  }

  private openTattooModal(
    title: string,
    tattoo?: Tattoo,
    callback?: (tattoo: Tattoo) => void
  ): void {
    const cleanTattoo = tattoo
      ? {
          id: tattoo.id,
          client_id: tattoo.client?.id ?? tattoo.client_id,
          artist_id: tattoo.artist?.id ?? tattoo.artist_id,
          size: tattoo.size,
          price: tattoo.price,
          date: tattoo.date,
          body_part: tattoo.body_part,
          style: tattoo.style,
          notes: tattoo.notes,
        }
      : undefined;

    const modal = this.modal.create({
      nzTitle: title,
      nzContent: TattooFormModalComponent,
      nzFooter: null,
      nzWidth: 400,
      nzCentered: true,
      nzData: {
        ...(cleanTattoo ? { tattoo: cleanTattoo } : {}),
        clients: this.clients,
        artists: this.artists,
      },
    });

    modal.afterClose.subscribe((result) => {
      if (result && callback) {
        callback(result);
      }
    });
  }

  createTattoo(): void {
    this.openTattooModal('Añadir tatuaje', undefined, (newTattoo) => {
      const client = this.clients.find((c) => c.id === newTattoo.client_id);
      const artist = this.artists.find((a) => a.id === newTattoo.artist_id);

      const formattedTattoo = {
        ...newTattoo,
        clientName: client ? client.name : 'Desconocido',
        artistName: artist ? artist.name : 'Desconocido',
      };

      this.tattoos = [...this.tattoos, formattedTattoo];
      this.filteredTattoos = [...this.tattoos];
      this.applySorting();
    });
  }

  editTattoo(tattoo: Tattoo): void {
    this.openTattooModal('Editar tatuaje', tattoo, (updatedTattoo: any) => {
      const client = this.clients.find(
        (c) => c.id === (updatedTattoo.client_id ?? updatedTattoo.client_id)
      );
      const artist = this.artists.find(
        (a) => a.id === (updatedTattoo.artist_id ?? updatedTattoo.artist_id)
      );

      this.tattoos = this.tattoos.map((t) =>
        t.id === updatedTattoo.id
          ? {
              ...updatedTattoo,
              clientName: client ? client.name : 'Desconocido',
              artistName: artist ? artist.name : 'Desconocido',
            }
          : t
      );
      this.filteredTattoos = [...this.tattoos];
      this.applySorting();
    });
  }

  searchTattoo(term: string): void {
    const lower = term.toLowerCase();
    this.filteredTattoos = this.tattoos.filter(
      (tattoo: any) =>
        tattoo.clientName.toLowerCase().includes(lower) ||
        tattoo.artistName.toLowerCase().includes(lower) ||
        tattoo.style.toLowerCase().includes(lower)
    );
  }

  resetFilters(): void {
    this.filteredTattoos = [...this.tattoos];
  }

  sortTattoos(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    if (!this.sortKey || !this.sortDirection) return;

    this.filteredTattoos = [...this.filteredTattoos].sort((a: any, b: any) => {
      const aValue = a[this.sortKey!];
      const bValue = b[this.sortKey!];

      if (aValue == null || bValue == null) return 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const compare = aValue.localeCompare(bValue);
        return this.sortDirection === 'asc' ? compare : -compare;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const compare = aValue - bValue;
        return this.sortDirection === 'asc' ? compare : -compare;
      }

      if (this.sortKey === 'date') {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        const compare = dateA - dateB;
        return this.sortDirection === 'asc' ? compare : -compare;
      }

      return 0;
    });
  }
}
