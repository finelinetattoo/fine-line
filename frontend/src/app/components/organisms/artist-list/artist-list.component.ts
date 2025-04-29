import { Component, inject } from '@angular/core';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ArtistService } from '../../../services/api/artist.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Artist } from '../../../interfaces/artist';
import { ArtistFormModalComponent } from '../artist-form-modal/artist-form-modal.component';

@Component({
  selector: 'app-artist-list',
  imports: [AdminListComponent, NzModalModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss',
})
export class ArtistListComponent {
  private artistService = inject(ArtistService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  artists: Artist[] = [];
  loading = true;

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(): void {
    this.loading = true;
    this.artistService.getAll().subscribe({
      next: (res) => {
        this.artists = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching artists:', err);
        this.loading = false;
      },
    });
  }

  deleteArtist(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este artista?',
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
    this.artistService.delete(id).subscribe({
      next: () => {
        this.artists = this.artists.filter((artist) => artist.id !== id);
        this.notificationService.success(
          'Artista eliminado',
          'El artista se eliminó correctamente.'
        );
        this.loading = false;
      },
      error: () => {
        this.notificationService.error(
          'Error',
          'No se pudo eliminar el artista.'
        );
        this.loading = false;
      },
    });
  }

  private openArtistModal(
    title: string,
    artist?: Artist,
    callback?: (artist: Artist) => void
  ): void {
    const modal = this.modal.create({
      nzTitle: title,
      nzContent: ArtistFormModalComponent,
      nzFooter: null,
      nzWidth: 400,
      nzCentered: true,
      ...(artist ? { nzData: { artist } } : {}),
    });

    modal.afterClose.subscribe((result) => {
      if (result && callback) {
        callback(result);
      }
    });
  }

  createArtist(): void {
    this.openArtistModal('Añadir tatuador', undefined, (newArtist) => {
      this.artists = [...this.artists, newArtist];
    });
  }

  editArtist(artist: Artist): void {
    this.openArtistModal('Editar tatuador', artist, (updatedArtist) => {
      this.artists = this.artists.map((a) =>
        a.id === updatedArtist.id ? updatedArtist : a
      );
    });
  }
}
