import { Component, inject } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ArtistService } from '../artist-services/artist.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Artist } from '../../../core/interfaces/artist';
import { ArtistFormModalComponent } from '../artists-form-modal/artist-form-modal.component';
import { DashboardListComponent } from '../../dashboard/dashboard-list/dashboard-list.component';

@Component({
  selector: 'app-artist-list',
  imports: [DashboardListComponent, NzModalModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss',
})
export class ArtistListComponent {
  private artistService = inject(ArtistService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  artists: Artist[] = [];
  filteredArtists: Artist[] = [];
  loading = true;
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(): void {
    this.loading = true;
    this.artistService.getAll().subscribe({
      next: (res) => {
        this.artists = res;
        this.filteredArtists = [...res];
        this.sortKey = 'name';
        this.sortDirection = 'asc';
        this.applySorting();
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
        this.filteredArtists = [...this.artists];
        this.applySorting();
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
      this.filteredArtists = [...this.artists];
      this.applySorting();
    });
  }

  editArtist(artist: Artist): void {
    this.openArtistModal('Editar tatuador', artist, (updatedArtist) => {
      this.artists = this.artists.map((a) =>
        a.id === updatedArtist.id ? updatedArtist : a
      );
      this.filteredArtists = [...this.artists];
      this.applySorting();
    });
  }

  searchArtist(term: string): void {
    const lower = term.toLowerCase();
    this.filteredArtists = this.artists.filter((artist) =>
      artist.name.toLowerCase().includes(lower)
    );
  }

  resetFilters(): void {
    this.filteredArtists = [...this.artists];
  }

  sortArtists(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  applySorting(): void {
    if (!this.sortKey || !this.sortDirection) {
      return;
    }

    this.filteredArtists = [...this.filteredArtists].sort((a: any, b: any) => {
      const aValue = a[this.sortKey!];
      const bValue = b[this.sortKey!];

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const compare = aValue.localeCompare(bValue);
        return this.sortDirection === 'asc' ? compare : -compare;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const compare = aValue - bValue;
        return this.sortDirection === 'asc' ? compare : -compare;
      }

      return 0;
    });
  }
}
