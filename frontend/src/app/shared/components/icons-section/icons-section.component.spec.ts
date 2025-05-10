import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsSectionComponent } from './icons-section.component';

describe('IconsSectionComponent', () => {
  let component: IconsSectionComponent;
  let fixture: ComponentFixture<IconsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
