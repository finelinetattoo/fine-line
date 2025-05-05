import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFollowComponent } from './social-follow.component';

describe('SocialFollowComponent', () => {
  let component: SocialFollowComponent;
  let fixture: ComponentFixture<SocialFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialFollowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
