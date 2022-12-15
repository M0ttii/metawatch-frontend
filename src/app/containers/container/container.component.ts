import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContainerserviceService } from 'src/app/services/containerservice.service';
import { NavtitleService } from 'src/app/services/navtitle.service';
import { SocketService } from 'src/app/services/socket.service';
import { SocketMessage } from 'src/app/models/socketmessage.model';
import { Message } from 'src/app/models/message.model';
import { Log } from 'src/app/models/log.model';
import { isThisQuarter } from 'date-fns';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private sub: any;
  public containerID: any;
  protected metricsObs: Observable<SocketMessage<Message>>;
  protected logsObs: Observable<SocketMessage<Log>>;
  protected chartSubj: Subject<SocketMessage<Message>>;
  protected logSubj: Subject<SocketMessage<Log>>;
  private metricsSub: Subscription;
  private logsSub: Subscription;
  private metricsList: [] = [];


  constructor(private route: ActivatedRoute, private containerService: ContainerserviceService, private socketService: SocketService) {
   }

  ngOnInit(): void {
	this.route.params.subscribe(param => {
		this.containerService.activeContainerID = param['id'];
	})
    this.metricsObs = this.socketService.createStream(this.containerService.activeContainerID, "metrics");
    this.chartSubj = new Subject<SocketMessage<Message>>();
    this.metricsSub = this.metricsObs.subscribe((message: SocketMessage<Message>) => {
      console.log("metricmessage");
      console.log(message);
      this.chartSubj.next(message);
    });
    /* this.logsSub = this.logsObs.subscribe((message: SocketMessage<Log>) => {
      this.logSubj.next(message);
    }); */
  }

  ngOnDestroy(): void {
    console.log("Container leave")
	this.metricsSub.unsubscribe();
    /* this.metricsSub.unsubscribe();
    this.logsSub.unsubscribe(); */
  }

}
