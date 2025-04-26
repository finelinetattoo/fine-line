import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClientService } from '../../../services/api/client.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss'],
})
export class ClientFormModalComponent {
  private modalRef = inject(NzModalRef<ClientFormModalComponent>);
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(1)]],
  });

  loading = false;

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const newClient = this.form.value;

      this.clientService.create(newClient).subscribe({
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

  cancel(): void {
    this.modalRef.destroy();
  }
}
