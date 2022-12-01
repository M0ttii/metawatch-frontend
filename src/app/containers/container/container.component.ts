import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContainerserviceService } from 'src/app/services/containerservice.service';
import { NavtitleService } from 'src/app/services/navtitle.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private sub: any;
  public containerID: any;
  private metricsObs: Observable<{type: string, message: string}>;
  private metricsSub: Subscription;

  constructor(private route: ActivatedRoute, private navtitle: NavtitleService, private containerService: ContainerserviceService, private socketService: SocketService) {
    this.route.paramMap.subscribe( paramMap => {
      console.log("ID: " + paramMap.get('id'));
      containerService.setActiveContainer(paramMap.get('id'));
    })
   }
  ngOnDestroy(): void {
    console.log("Container leave")
    this.metricsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.socketService.connectToSocketServer("ws://localhost:8080/stream");
    this.metricsObs = this.socketService.createStream(this.containerService.activeContainer.id, "metrics");
    this.metricsSub = this.metricsObs.subscribe(message => console.log(message));

  }

}
