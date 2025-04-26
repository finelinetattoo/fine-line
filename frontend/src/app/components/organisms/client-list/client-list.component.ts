import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ClientService } from '../../../services/api/client.service';
import { Client } from '../../../interfaces/client';
import { LoaderComponent } from '../../atoms/loader/loader.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../services/notification/notification.service';
import { ClientFormModalComponent } from '../client-form-modal/client-form-modal.component';

@Component({
  selector: 'app-client-list',
  imports: [
    CommonModule,
    NzTableModule,
    LoaderComponent,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  clients: Client[] = [];
  loading = true;

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: (res) => {
        this.clients = res;
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
      nzOnOk: () => this.confirmDelete(id),
    });
  }

  private confirmDelete(id: number): void {
    this.loading = true;
    this.clientService.delete(id).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== id);
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

  createClient(): void {
    const modal = this.modal.create({
      nzTitle: 'Añadir nuevo cliente',
      nzContent: ClientFormModalComponent,
      nzFooter: null,
      nzWidth: 400,
    });

    modal.afterClose.subscribe((newClient) => {
      if (newClient) {
        this.clients = [...this.clients, newClient];
      }
    });
  }
}
