import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDisplayComponent } from './charts-display.component';

describe('ChartsDisplayComponent', () => {
  let component: ChartsDisplayComponent;
  let fixture: ComponentFixture<ChartsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
