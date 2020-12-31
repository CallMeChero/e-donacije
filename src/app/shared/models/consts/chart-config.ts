import { TranslatePipe } from "@ngx-translate/core";

const primary = localStorage.getItem('primary_color') || '#4466f2';
const secondary = localStorage.getItem('secondary_color') || '#1ea6ec';
//Sale chart
export const chartType = 'line';
export const chartOptions: any = {
  responsive: true,
  animation: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: "#fff",
        drawTicks: true,
        ticks: {
          fontColor: secondary,
          fontSize: 15
        },
      }
    }],
    yAxes: [{
      display: true,
      ticks: {
        beginAtZero: true
      }
    }]
  }
};
export const chartColors: Array<any> = [{
  fill: false,
  borderColor: primary,
  borderWidth: 2.5,
  pointBackgroundColor: primary,
  pointBorderColor: primary
}];
export const chartLegend = false;
