import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    LogoComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isCollapsed = false;
  urlIconWeb = 'favicon.ico';
  private authService = inject(AuthService);
  logout(): void {
    this.authService.logout();
  }
}
