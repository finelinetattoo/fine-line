import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  success(title: string, message: string): void {
    if (!this.isBrowser) return;
    this.toastr.success(title, message);
  }

  error(title: string, message: string): void {
    if (!this.isBrowser) return;
    this.toastr.error(title, message);
  }

  info(title: string, message: string): void {
    if (!this.isBrowser) return;
    this.toastr.info(title, message);
  }

  warning(title: string, message: string): void {
    if (!this.isBrowser) return;
    this.toastr.warning(title, message);
  }
}
