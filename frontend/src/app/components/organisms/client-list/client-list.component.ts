import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ClientService } from '../../../services/api/client.service';
import { Client } from '../../../interfaces/client';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, NzTableModule, LoaderComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  private clientService = inject(ClientService);

  clients: Client[] = [];
  loading = true;

  ngOnInit(): void {
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
}
