import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFormModalComponent } from './artist-form-modal.component';

describe('ArtistFormModalComponent', () => {
  let component: ArtistFormModalComponent;
  let fixture: ComponentFixture<ArtistFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
