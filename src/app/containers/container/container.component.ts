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
import { formatDistance, formatISO, getMinutes, parseISO, subMinutes } from 'date-fns';
import format from 'date-fns/format';
import { LoadingService } from 'src/app/services/loading.service';
import { Metric } from 'src/app/models/metrics.model';
import { StringMappingType } from 'typescript';
import { Title } from '@angular/platform-browser';

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
    public metricsFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);

    public CID: string;


    public cpuHistory = [];
    public memoryHistory = [];
    
    constructor(private route: ActivatedRoute, 
                public containerService: ContainerserviceService, 
                private socketService: SocketService, 
                private titleService: NavtitleService, 
                public loadingService: LoadingService, 
                private title: Title) {
                }

    //Called when component gets created
    ngOnInit(): void {
        this.titleService.set("");

        this.containerService.inMetricLoading = false;
        this.containerService.isContainerSite = true;

        this.CID = this.containerService.activeContainerID;
        if(this.CID == undefined){
            this.CID = localStorage.getItem("currentID");
        }

        //Fetching Container from API
        this.containerService.getContainerFromAPI(this.CID).then(
            (data: SingleContainer) => {
                this.container = this.makeFormatWork(data);
                this.dataFetched.next(true)
                this.title.setTitle("> " + this.container.name.substring(1))
                this.titleService.set(this.container.name.substring(1), this.container.id.substring(0, 30))
            }
        );
        
        //Fetching Metrics from API
        let toDate = new Date()
        let fromDate = subMinutes(toDate, 30);
        this.containerService.getMetricsFromAPI(this.CID, formatISO(fromDate), formatISO(toDate), 20, false).then(
            (data: Metric[]) => {
                let metricsHistory = data;
                metricsHistory.forEach(entry => {
                    entry.when = format(parseISO(entry.when), "HH:mm:ss")
                    this.cpuHistory.push({x: entry.when, y: entry.cpu.perc})
                    this.memoryHistory.push({x: entry.when, y: entry.memory.perc})
                })
                this.metricsFetched.next(true);
            }
        )

        //Creating LogSubject for receiving log stream
        this.logSubj = new Subject<SocketMessage<Log>>();
        this.logSub = this.socketService.createLogStream(this.CID, "logs").subscribe({
            next: (message: SocketMessage<Log>) => {
                this.logSubj.next(message)

            }
        })

        //Creating MetricsSubject for receiving metric stream
        this.chartSubj = new Subject<SocketMessage<Message>>();
        this.metricsSub = this.socketService.createStream(this.CID, "metrics").subscribe({
            next: (message: SocketMessage<Message>) => {
                this.chartSubj.next(message);
            },
            error: error => console.log('WS Error: ', error),
            complete: () => console.log("WS complete")
        })
    }

    //Format container data
    makeFormatWork(container: SingleContainer): SingleContainer{
        container.state.status = container.state.status.toUpperCase();
        container.state.restart_policy = container.state.restart_policy.charAt(0).toUpperCase() + container.state.restart_policy.slice(1);

        let date = new Date(container.state.since);
        container.state.date_distance = formatDistance(date, new Date(), {addSuffix: true})

        let imageCreated = new Date(container.image.created);
        container.image.created = format(imageCreated, 'dd.MM.yyyy');

        let bytes = container.image.size;
        container.image.size_string = this.formatBytes(bytes);

        if(container.state.restart_policy == ""){
            container.state.restart_policy = "No"
        }

        container.volumes.forEach(volume => {
            if(volume.name.length > 20 ){
                volume.name = volume.name.substring(0, 20) + "..."
            }
            let path = volume.mountpoint
            let splitted = path.split("/")
            if (splitted[splitted.length -1] == "_data"){
                let secondlast = splitted[splitted.length - 2]
                if (secondlast.length > 20){
                    secondlast = secondlast.substring(0, 20) + "..."
                    splitted[splitted.length - 2] = secondlast
    
                    let endPath = splitted.join("/")
                    volume.mountpoint = endPath;
                }
            }else{
                let last = splitted[splitted.length - 1]
                if (last.length > 20){
                    last = last.substring(0, 20) + "..."
                    splitted[splitted.length - 1] = last
    
                    let endPath = splitted.join("/")
                    volume.mountpoint = endPath;
                }
            }

        })
        container.ports.forEach((port, index, object) => {
            if (port.host_ip == "::"){
                object.splice(index, 1)
            }

        })
        return container;
    }

    //Adding suffix to data size
    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
    
    //Called when component gets destroyed
    ngOnDestroy(): void {
        this.containerService.isContainerSite = false;
        this.chartSubj.unsubscribe();
        this.metricsSub.unsubscribe();
        this.logSub.unsubscribe();
    }


}
