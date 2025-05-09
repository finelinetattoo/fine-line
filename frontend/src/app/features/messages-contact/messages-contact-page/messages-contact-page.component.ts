import { Component } from '@angular/core';
import { MessagesContactListComponent } from '../messages-contact-list/messages-contact-list.component';

@Component({
  selector: 'app-messages-contact-page',
  imports: [MessagesContactListComponent],
  templateUrl: './messages-contact-page.component.html',
  styleUrl: './messages-contact-page.component.scss',
})
export class MessagesContactPageComponent {}
