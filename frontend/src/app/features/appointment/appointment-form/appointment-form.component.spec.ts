import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentFormComponent } from './appointment-form.component';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { of } from 'rxjs';
import { AppointmentRequestService } from '../appointment-service/appointment-request.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { UploadCloudinaryService } from '../appointment-service/upload-cloudinary.service';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;

  const mockAppointmentService = {
    create: jasmine.createSpy().and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AppointmentFormComponent],
      providers: [
        {
          provide: AppointmentRequestService,
          useValue: mockAppointmentService,
        },
        {
          provide: NotificationService,
          useValue: { success: () => {}, error: () => {} },
        },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
        { provide: UploadCloudinaryService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit the form and call appointmentService.create with the correct data', () => {
    component.form.patchValue({
      name: 'Juan',
      surname: 'Pérez',
      email: 'juan@mail.com',
      phone: '666777888',
      is_adult: true,
      is_first_time: false,
      instagram_handle: '@juan_tattoo',
      tattoo_description: 'Un tigre en el brazo',
      body_part: 'Brazo derecho',
      size_height_cm: 15,
      size_width_cm: 10,
      image_1_url: 'http://img1.jpg',
      image_2_url: 'http://img2.jpg',
      image_3_url: 'http://img3.jpg',
      availability: 'morning',
      additional_comments: 'Estoy disponible después de las 10h.',
    });

    const conditionsArray = component.form.get(
      'medical_conditions'
    ) as FormArray;
    conditionsArray.push(component['fb'].control('Diabetes'));
    conditionsArray.push(component['fb'].control('Hemofilia'));

    const expectedPayload = {
      ...component.form.value,
      medical_conditions: 'Diabetes, Hemofilia',
    };

    component.onSubmit();

    expect(mockAppointmentService.create).toHaveBeenCalledOnceWith(
      expectedPayload
    );
  });
});
