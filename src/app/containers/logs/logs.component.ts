import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
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

  constructor(public logService: LogService) {
  }

  ngOnInit(): void {
    this.logList = this.logService.getLogs();
  }

  public expandLogBlock(){
    this.expand = !this.expand;
  }

}
