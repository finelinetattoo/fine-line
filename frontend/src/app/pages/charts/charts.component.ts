import { Component, inject, OnInit } from '@angular/core';
import { ChartsDisplayComponent } from '../../components/molecules/charts-display/charts-display.component';
import { ChartOptions } from 'chart.js';
import { TattooService } from '../../services/api/tattoo.service';
import { Tattoo } from '../../interfaces/tattoo';
import { firstValueFrom } from 'rxjs';
import { Dataset } from '../../interfaces/dataset';

@Component({
  selector: 'app-charts',
  imports: [ChartsDisplayComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  private tattooService = inject(TattooService);

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

  readonly corporateColors = [
    '#373737',
    '#737373',
    '#FF6B6B',
    '#4ECDC4',
    '#FFD93D',
    '#1A535C',
    '#FF9F1C',
    '#2EC4B6',
    '#5C4D7D',
    '#A1C181',
    '#E63946',
    '#6A4C93',
  ];

  barChartData = {
    labels: [] as string[],
    datasets: [] as Dataset[],
  };

  doughnutChartData = {
    labels: [] as string[],
    datasets: [] as Dataset[],
  };

  readonly commonOptions: ChartOptions = {
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
  };

  readonly barChartOptions: ChartOptions = {
    ...this.commonOptions,
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

  readonly doughnutChartOptions: ChartOptions = this.commonOptions;

  async ngOnInit() {
    const tattoos = await firstValueFrom(this.tattooService.getAll());
    if (tattoos) {
      this.prepareBarChart(tattoos);
      this.prepareDoughnutChart(tattoos);
    }
  }

  prepareBarChart(tattoos: Tattoo[]): void {
    const counts: { [month: number]: number } = {};

    tattoos.forEach((t) => {
      const date = new Date(t.date);
      const month = date.getUTCMonth();
      counts[month] = (counts[month] || 0) + 1;
    });

    this.barChartData = {
      labels: [...this.labels],
      datasets: [
        {
          label: 'Tatuajes por mes',
          data: Array.from({ length: 12 }, (_, i) => counts[i] || 0),
          backgroundColor: this.corporateColors,
          borderColor: this.corporateColors,
          borderWidth: 1,
        },
      ],
    };
  }

  prepareDoughnutChart(tattoos: Tattoo[]): void {
    const counts: { [part: string]: number } = {};

    tattoos.forEach((tattoo) => {
      const part = tattoo.body_part || 'Desconocido';
      counts[part] = (counts[part] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    this.doughnutChartData = {
      labels,
      datasets: [
        {
          label: 'Tatuajes por parte del cuerpo',
          data,
          backgroundColor: labels.map(
            (_, i) => this.corporateColors[i % this.corporateColors.length]
          ),
          borderColor: ['#ffffff'],
          borderWidth: 1,
        },
      ],
    };
  }
}
