import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../auth/auth-service/auth.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
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
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isCollapsed = false;
  urlIconWeb = 'favicon.ico';
  private authService = inject(AuthService);
  private modal = inject(NzModalService);
  userName: string | null = null;
  ngOnInit(): void {
    this.userName = this.authService.getUsername();
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
