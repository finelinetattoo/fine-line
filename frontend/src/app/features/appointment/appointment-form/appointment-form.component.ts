import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentRequestService } from '../appointment-service/appointment-request.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { UploadCloudinaryService } from '../appointment-service/upload-cloudinary.service';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  form!: FormGroup;
  availabilityOptions = [
    { label: 'Mañanas entre semana', value: 'morning' },
    { label: 'Tardes entre semana', value: 'afternoon' },
    { label: 'Fin de semana', value: 'weekend' },
    { label: 'Indiferente', value: 'any' },
  ];
  medicalOptions = [
    'Soriasis',
    'Vitiligo',
    'Hemofilia',
    'Eczema',
    'Diabetes',
    'Cicatricación',
  ];

  private fb = inject(FormBuilder);
  private appointmentService = inject(AppointmentRequestService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private cloudinary = inject(UploadCloudinaryService);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[0-9\s+\-()]+$/),
        ],
      ],
      is_adult: [null, Validators.required],
      is_first_time: [null, Validators.required],
      medical_conditions: this.fb.array([]),
      instagram_handle: [''],
      tattoo_description: ['', Validators.required],
      body_part: ['', Validators.required],
      size_height_cm: [
        null,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      size_width_cm: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      image_1_url: ['', Validators.required],
      image_2_url: ['', Validators.required],
      image_3_url: ['', Validators.required],
      availability: [null, Validators.required],
      additional_comments: [''],
    });
  }

  onCheckboxChange(option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const conditions = this.form.get('medical_conditions') as FormArray;
    if (checked) {
      conditions.push(this.fb.control(option));
    } else {
      const index = conditions.controls.findIndex((x) => x.value === option);
      if (index >= 0) conditions.removeAt(index);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.form.value,
      medical_conditions: this.form.value.medical_conditions.join(', '),
    };

    this.appointmentService.create(formData).subscribe({
      next: () => {
        this.notificationService.success(
          'Solicitud enviada',
          'Gracias por tu solicitud. Te contactaremos pronto.'
        );
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.notificationService.error(
          'Error',
          'Hubo un problema al enviar tu solicitud. Intenta nuevamente.'
        );
      },
    });
  }

  async onFileSelected(event: Event, index: number): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const maxSize = 300 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.notificationService.error(
        'Formato inválido',
        'Solo se permiten imágenes JPG, PNG o WEBP.'
      );
      return;
    }

    if (file.size > maxSize) {
      this.notificationService.error(
        'Imagen demasiado grande',
        'El tamaño máximo es 300KB por imagen.'
      );
      return;
    }

    try {
      const url = await this.cloudinary.uploadImage(file);
      this.form.patchValue({ [`image_${index}_url`]: url });
      this.form.get(`image_${index}_url`)?.markAsTouched();
    } catch {
      this.notificationService.error('Error', 'No se pudo subir la imagen.');
    }
  }
}
