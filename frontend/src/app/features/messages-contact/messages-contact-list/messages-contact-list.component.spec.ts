import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesContactListComponent } from './messages-contact-list.component';

describe('MessagesContactListComponent', () => {
  let component: MessagesContactListComponent;
  let fixture: ComponentFixture<MessagesContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
