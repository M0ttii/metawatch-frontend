import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from 'src/app/models/log.model';
import { SocketMessage } from 'src/app/models/socketmessage.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  public logList: Log[] = [];
  public expand = false;
  @Input() logSubj: Subject<SocketMessage<Log>>;

  constructor(public logService: LogService) {
  }

  ngOnInit(): void {
    this.logSubj.subscribe(message => {
      let logObject = {} as Log;
      logObject.when = message.message.when;
      logObject.type = message.message.type;
      logObject.data = message.message.data;
      if(this.logList.length > 20){
        this.logList.shift();
      }
      this.logList.push(logObject);


    })
  }

  public expandLogBlock(){
    this.expand = !this.expand;
  }

}
