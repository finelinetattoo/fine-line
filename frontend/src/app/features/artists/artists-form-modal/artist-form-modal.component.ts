import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ArtistService } from '../../../../services/api/artist.service';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-artist-form-modal',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './artist-form-modal.component.html',
  styleUrl: './artist-form-modal.component.scss',
})
export class ArtistFormModalComponent implements OnInit {
  private modalRef = inject(NzModalRef<ArtistFormModalComponent>);
  private fb = inject(FormBuilder);
  private artistService = inject(ArtistService);
  private notificationService = inject(NotificationService);
  @Input() artist?: {
    id: number;
    name: string;
    bio: string;
  };

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    bio: [''],
  });

  loading = false;

  ngOnInit(): void {
    const modalData = this.modalRef.getConfig().nzData as { artist?: any };

    if (modalData?.artist) {
      this.artist = modalData.artist;
      this.form.patchValue({
        name: this.artist!.name,
        bio: this.artist!.bio,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const artistData = this.form.value;

      if (this.artist) {
        this.artistService.update(this.artist.id, artistData).subscribe({
          next: (updatedArtist) => {
            this.notificationService.success(
              'Tatuador actualizado',
              'El tatuador se actualizó correctamente.'
            );
            this.modalRef.close(updatedArtist);
            this.loading = false;
          },
          error: () => {
            this.notificationService.error(
              'Error',
              'Hubo un problema al actualizar el tatuador.'
            );
            this.loading = false;
          },
        });
      } else {
        this.artistService.create(artistData).subscribe({
          next: (createdArtist) => {
            this.notificationService.success(
              'Tatuador creado',
              'El tatuador ha sido creado correctamente.'
            );
            this.modalRef.close(createdArtist);
            this.loading = false;
          },
          error: () => {
            this.notificationService.error(
              'Error',
              'Hubo un problema al crear el tatuador.'
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
