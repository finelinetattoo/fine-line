import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);

  success(title: string, message: string): void {
    this.toastr.success(title, message);
  }

  error(title: string, message: string): void {
    this.toastr.error(title, message);
  }

  info(title: string, message: string): void {
    this.toastr.info(title, message);
  }

  warning(title: string, message: string): void {
    this.toastr.warning(title, message);
  }
}
