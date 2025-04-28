import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TattooFormModalComponent } from './tattoo-form-modal.component';

describe('TattooFormModalComponent', () => {
  let component: TattooFormModalComponent;
  let fixture: ComponentFixture<TattooFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TattooFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TattooFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
