import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartsDisplayComponent } from '../../components/molecules/charts-display/charts-display.component';
import { ChartOptions } from 'chart.js';
import { TattooService } from '../../services/api/tattoo.service';
import { Tattoo } from '../../interfaces/tattoo';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-charts',
  imports: [ChartsDisplayComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  private tattooService = inject(TattooService);
  private cdr = inject(ChangeDetectorRef);
  @ViewChild(ChartsDisplayComponent) chartDisplay?: ChartsDisplayComponent;

  readonly labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  barChartData = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[],
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#555',
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: '#f5f5f5',
        titleColor: '#333',
        bodyColor: '#666',
        titleFont: { weight: 'bold' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#555', font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#555', stepSize: 1 },
        grid: { color: '#eee' },
      },
    },
  };

  async ngOnInit() {
    const tattoos = await firstValueFrom(this.tattooService.getAll());
    if (tattoos) {
      this.prepareChart(tattoos);
    }
  }

  prepareChart(tattoos: Tattoo[]): void {
    const counts: { [month: number]: number } = {};

    tattoos.forEach((t) => {
      const date = new Date(t.date);
      const month = date.getUTCMonth(); // 0-based
      counts[month] = (counts[month] || 0) + 1;
    });

    const data = {
      labels: [...this.labels],
      datasets: [
        {
          label: 'Tatuajes por mes',
          data: Array.from({ length: 12 }, (_, i) => counts[i] || 0),
          backgroundColor: [
            '#e7e2d6',
            '#cbc9c5',
            '#c6bab1',
            '#f0ece2',
            '#dcd9d2',
            '#b3aca5',
            '#d1c7be',
            '#ede9e2',
            '#aaa5a0',
            '#f5f1ea',
            '#8c8680',
            '#e0dad1',
          ],
          borderColor: [
            '#bfbab0',
            '#a3a19e',
            '#9f9189',
            '#c8c5bc',
            '#b4b2ac',
            '#8b857f',
            '#a9a29a',
            '#c5c1b8',
            '#827d78',
            '#cdcbc5',
            '#65605a',
            '#b8b3aa',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.barChartData = data;
    this.cdr.detectChanges();
  }
}
