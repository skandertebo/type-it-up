import { DailyStats } from '@/frontend/type-it-up-graphql';
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'lib-linechart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  @Input() dailyStats: DailyStats[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dailyStats'] && changes['dailyStats'].currentValue) {
      this.ngZone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.destroy(); 
        }
        this.createChart();
      });
    }
  }

  createChart(): void {
    const processedData = this.processDailyStats();

    this.chart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: processedData.dates,
        datasets: [
          {
            label: 'Accuracy',
            data: processedData.accuracy,
            borderColor: '#35547B',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(102, 139, 252)',
            yAxisID: 'y1',
          },
          {
            label: 'WPM',
            data: processedData.wpm,
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
                size: 20,
                family: 'Iceland',
              },
            },
          },
          title: {
            display: true,
            text: 'Accuracy & WPM Over Time',
            color: '#ffffff',
            font: {
              size: 40,
              family: 'Iceland',
            },
          },
          tooltip: {
            backgroundColor: '#2b2627',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            titleFont: {
              size: 17,
              family: 'Iceland',
            },
            bodyFont: {
              size: 17,
              family: 'Iceland',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 17,
                family: 'Iceland',
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
                size: 17,
                family: 'Iceland',
              },
            },
            min: 0,
            grid: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Accuracy (%)',
              color: '#ffffff',
              font: {
                size: 20,
                family: 'Iceland',
              },
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            ticks: {
              color: '#ffffff',
              font: {
                size: 17,
                family: 'Iceland',
              },
            },
            min: 0,
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: 'WPM',
              color: '#ffffff',
              font: {
                size: 20,
                family: 'Iceland',
              },
            },
          },
        },
        devicePixelRatio: 2,
      },
    });
  }

  processDailyStats() {
    const today = new Date();
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const statsMap = new Map(
      this.dailyStats.map((stat) => [
        new Date(stat.date).toISOString().split('T')[0],
        stat,
      ])
    );

    const accuracy = lastSevenDays.map(
      (date) => statsMap.get(date)?.averageAccuracy || 0
    );
    const wpm = lastSevenDays.map(
      (date) => statsMap.get(date)?.averageWpm || 0
    );

    return {
      dates: lastSevenDays,
      accuracy,
      wpm,
    };
  }
}
