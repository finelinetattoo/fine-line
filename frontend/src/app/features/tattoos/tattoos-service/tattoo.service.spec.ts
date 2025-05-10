import { TestBed } from '@angular/core/testing';

import { TattooService } from './tattoo.service';

describe('TattooService', () => {
  let service: TattooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TattooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
