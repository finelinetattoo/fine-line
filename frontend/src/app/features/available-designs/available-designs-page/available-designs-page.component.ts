import { Component } from '@angular/core';
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';
import { AvailableDesignsPageData } from './available-designs-page.config';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';

@Component({
  selector: 'app-available-designs-page',
  imports: [CardGridComponent, ParallaxSectionComponent],
  templateUrl: './available-designs-page.component.html',
  styleUrl: './available-designs-page.component.scss',
})
export class AvailableDesignsPageComponent {
  availabeDesignsData = AvailableDesignsPageData;
}
