import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesContactPageComponent } from './messages-contact-page.component';

describe('MessagesContactPageComponent', () => {
  let component: MessagesContactPageComponent;
  let fixture: ComponentFixture<MessagesContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesContactPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
