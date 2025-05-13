import { ChartBlock } from '../../../core/interfaces/chart-block';

export const chartsMonthLabels: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const chartsCorporateColors: string[] = [
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

export const chartsPageData: ChartBlock[] = [
  {
    title: 'Tatuajes por mes',
    type: 'bar',
    dataKey: 'barChartData',
    optionsKey: 'barChartOptions',
  },
  {
    title: 'Tatuajes por zona del cuerpo',
    type: 'doughnut',
    dataKey: 'doughnutChartData',
    optionsKey: 'doughnutChartOptions',
  },
  {
    title: 'Tatuajes por estilo',
    type: 'polarArea',
    dataKey: 'polarAreaChartData',
    optionsKey: 'polarAreaChartOptions',
  },
  {
    title: 'Tatuajes por año',
    type: 'line',
    dataKey: 'lineChartData',
    optionsKey: 'lineChartOptions',
  },
];
