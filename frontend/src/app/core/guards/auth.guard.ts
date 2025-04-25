import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const token = storageService.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
