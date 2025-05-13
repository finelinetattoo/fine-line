export interface ChartBlock {
  title: string;
  type: 'bar' | 'doughnut' | 'polarArea' | 'line';
  dataKey:
    | 'barChartData'
    | 'doughnutChartData'
    | 'polarAreaChartData'
    | 'lineChartData';
  optionsKey:
    | 'barChartOptions'
    | 'doughnutChartOptions'
    | 'polarAreaChartOptions'
    | 'lineChartOptions';
}
