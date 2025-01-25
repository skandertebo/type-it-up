import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'lib-linechart',
  standalone: true,
  imports: [],
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Accuracy',
            data: [10, 20, 15, 25, 30, 35],
            borderColor: '#35547B',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(102, 139, 252)',
            yAxisID: 'y1',
          },
          {
            label: 'WPM',
            data: [50, 25, 20, 30, 25, 40],
            borderColor: '#96104B',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            yAxisID: 'y2',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#ffffff',
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: 'Accuracy & WPM Over Time',
            color: '#ffffff',
            font: {
              size: 30,
            },
          },
          tooltip: {
            backgroundColor: '#2b2627',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            titleFont: {
              size: 17,
            },
            bodyFont: {
              size: 15,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 15,
              },
            },
            grid: {
              color: '#ffffff',
            },
          },
          y1: {
            type: 'linear',
            position: 'left',
            ticks: {
              color: '#ffffff',
              font: {
                size: 15,
              },
            },
            grid: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Accuracy (%)',
              color: '#ffffff',
              font: {
                size: 14,
              },
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            ticks: {
              color: '#ffffff',
              font: {
                size: 15,
              },
            },
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: 'WPM',
              color: '#ffffff',
              font: {
                size: 14,
              },
            },
          },
        },
        devicePixelRatio: 2,
      },
    });
  }
}
