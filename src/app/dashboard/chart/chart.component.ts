import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import { ChartConfiguration, ChartOptions, } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, formatISO, parseISO, subMinutes } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { Metric } from 'src/app/models/metrics.model';
import { SocketMessage } from 'src/app/models/socketmessage.model';
import { ContainerserviceService } from 'src/app/services/containerservice.service';

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
  @Input() cpu;
  @Input() memory;
  @Input() CID: string;
  @Input() chartOrigin: string;

  public timeSpans: string[] = ["30 m", "1 h", "Live"];
  public expandSpans: boolean = false;

  private context: CanvasRenderingContext2D;
  private endGradient: CanvasGradient = null;

  public dataLoading: BehaviorSubject<Boolean> = new BehaviorSubject(true);


  colors = {
    purple: {
      default: "rgba(71, 87, 227, 1)",
      half: "rgba(71, 87, 227, 0.2)",
      quarter: "rgba(71, 87, 227, 0.1)",
      zero: "rgba(71, 87, 227, 0)"
    },
    purple_backup: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.2)",
      quarter: "rgba(149, 76, 233, 0.1)",
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

  constructor(private containerService: ContainerserviceService) {
  }

  ngAfterViewInit(): void {
    if(this.offline == false){
      if(this.chartOrigin == "dashboard"){
        this.timeSpans = ["Live", "30 m", "1 h"]
      }
      this.context = this.myChart.nativeElement.getContext('2d'); 
      this.endGradient = this.getGradient();
      this.chartData.datasets[0]['backgroundColor'] = this.endGradient;
      this.chart.update();
  
      if(this.chartType == "CPU"){
        /* this.chartData.datasets[0].data = []; */
        this.chartData.datasets[0].data = this.cpu;
        this.chart.update()
        this.dataLoading.next(false);
        this.chartSubj.subscribe(message => {
          if(this.timeSpans[0] == "Live"){
            if (this.chartData.datasets[0].data.length >= 100){
              this.chartData.datasets[0].data.shift();
            }
            let data = message.message.cpu.perc;
            let dateString = message.message.when;
            let date = new Date(dateString);
            let dateFormat = format(date, 'HH:mm:ss')
    
    
            this.chartData.datasets[0].data.push({x: dateFormat, y: data});
            this.chart.update()
            this.dataLoading.next(false);
          }
        })
      }
      if(this.chartType == "MEMORY"){
        this.chartData.datasets[0].data = this.memory;
        this.chart.update()
        this.dataLoading.next(false);
        this.chartData.datasets[0].label = "MEMORY";
        this.chartSubj.subscribe(message => {
          if(this.timeSpans[0] == "Live"){
            if (this.chartData.datasets[0].data.length >= 100){
              this.chartData.datasets[0].data.shift();
            }
            let data = message.message.memory.perc;
            let dateString = message.message.when;
            let date = new Date(dateString);
            let dateFormat = format(date, 'HH:mm:ss')
    
    
            this.chartData.datasets[0].data.push({x: dateFormat, y: data});
            this.chart.update()
            this.dataLoading.next(false);
          }
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
          this.dataLoading.next(false);
        })
      }
      if(this.chartType == "NETWORK"){
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[0].label = "IN";
        this.chartData.datasets.push({
          data: [],
          fill: true,
          label: "OUT",
          borderColor: this.colors.blue.default,
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0
        })
        this.chartSubj.subscribe(message => {
          if (this.chartData.datasets[0].data.length >= 100){
            this.chartData.datasets[0].data.shift();
          }
          if (this.chartData.datasets[1].data.length >= 100){
            this.chartData.datasets[1].data.shift();
          }
          let dataIn = message.message.net.in;
          let dataOut = message.message.net.out;
          let dateString = message.message.when;
          let date = new Date(dateString);
          let dateFormat = format(date, 'HH:mm:ss')
  
  
          this.chartData.datasets[0].data.push({x: dateFormat, y: dataIn});
          this.chartData.datasets[1].data.push({x: dateFormat, y: dataOut});
          this.chart.update()
          this.dataLoading.next(false);
        })
      }
    }
  }

  expand(){
    if(this.chartOrigin != "dashboard"){
      this.expandSpans = !this.expandSpans;
    }
  }

  changeTimeSpan(time: string){
    if (time == "1 h") {
      this.timeSpans = ["1 h", "30 m", "Live"]
      this.expandSpans = !this.expandSpans;
      let toDate = new Date()
      let fromDate = subMinutes(toDate, 60);
      this.containerService.getMetricsFromAPI(this.CID, formatISO(fromDate), formatISO(toDate), 40, true).then(
        (data: Metric[]) => {
          let metricsHistory = data;
          if (this.chartType == "CPU") {
            let cpu = [];
            metricsHistory.forEach(entry => {
              entry.when = format(parseISO(entry.when), "HH:mm:ss")
              cpu.push({ x: entry.when, y: entry.cpu.perc })
            })
            this.chartData.datasets[0].data = cpu;
            this.chart.update()
          }
          if (this.chartType == "MEMORY") {
            let memory = [];
            metricsHistory.forEach(entry => {
              entry.when = format(parseISO(entry.when), "HH:mm:ss")
              memory.push({ x: entry.when, y: entry.memory.perc })
            })
            this.chartData.datasets[0].data = memory;
            this.chart.update()
          }
        }
      )
      return;
    }
    if(time == "30 m"){
      this.timeSpans = ["30 m", "1 h", "Live"]
      this.expandSpans = !this.expandSpans;
      let toDate = new Date()
      let fromDate = subMinutes(toDate, 30);
      this.containerService.getMetricsFromAPI(this.CID, formatISO(fromDate), formatISO(toDate), 20, true).then(
        (data: Metric[]) => {
          let metricsHistory = data;
          if(this.chartType == "CPU"){
            let cpu = [];
            metricsHistory.forEach(entry => {
                entry.when = format(parseISO(entry.when), "HH:mm:ss")
                cpu.push({x: entry.when, y: entry.cpu.perc})
            })
            this.chartData.datasets[0].data = cpu;
            console.log(cpu)
            this.chart.update()
          }
          if(this.chartType == "MEMORY"){
            let memory = [];
            metricsHistory.forEach(entry => {
                entry.when = format(parseISO(entry.when), "HH:mm:ss")
                memory.push({x: entry.when, y: entry.memory.perc})
            })
            this.chartData.datasets[0].data = memory;
            console.log(memory)
            this.chart.update()
          }
      }
      )
      return;
    }
    if(time == "Live"){
      this.timeSpans = ["Live", "30 m", "1 h"]
      this.expandSpans = !this.expandSpans;
      this.chartData.datasets[0].data = [];
      this.chart.update()
      return;
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
          stepSize: 5,
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
    gradient.addColorStop(0.2, this.colors.purple.quarter);
    gradient.addColorStop(0.8, this.colors.purple.zero);

    return gradient;
  }

}
