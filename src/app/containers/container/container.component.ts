import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ContainerserviceService } from 'src/app/services/containerservice.service';
import { SocketService } from 'src/app/services/socket.service';
import { SocketMessage } from 'src/app/models/socketmessage.model';
import { Message } from 'src/app/models/message.model';
import { Log } from 'src/app/models/log.model';
import { Container } from 'src/app/models/container.model';
import { NavtitleService } from 'src/app/services/navtitle.service';
import { SingleContainer } from 'src/app/models/singlecontainer.model';
import { formatDistance } from 'date-fns';
import format from 'date-fns/format';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
    public containerID: any;
    protected container: SingleContainer;
    protected metricsObs: Observable<SocketMessage<Message>>;
    protected logsObs: Observable<SocketMessage<Log>>;
    protected chartSubj: Subject<SocketMessage<Message>>;
    protected logSubj: Subject<SocketMessage<Log>>;
    protected logSub: Subscription;
    private metricsSub: Subscription;

    public dataFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);
    


    constructor(private route: ActivatedRoute, private containerService: ContainerserviceService, private socketService: SocketService, private titleService: NavtitleService, public loadingService: LoadingService) {
    }

    ngOnInit(): void {
        this.titleService.set("");
        console.log(this.containerService.activeContainerID)
        this.containerService.isContainerSite = true;
        let CID = this.containerService.activeContainerID;
        if(CID == undefined){
            CID = localStorage.getItem("currentID");
        }
        this.containerService.getContainerFromAPI(CID).then(
            (data: SingleContainer) => {
                this.container = this.makeFormatWork(data);
                console.log("Container fetched")
                this.dataFetched.next(true)
                this.titleService.set(this.container.name.substring(1), this.container.id.substring(0, 30))
            }
        );
        this.logSubj = new Subject<SocketMessage<Log>>();
        this.logSub = this.socketService.createLogStream(CID, "logs").subscribe({
            next: (message: SocketMessage<Log>) => {
                console.log("Log:", message)
                this.logSubj.next(message)

            }
        })
        this.chartSubj = new Subject<SocketMessage<Message>>();
        this.metricsSub = this.socketService.createStream(CID, "metrics").subscribe({
            next: (message: SocketMessage<Message>) => {
                console.log("RECSV")
                this.chartSubj.next(message);
            },
            error: error => console.log('WS Error: ', error),
            complete: () => console.log("WS complete")
        })
    }

    makeFormatWork(container: SingleContainer): SingleContainer{
        container.state.status = container.state.status.toUpperCase();
        container.state.restart_policy = container.state.restart_policy.charAt(0).toUpperCase() + container.state.restart_policy.slice(1);

        let date = new Date(container.state.since);
        container.state.date_distance = formatDistance(date, new Date(), {addSuffix: true})

        let imageCreated = new Date(container.image.created);
        container.image.created = format(imageCreated, 'dd.MM.yyyy');

        let bytes = container.image.size;
        container.image.size_string = this.formatBytes(bytes);
        return container;
    }

    ngOnDestroy(): void {
        console.log("Unsubscribe Container Metrics")
        this.containerService.isContainerSite = false;
        this.chartSubj.unsubscribe();
        this.metricsSub.unsubscribe();
        this.logSub.unsubscribe();
        /* this.metricsSub.unsubscribe();
        this.logsSub.unsubscribe(); */
    }

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

}
