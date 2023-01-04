import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContainerserviceService } from 'src/app/services/containerservice.service';
import { SocketService } from 'src/app/services/socket.service';
import { SocketMessage } from 'src/app/models/socketmessage.model';
import { Message } from 'src/app/models/message.model';
import { Log } from 'src/app/models/log.model';
import { Container } from 'src/app/models/container.model';
import { NavtitleService } from 'src/app/services/navtitle.service';
import { SingleContainer } from 'src/app/models/singlecontainer.model';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
    private sub: any;
    public containerID: any;
    protected container: SingleContainer;
    protected metricsObs: Observable<SocketMessage<Message>>;
    protected logsObs: Observable<SocketMessage<Log>>;
    protected chartSubj: Subject<SocketMessage<Message>>;
    protected logSubj: Subject<SocketMessage<Log>>;
    private metricsSub: Subscription;
    private logsSub: Subscription;
    private metricsList: [] = [];


    constructor(private route: ActivatedRoute, private containerService: ContainerserviceService, private socketService: SocketService, private titleService: NavtitleService) {
    }

    ngOnInit(): void {
        this.containerService.isContainerSite = true;
        if(this.containerService.activeContainerID == undefined){
            this.containerService.activeContainerID = localStorage.getItem("currentID");
        }
        this.containerService.getContainerFromAPI(this.containerService.activeContainerID).then(
            (data: SingleContainer) => {
                this.container = data;
                this.titleService.set(this.container.name.substring(1))
            }
        );
        this.metricsObs = this.socketService.createStream(this.containerService.activeContainerID, "metrics");
        this.chartSubj = new Subject<SocketMessage<Message>>();
        this.metricsSub = this.metricsObs.subscribe({
            next: (message: SocketMessage<Message>) => {
                this.chartSubj.next(message);
            },
            error: error => console.log('WS Error: ', error),
            complete: () => console.log("WS complete")
        });
    }

    ngOnDestroy(): void {
        console.log("Container leave")
        this.containerService.isContainerSite = false;
        this.metricsSub.unsubscribe();
        /* this.metricsSub.unsubscribe();
        this.logsSub.unsubscribe(); */
    }

}
