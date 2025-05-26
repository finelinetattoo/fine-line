import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformServer(platformId)) return false;

  const storageService = inject(StorageService);
  const token = storageService.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
