import { Component, inject } from '@angular/core';
import { DashboardListComponent } from '../../dashboard/dashboard-list/dashboard-list.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AppointmentRequestService } from '../../appointment/appointment-service/appointment-request.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { AppointmentRequest } from '../../../core/interfaces/appointment-request';

@Component({
  selector: 'app-appointment-requests-list',
  imports: [DashboardListComponent, NzModalModule],
  templateUrl: './appointment-requests-list.component.html',
  styleUrl: './appointment-requests-list.component.scss',
})
export class AppointmentRequestsListComponent {
  private service = inject(AppointmentRequestService);
  private notificationService = inject(NotificationService);
  private modal = inject(NzModalService);

  appointments: AppointmentRequest[] = [];
  filteredAppointments: AppointmentRequest[] = [];
  loading = true;
  sortKey: keyof AppointmentRequest | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.appointments = res;
        this.filteredAppointments = [...res];
        this.sortKey = 'createdAt';
        this.sortDirection = 'desc';
        this.applySorting();
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  deleteAppointment(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Eliminar cita?',
      nzOkDanger: true,
      nzOnOk: () => {
        this.service.delete(id).subscribe(() => {
          this.appointments = this.appointments.filter((m) => m.id !== id);
          this.filteredAppointments = [...this.appointments];
          this.notificationService.success('Eliminado', 'Cita eliminada.');
        });
      },
    });
  }

  toggleRead(appointment: AppointmentRequest): void {
    const updated = { isRead: !appointment.isRead };
    this.service.update(appointment.id, updated).subscribe(() => {
      appointment.isRead = updated.isRead;
      this.notificationService.success(
        'Estado actualizado',
        updated.isRead ? 'Marcado como leído' : 'Marcado como no leído'
      );
    });
  }

  searchAppointment(term: string): void {
    const lower = term.toLowerCase();
    this.filteredAppointments = this.appointments.filter(
      (appointment) =>
        appointment.name.toLowerCase().includes(lower) ||
        appointment.email.toLowerCase().includes(lower) ||
        appointment.surname.toLowerCase().includes(lower)
    );
  }

  resetFilters(): void {
    this.filteredAppointments = [...this.appointments];
  }

  sortAppointments(key: keyof AppointmentRequest): void {
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

    this.filteredAppointments = [...this.filteredAppointments].sort((a, b) => {
      const aVal = a[this.sortKey!] ?? '';
      const bVal = b[this.sortKey!] ?? '';
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
