import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
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
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isCollapsed = false;
  urlIconWeb = 'favicon.ico';
  private authService = inject(AuthService);
  userName: string | null = null;
  ngOnInit(): void {
    this.userName = this.authService.getUsername();
  }
  logout(): void {
    this.authService.logout();
  }
}
