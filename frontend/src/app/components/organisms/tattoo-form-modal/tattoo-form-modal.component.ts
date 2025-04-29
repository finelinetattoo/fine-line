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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TattooService } from '../../../services/api/tattoo.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { TattooSize } from '../../../enums/tattoo-size.enum';
import { BodyPart } from '../../../enums/body-part.enum';
import { Client } from '../../../interfaces/client';
import { Artist } from '../../../interfaces/artist';
import {
  TattooStyle,
  TattooStyleLabels,
} from '../../../enums/tattoo-style.enum';

@Component({
  selector: 'app-tattoo-form-modal',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
  ],
  templateUrl: './tattoo-form-modal.component.html',
  styleUrl: './tattoo-form-modal.component.scss',
})
export class TattooFormModalComponent implements OnInit {
  private modalRef = inject(NzModalRef<TattooFormModalComponent>);
  private fb = inject(FormBuilder);
  private tattooService = inject(TattooService);
  private notificationService = inject(NotificationService);

  @Input() tattoo?: {
    id: number;
    client_id: number;
    artist_id: number;
    size: TattooSize;
    price: number;
    date: string;
    body_part: BodyPart;
    style: string;
    notes?: string;
  };
  @Input() clients: Client[] = [];
  @Input() artists: Artist[] = [];

  form: FormGroup = this.fb.group({
    client_id: ['', [Validators.required]],
    artist_id: ['', [Validators.required]],
    size: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    date: ['', [Validators.required]],
    body_part: ['', [Validators.required]],
    style: ['', [Validators.required]],
    notes: [''],
  });

  loading = false;

  bodyParts = Object.values(BodyPart);
  tattooSizes = Object.values(TattooSize);
  tattooStyles = Object.values(TattooStyle);
  tattooStyleLabels = TattooStyleLabels;

  ngOnInit(): void {
    const modalData = this.modalRef.getConfig().nzData;

    if (modalData?.clients) {
      this.clients = modalData.clients;
    }

    if (modalData?.artists) {
      this.artists = modalData.artists;
    }

    if (modalData?.tattoo) {
      const { tattoo } = modalData;
      this.tattoo = {
        id: tattoo.id,
        client_id: tattoo.client_id ?? tattoo.client?.id,
        artist_id: tattoo.artist_id ?? tattoo.artist?.id,
        size: tattoo.size,
        price: tattoo.price,
        date: tattoo.date ? tattoo.date.split('T')[0] : '',
        body_part: tattoo.body_part,
        style: tattoo.style,
        notes: tattoo.notes,
      };
      this.form.patchValue(this.tattoo);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const tattooData = { ...this.form.value };

    if (tattooData.date) {
      tattooData.date = new Date(tattooData.date).toISOString();
    }

    const formattedTattooData = {
      client_id: Number(tattooData.client_id),
      artist_id: Number(tattooData.artist_id),
      size: tattooData.size,
      price: Number(tattooData.price),
      date: tattooData.date,
      body_part: tattooData.body_part,
      style: tattooData.style,
      notes: tattooData.notes,
    };

    if (this.tattoo) {
      this.tattooService.update(this.tattoo.id, formattedTattooData).subscribe({
        next: (updatedTattoo) => {
          this.notificationService.success(
            'Tatuaje actualizado',
            'El tatuaje se actualizó correctamente.'
          );
          this.modalRef.close(updatedTattoo);
          this.loading = false;
        },
        error: () => {
          this.notificationService.error(
            'Error',
            'Hubo un problema al actualizar el tatuaje.'
          );
          this.loading = false;
        },
      });
    } else {
      this.tattooService.create(formattedTattooData).subscribe({
        next: (createdTattoo) => {
          this.notificationService.success(
            'Tatuaje creado',
            'El tatuaje ha sido creado correctamente.'
          );
          this.modalRef.close({
            ...createdTattoo,
            client_id: createdTattoo.client!.id,
            artist_id: createdTattoo.artist!.id,
          });
          this.loading = false;
        },
        error: () => {
          this.notificationService.error(
            'Error',
            'Hubo un problema al crear el tatuaje.'
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
