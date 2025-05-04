import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselRatingComponent } from './carousel-rating.component';

describe('CarouselRatingComponent', () => {
  let component: CarouselRatingComponent;
  let fixture: ComponentFixture<CarouselRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
