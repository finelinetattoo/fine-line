import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notification/notification.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TattooService } from '../../../services/api/tattoo.service';
import { Tattoo } from '../../../interfaces/tattoo';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { TattooFormModalComponent } from '../tattoo-form-modal/tattoo-form-modal.component';
import { Client } from '../../../interfaces/client';
import { Artist } from '../../../interfaces/artist';
import { firstValueFrom } from 'rxjs';
import { ArtistService } from '../../../services/api/artist.service';
import { ClientService } from '../../../services/api/client.service';

@Component({
  selector: 'app-tattoo-list',
  imports: [AdminListComponent, NzModalModule],
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
  loading = true;

  clients: Client[] = [];
  artists: Artist[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    try {
      const tattoos = await firstValueFrom(this.tattooService.getAll());
      const artists = await firstValueFrom(this.artistsService.getAll());
      const clients = await firstValueFrom(this.clientService.getAll());

      this.artists = artists;
      this.clients = clients;
      this.tattoos = tattoos.map((tattoo: any) => ({
        ...tattoo,
        clientName: tattoo.client?.name || 'Desconocido',
        artistName: tattoo.artist?.name || 'Desconocido',
      }));
    } catch (error) {
      this.notificationService.error(
        'Error',
        'No se pudieron cargar los tatuajes.'
      );
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
    }
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
          client_id: tattoo.client_id,
          artist_id: tattoo.artist_id,
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
      this.tattoos = [...this.tattoos, newTattoo];
    });
  }

  editTattoo(tattoo: Tattoo): void {
    this.openTattooModal('Editar tatuaje', tattoo, (updatedTattoo: any) => {
      const client = this.clients.find(
        (c) => c.id === (updatedTattoo.client_id ?? updatedTattoo.clientId)
      );
      const artist = this.artists.find(
        (a) => a.id === (updatedTattoo.artist_id ?? updatedTattoo.artistId)
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
    });
  }
}
