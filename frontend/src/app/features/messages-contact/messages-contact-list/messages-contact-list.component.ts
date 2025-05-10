import { Component, inject } from '@angular/core';
import { DashboardListComponent } from '../../dashboard/dashboard-list/dashboard-list.component';
import { ContactMessage } from '../../../core/interfaces/contact-message';
import { ContactMessageService } from '../messages-contact-service/messages-contact.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-messages-contact-list',
  imports: [DashboardListComponent, NzModalModule],
  templateUrl: './messages-contact-list.component.html',
  styleUrl: './messages-contact-list.component.scss',
})
export class MessagesContactListComponent {
  private service = inject(ContactMessageService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  messages: ContactMessage[] = [];
  filteredMessages: ContactMessage[] = [];
  loading = true;
  sortKey: keyof ContactMessage | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.messages = res;
        this.filteredMessages = [...res];
        this.sortKey = 'createdAt';
        this.sortDirection = 'desc';
        this.applySorting();
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  deleteMessage(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Eliminar mensaje?',
      nzOkDanger: true,
      nzOnOk: () => {
        this.service.delete(id).subscribe(() => {
          this.messages = this.messages.filter((m) => m.id !== id);
          this.filteredMessages = [...this.messages];
          this.notificationService.success('Eliminado', 'Mensaje eliminado.');
        });
      },
    });
  }

  toggleRead(message: ContactMessage): void {
    const updated = { isRead: !message.isRead };
    this.service.update(message.id, updated).subscribe(() => {
      message.isRead = updated.isRead;
      this.notificationService.success(
        'Estado actualizado',
        updated.isRead ? 'Marcado como leído' : 'Marcado como no leído'
      );
    });
  }

  searchMessage(term: string): void {
    const lower = term.toLowerCase();
    this.filteredMessages = this.messages.filter(
      (message) =>
        message.name.toLowerCase().includes(lower) ||
        message.email.toLowerCase().includes(lower)
    );
  }

  resetFilters(): void {
    this.filteredMessages = [...this.messages];
  }

  sortMessages(key: keyof ContactMessage): void {
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

    this.filteredMessages = [...this.filteredMessages].sort((a, b) => {
      const aVal = a[this.sortKey!];
      const bVal = b[this.sortKey!];
      return this.sortDirection === 'asc'
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }
}
