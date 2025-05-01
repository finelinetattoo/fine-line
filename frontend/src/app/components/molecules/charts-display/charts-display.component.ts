import { Component, Input } from '@angular/core';
import { ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts-display',
  imports: [BaseChartDirective],
  templateUrl: './charts-display.component.html',
  styleUrl: './charts-display.component.scss',
})
export class ChartsDisplayComponent {
  @Input() type: ChartType = 'bar';
  @Input() data: ChartConfiguration['data'] = { labels: [], datasets: [] };
  @Input() options?: ChartConfiguration['options'];
}
