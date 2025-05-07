import { Component } from '@angular/core';
import { VideoBannerComponent } from '../../../shared/components/video-banner/video-banner.component';
import { ContactPageData } from './contact-page.config';

@Component({
  selector: 'app-contact-page',
  imports: [VideoBannerComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  contactData = ContactPageData;
}
