import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClientService } from '../../../services/api/client.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-client-form-modal',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.scss',
})
export class ClientFormModalComponent implements OnInit {
  private modalRef = inject(NzModalRef<ClientFormModalComponent>);
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);
  @Input() client?: {
    id: number;
    name: string;
    age: number;
    createdAt: string;
  };

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(1)]],
  });

  loading = false;

  ngOnInit(): void {
    const modalData = this.modalRef.getConfig().nzData as { client?: any };

    if (modalData?.client) {
      this.client = modalData.client;
      this.form.patchValue({
        name: this.client!.name,
        age: this.client!.age,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const clientData = this.form.value;

      if (this.client) {
        this.clientService.update(this.client.id, clientData).subscribe({
          next: (updatedClient) => {
            this.notificationService.success(
              'Cliente actualizado',
              'El cliente se actualizó correctamente.'
            );
            this.modalRef.close(updatedClient);
            this.loading = false;
          },
          error: () => {
            this.notificationService.error(
              'Error',
              'Hubo un problema al actualizar el cliente.'
            );
            this.loading = false;
          },
        });
      } else {
        this.clientService.create(clientData).subscribe({
          next: (createdClient) => {
            this.notificationService.success(
              'Cliente creado',
              'El cliente ha sido creado correctamente.'
            );
            this.modalRef.close(createdClient);
            this.loading = false;
          },
          error: () => {
            this.notificationService.error(
              'Error',
              'Hubo un problema al crear el cliente.'
            );
            this.loading = false;
          },
        });
      }
    }
  }

  cancel(): void {
    this.modalRef.destroy();
  }
}
