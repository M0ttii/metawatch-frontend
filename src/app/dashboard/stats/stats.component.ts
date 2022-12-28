import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { SocketMessage } from 'src/app/models/socketmessage.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit{
  @Input() public type: string;
  @Input() chartSubj: Subject<SocketMessage<Message>>;

  protected cpu: string;
  protected memory: string;
  protected disk: string;

  constructor() { }

  ngAfterViewInit(): void {
    switch(this.type){
      case "cpu": {
        this.chartSubj.subscribe((message) => {
          this.cpu = message.message.cpu.perc.toString().substring(0, 3);
        })
        break;
      }
      case "memory": {
        this.chartSubj.subscribe((message) => {
          this.memory = message.message.memory.perc.toString().substring(0, 3);
        })
        break;
      }
      case "disk": {
        this.chartSubj.subscribe((message) => {
          this.disk = message.message.disk.read.toString().substring(0, 3);
        })
        break;
      }
    }
  }

  ngOnInit(): void {
  }

}
