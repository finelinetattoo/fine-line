import { TestBed } from '@angular/core/testing';

import { MessagesContactService } from './messages-contact.service';

describe('MessagesContactService', () => {
  let service: MessagesContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
