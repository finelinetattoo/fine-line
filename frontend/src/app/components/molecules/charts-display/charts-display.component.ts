import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts-display',
  imports: [BaseChartDirective],
  templateUrl: './charts-display.component.html',
  styleUrl: './charts-display.component.scss',
})
export class ChartsDisplayComponent implements AfterViewInit, OnChanges {
  @Input() type: ChartType = 'bar';
  @Input() data: ChartConfiguration['data'] = { labels: [], datasets: [] };
  @Input() options?: ChartConfiguration['options'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private viewInitialized = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewInitialized) return;
    this.updateChart();
  }

  updateChart(): void {
    if (!this.chart?.chart) return;
    this.chart.chart.data = this.data;
    this.chart.update();
  }
}
