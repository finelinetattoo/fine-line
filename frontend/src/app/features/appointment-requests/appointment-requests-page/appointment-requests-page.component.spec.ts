import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsPageComponent } from './appointment-requests-page.component';

describe('AppointmentRequestsPageComponent', () => {
  let component: AppointmentRequestsPageComponent;
  let fixture: ComponentFixture<AppointmentRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentRequestsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
