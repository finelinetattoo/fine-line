import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-section',
  imports: [],
  templateUrl: './map-section.component.html',
  styleUrl: './map-section.component.scss',
})
export class MapSectionComponent implements OnInit {
  @Input() mapSrc: string = '';
  @Input() title: string = 'Dónde estamos';

  safeMapSrc: SafeResourceUrl = '';

  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.safeMapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.mapSrc
    );
  }
}
