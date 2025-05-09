import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MainNavigationComponent } from '../main-navigation/main-navigation.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { MainFooterComponent } from '../main-footer/main-footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    LogoComponent,
    MainNavigationComponent,
    MobileMenuComponent,
    MainFooterComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isMenuOpen = false;

  links = [
    { label: 'Home', path: '/' },
    { label: 'Estudio', path: '/estudio' },
    { label: 'Contacta', path: '/contacto' },
    { label: 'Reserva tu cita', path: '/reserva' },
    {
      label: 'Portafolio',
      children: [
        { label: 'Trabajos realizados', path: '/trabajos' },
        { label: 'Diseños disponibles', path: '/disenos' },
      ],
    },
    { label: 'Recomendaciones', path: '/recomendaciones' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
