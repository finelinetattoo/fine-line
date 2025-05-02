import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { MainNavigationComponent } from '../../components/molecules/main-navigation/main-navigation.component';
import { MobileMenuComponent } from '../../components/molecules/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    LogoComponent,
    MainNavigationComponent,
    MobileMenuComponent,
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
