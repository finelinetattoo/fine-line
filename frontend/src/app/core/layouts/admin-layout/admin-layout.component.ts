import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../auth/auth-service/auth.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    LogoComponent,
    NzDropDownModule,
    NzModalModule,
    CommonModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isCollapsed = false;
  urlIconWeb = 'assets/logo/logo-fine-line.webp';
  private authService = inject(AuthService);
  private modal = inject(NzModalService);
  private router = inject(Router);
  userName: string | null = null;
  isChartsPage = false;
  ngOnInit(): void {
    this.userName = this.authService.getUsername();

    const currentUrl = this.router.url;
    this.isChartsPage = currentUrl.includes('/admin/estadisticas');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isChartsPage = event.url.includes('/admin/estadisticas');
      });
  }
  logout(): void {
    this.authService.logout();
  }
  confirmLogout(): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de cerrar sesión?',
      nzContent: 'Esta acción cerrará tu sesión actual.',
      nzOkText: 'Sí, cerrar sesión',
      nzCancelText: 'Cancelar',
      nzCentered: true,
      nzOkDanger: true,
      nzOnOk: () => this.logout(),
    });
  }
}
