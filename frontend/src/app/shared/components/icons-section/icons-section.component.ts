import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons-section',
  imports: [],
  templateUrl: './icons-section.component.html',
  styleUrl: './icons-section.component.scss',
})
export class IconsSectionComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() textLink: string = '';
}
