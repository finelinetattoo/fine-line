import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-banner',
  imports: [],
  templateUrl: './video-banner.component.html',
  styleUrl: './video-banner.component.scss',
})
export class VideoBannerComponent {
  @Input() src!: string;
  @Input() type: string = 'video/mp4';
}
