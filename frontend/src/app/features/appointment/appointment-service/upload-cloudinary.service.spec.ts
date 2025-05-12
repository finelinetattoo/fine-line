import { TestBed } from '@angular/core/testing';

import { UploadCloudinaryService } from './upload-cloudinary.service';

describe('UploadCloudinaryService', () => {
  let service: UploadCloudinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCloudinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
