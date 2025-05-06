import { Component, inject } from '@angular/core';
import { ClientService } from '../../../../services/api/client.service';
import { Client } from '../../../../interfaces/client';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../../services/notification/notification.service';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { ClientFormModalComponent } from '../client-form-modal/client-form-modal.component';

@Component({
  selector: 'app-client-list',
  imports: [AdminListComponent, NzModalModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  clients: Client[] = [];
  filteredClients: Client[] = [];
  loading = true;
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: (res) => {
        this.clients = res;
        this.filteredClients = [...res];
        this.sortKey = 'name';
        this.sortDirection = 'asc';
        this.applySorting();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.loading = false;
      },
    });
  }

  deleteClient(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este cliente?',
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
    this.clientService.delete(id).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== id);
        this.filteredClients = [...this.clients];
        this.applySorting();
        this.notificationService.success(
          'Cliente eliminado',
          'El cliente se eliminó correctamente.'
        );
        this.loading = false;
      },
      error: () => {
        this.notificationService.error(
          'Error',
          'No se pudo eliminar el cliente.'
        );
        this.loading = false;
      },
    });
  }

  private openClientModal(
    title: string,
    client?: Client,
    callback?: (client: Client) => void
  ): void {
    const modal = this.modal.create({
      nzTitle: title,
      nzContent: ClientFormModalComponent,
      nzFooter: null,
      nzWidth: 400,
      nzCentered: true,
      ...(client ? { nzData: { client } } : {}),
    });

    modal.afterClose.subscribe((result) => {
      if (result && callback) {
        callback(result);
      }
    });
  }

  createClient(): void {
    this.openClientModal('Añadir cliente', undefined, (newClient) => {
      this.clients = [...this.clients, newClient];
      this.filteredClients = [...this.clients];
      this.applySorting();
    });
  }

  editClient(client: Client): void {
    this.openClientModal('Editar cliente', client, (updatedClient) => {
      this.clients = this.clients.map((c) =>
        c.id === updatedClient.id ? updatedClient : c
      );
      this.filteredClients = [...this.clients];
      this.applySorting();
    });
  }

  searchClient(term: string): void {
    const lower = term.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(lower)
    );
  }

  resetFilters(): void {
    this.filteredClients = [...this.clients];
  }

  sortClients(key: string): void {
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

    this.filteredClients = [...this.filteredClients].sort((a: any, b: any) => {
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
