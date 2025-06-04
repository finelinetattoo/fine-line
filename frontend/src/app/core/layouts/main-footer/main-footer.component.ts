import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-main-footer',
  imports: [CommonModule, RouterModule, LogoComponent, ButtonComponent],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss',
})
export class MainFooterComponent {
  footerData = {
    contact: {
      title: 'Contacto',
      address: 'Calle montecorto 2 Badajoz, Los Santos de Maimona',
      email: 'tattoostudiofineline@gmail.com',
      phone: '+34674055837',
      contactLink: '/contacto',
      addressUrl: 'https://maps.app.goo.gl/XVkBcER8389CgkKj8',
    },
    nav: {
      title: 'Fine Line',
      links: [
        { label: 'Nuestro Estudio', path: '/estudio' },
        { label: 'Reserva tu cita', path: '/reserva-cita' },
        { label: 'Trabajos realizados', path: '/portafolio' },
        { label: 'Diseños disponibles', path: '/disponibles' },
        { label: 'Recomendaciones', path: '/recomendaciones' },
      ],
    },
    social: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=100072263010956#',
        icon: 'assets/icons/facebook-section.webp',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/fineline__studiotattoo/',
        icon: 'assets/icons/instagram-section.webp',
      },
    ],
    buttonLabel: 'Contáctanos',
    buttonLink: '/contacto',
  };

  get sanitizedPhone(): string {
    return this.footerData.contact.phone.replace(/[\s()-]/g, '');
  }
}
