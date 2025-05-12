import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsListComponent } from './appointment-requests-list.component';

describe('AppointmentRequestsListComponent', () => {
  let component: AppointmentRequestsListComponent;
  let fixture: ComponentFixture<AppointmentRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
