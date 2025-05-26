import { Component, inject, OnInit } from '@angular/core';
import { MessagesContactListComponent } from '../messages-contact-list/messages-contact-list.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-messages-contact-page',
  imports: [MessagesContactListComponent],
  templateUrl: './messages-contact-page.component.html',
  styleUrl: './messages-contact-page.component.scss',
})
export class MessagesContactPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Mensajes de contacto | Admin | Fine Line Tattoo',
      description:
        'Listado interno de mensajes de contacto recibidos en el estudio.',
      url: 'https://www.finelinetattoostudio.com/admin/mensajes-contacto',
      indexFollow: false,
    });
  }
}
