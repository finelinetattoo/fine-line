import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDisplayComponent } from './carousel-display.component';

describe('CarouselDisplayComponent', () => {
  let component: CarouselDisplayComponent;
  let fixture: ComponentFixture<CarouselDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
