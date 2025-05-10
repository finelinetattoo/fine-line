import { Component, inject, OnInit } from '@angular/core';
import { ChartsDisplayComponent } from '../charts-display/charts-display.component';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { TattooService } from '../../tattoos/tattoos-service/tattoo.service';
import { Tattoo } from '../../../core/interfaces/tattoo';
import { firstValueFrom } from 'rxjs';
import { Dataset } from '../../../core/interfaces/dataset';
import { BodyPart, BodyPartLabels } from '../../../core/enums/body-part.enum';
import { capitalize } from '../../../shared/utils/capitalize.util';
import {
  TattooStyle,
  TattooStyleLabels,
} from '../../../core/enums/tattoo-style.enum';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
@Component({
  selector: 'app-charts-page',
  imports: [ChartsDisplayComponent, LoaderComponent],
  templateUrl: './charts-page.component.html',
  styleUrl: './charts-page.component.scss',
})
export class ChartsPageComponent implements OnInit {
  private tattooService = inject(TattooService);
  loading = true;

  readonly labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'May',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
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

  polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [],
  };

  lineChartData: ChartData<'line'> = { labels: this.labels, datasets: [] };

  readonly commonOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
    plugins: {
      ...this.commonOptions.plugins,
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

  readonly doughnutChartOptions: ChartOptions = {
    ...this.commonOptions,
    plugins: {
      ...this.commonOptions.plugins,
      legend: {
        ...this.commonOptions.plugins?.legend,
        labels: {
          ...this.commonOptions.plugins?.legend?.labels,
          generateLabels: (chart) => {
            const defaultLabels =
              Chart.defaults.plugins.legend.labels.generateLabels(chart);
            return defaultLabels.map((label) => ({
              ...label,
              fillStyle: 'transparent',
              strokeStyle: 'transparent',
              pointStyle: undefined,
            }));
          },
        },
      },
    },
  };

  readonly polarAreaChartOptions: ChartOptions = { ...this.commonOptions };
  readonly lineChartOptions: ChartOptions = {
    ...this.commonOptions,
    plugins: {
      ...this.commonOptions.plugins,
      legend: {
        display: true,
        labels: {
          color: '#555',
          font: { size: 14, weight: 'bold' },
        },
      },
    },
  };

  async ngOnInit() {
    this.loading = true;
    const tattoos = await firstValueFrom(this.tattooService.getAll());
    if (tattoos) {
      this.prepareBarChart(tattoos);
      this.prepareDoughnutChart(tattoos);
      this.preparePolarAreaChart(tattoos);
      this.prepareLineChart(tattoos);
    }
    this.loading = false;
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
      const partKey = tattoo.body_part?.toUpperCase() ?? 'UNKNOWN';
      const isValidKey = Object.values(BodyPart).includes(partKey as BodyPart);

      const translatedLabel = isValidKey
        ? BodyPartLabels[partKey as BodyPart]
        : capitalize(partKey.toLowerCase());

      counts[translatedLabel] = (counts[translatedLabel] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    this.doughnutChartData = {
      labels,
      datasets: [
        {
          label: 'Tatuajes por zona del cuerpo',
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

  preparePolarAreaChart(tattoos: Tattoo[]): void {
    const counts: Record<string, number> = {};

    tattoos.forEach((tattoo) => {
      const styleKey = tattoo.style?.toUpperCase() ?? 'UNKNOWN';
      const isValidKey = Object.values(TattooStyle).includes(
        styleKey as TattooStyle
      );
      const translatedLabel = isValidKey
        ? TattooStyleLabels[styleKey as TattooStyle]
        : capitalize(styleKey.toLowerCase());
      counts[translatedLabel] = (counts[translatedLabel] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    this.polarAreaChartData = {
      labels,
      datasets: [
        {
          label: 'Estilos de tatuaje',
          data,
          backgroundColor: labels.map(
            (_, i) => this.corporateColors[i % this.corporateColors.length]
          ),
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    };
  }

  prepareLineChart(tattoos: Tattoo[]): void {
    const yearMap: Record<number, number[]> = {};
    tattoos.forEach((t) => {
      const date = new Date(t.date);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      if (!yearMap[year]) yearMap[year] = Array(12).fill(0);
      yearMap[year][month]++;
    });

    const colorMap: Record<string, string> = {
      '2024': '#FF9F1C',
      '2025': '#E63946',
      '2026': '#4ECDC4',
      '2027': '#6A4C93',
      '2028': '#1A535C',
    };

    const years = Object.keys(yearMap).sort();
    const datasets = years.map((year) => {
      const color = colorMap[year] || '#999999';
      return {
        label: `Tatuajes en ${year}`,
        data: yearMap[+year],
        fill: false,
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        tension: 0.3,
      };
    });
    this.lineChartData = {
      labels: [...this.labels],
      datasets,
    };
  }
}
