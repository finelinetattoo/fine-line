import { Component, inject } from '@angular/core';
import { VideoBannerComponent } from '../../../shared/components/video-banner/video-banner.component';
import { ContactPageData } from './contact-page.config';
import { FormBuilderComponent } from '../../../shared/components/form-builder/form-builder.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-contact-page',
  imports: [VideoBannerComponent, FormBuilderComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  contactData = ContactPageData;
  contactFields = [
    { label: 'Nombre y apellidos', type: 'text', name: 'fullName' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Mensaje', type: 'textarea', name: 'message' },
  ] as const;

  handleSubmit(formData: any): void {
    try {
      this.notificationService.success(
        'Mensaje enviado',
        'Gracias por contactarnos. Te responderemos pronto.'
      );

      // this.router.navigateByUrl('/');
    } catch (err) {
      this.notificationService.error(
        'Error al enviar',
        'Hubo un problema al enviar tu mensaje. Intenta nuevamente.'
      );
    }
  }
}
