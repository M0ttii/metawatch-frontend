import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ChartConfiguration, ChartOptions, } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit{

  @ViewChild('myChart', {static: false}) myChart: ElementRef<HTMLCanvasElement>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private context: CanvasRenderingContext2D;
  private endGradient: CanvasGradient = null;
  colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  constructor() {
  }

  private getGradient(){ 
    let gradient = this.context.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, this.colors.purple.half);
    gradient.addColorStop(0.35, this.colors.purple.quarter);
    gradient.addColorStop(1, this.colors.purple.zero);

    return gradient;
  }

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Test',
      'Test1',
      'Test2',
      'Test3'
    ],
    datasets: [
      {
        data: [60, 58, 61.4, 62],
        fill: true,
        pointBackgroundColor: this.colors.purple.default,
        borderColor: this.colors.purple.default,
        tension: 0.2,
        borderWidth: 2,
        pointRadius: 3
      }
    ]
  }

  ngAfterViewInit(): void {
    this.context = this.myChart.nativeElement.getContext('2d'); 
    this.endGradient = this.getGradient();
    this.chartData.datasets[0]['backgroundColor'] = this.endGradient;
    this.chart.update();
  }

  ngOnInit(): void {
    
  }

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10
    },
    scales: {
      x: {
        ticks: {
          padding: 10,
          autoSkip: false,
          maxRotation: 15,
          minRotation: 15

        },
      },
      y: {
        ticks: {
          maxTicksLimit: 63,
          display: true,
        },
      },
    },
  };

}
