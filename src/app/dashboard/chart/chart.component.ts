import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import { ChartConfiguration, ChartOptions, } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, Subject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { SocketMessage } from 'src/app/models/socketmessage.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit{
  @ViewChild('myChart', {static: false}) myChart: ElementRef<HTMLCanvasElement>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @Input() chartType: string = '';
  @Input() chartSubj: Subject<SocketMessage<Message>>;
  @Input() width: string;
  @Input() offline: Boolean = false;

  private context: CanvasRenderingContext2D;
  private endGradient: CanvasGradient = null;

  public dataLoading: Boolean = true;

  colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    blue: {
      default: "rgba(47, 40, 173, 1)",
      half: "rgba(47, 40, 173, 0.5)",
      quarter: "rgba(47, 40, 173, 0.25)",
      zero: "rgba(47, 40, 173, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  constructor() {
  }

  ngAfterViewInit(): void {
    if(this.offline == false){
      this.context = this.myChart.nativeElement.getContext('2d'); 
      this.endGradient = this.getGradient();
      this.chartData.datasets[0]['backgroundColor'] = this.endGradient;
      this.chart.update();
  
      if(this.chartType == "CPU"){
        this.chartData.datasets[0].data = [];
        this.chartSubj.subscribe(message => {
          if (this.chartData.datasets[0].data.length >= 100){
            this.chartData.datasets[0].data.shift();
          }
          let data = message.message.cpu.perc;
          let dateString = message.message.when;
          let date = new Date(dateString);
          let dateFormat = format(date, 'HH:mm:ss')
  
  
          this.chartData.datasets[0].data.push({x: dateFormat, y: data});
          this.chart.update()
          this.dataLoading = false;
        })
      }
      if(this.chartType == "MEMORY"){
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[0].label = "MEMORY";
        this.chartSubj.subscribe(message => {
          if (this.chartData.datasets[0].data.length >= 100){
            this.chartData.datasets[0].data.shift();
          }
          let data = message.message.memory.perc;
          let dateString = message.message.when;
          let date = new Date(dateString);
          let dateFormat = format(date, 'HH:mm:ss')
  
  
          this.chartData.datasets[0].data.push({x: dateFormat, y: data});
          this.chart.update()
          this.dataLoading = false;
        })
      }
      if(this.chartType == "DISK"){
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[0].label = "READ";
        this.chartData.datasets.push({
          data: [],
          fill: true,
          label: "WRITE",
          borderColor: this.colors.blue.default,
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0
        })
        this.chartSubj.subscribe(message => {
          if (this.chartData.datasets[0].data.length >= 100){
            this.chartData.datasets[0].data.shift();
          }
          let dataRead = message.message.disk.read;
          let dataWrite = message.message.disk.write;
          let dateString = message.message.when;
          let date = new Date(dateString);
          let dateFormat = format(date, 'HH:mm:ss')
  
  
          this.chartData.datasets[0].data.push({x: dateFormat, y: dataRead});
          this.chartData.datasets[1].data.push({x: dateFormat, y: dataWrite});
          this.chart.update()
          this.dataLoading = false;
        })
      }
    }
  }

  ngOnInit(): void {
    
  }

  public chartData: ChartConfiguration<'line', {x: string, y: number}[]>['data'] = {
    datasets: [
      {
        data: [
        ],
        fill: true,
        label: "CPU",
        borderColor: this.colors.purple.default,
        tension: 0.2,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  }

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        type: 'time',
        time: {
          unit: 'minute',
          parser: 'HH:mm:ss',
          stepSize: 1,
          displayFormats: {
            minute: 'HH:mm:ss'
          }
        },
        /* ticks: {
          padding: 10,
          autoSkip: false,
          maxRotation: 15,
          minRotation: 15

        }, */
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        ticks: {
          padding: 1,
          maxTicksLimit: 63,
          display: true,
        },
      },
    },
  };

  private getGradient(){ 
    let gradient = this.context.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, this.colors.purple.half);
    gradient.addColorStop(0.35, this.colors.purple.quarter);
    gradient.addColorStop(1, this.colors.purple.zero);

    return gradient;
  }

}
