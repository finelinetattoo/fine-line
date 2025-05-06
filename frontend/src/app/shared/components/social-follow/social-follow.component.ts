import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-follow',
  imports: [CommonModule],
  templateUrl: './social-follow.component.html',
  styleUrl: './social-follow.component.scss',
})
export class SocialFollowComponent {
  @Input() backgroundClass = '';
}
