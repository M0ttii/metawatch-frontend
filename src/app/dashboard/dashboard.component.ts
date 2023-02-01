import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { format } from 'date-fns';
import { BehaviorSubject, Subject, Subscription, take } from 'rxjs';
import { About, Image, Volume } from '../models/dashboard.models';
import { Message } from '../models/message.model';
import { SocketMessage } from '../models/socketmessage.model';
import { AuthService } from '../services/auth.service';
import { HttpserviceService } from '../services/httpservice.service';
import { LoadingService } from '../services/loading.service';
import { NavtitleService } from '../services/navtitle.service';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public volumes: Volume[];
  public images: Image[];
  public about: About;

  protected chartSubj: Subject<SocketMessage<Message>>;
  public metricsSub: Subscription;

  public dataFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  public volumesFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public imagesFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public aboutFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor(private titleService: NavtitleService, 
              protected loadingService: LoadingService, 
              private httpservice: HttpserviceService, 
              private socketService: SocketService, 
              private title: Title,
              private authService: AuthService ) {
              }

  //called when component gets destroyed
  ngOnDestroy(): void {
    this.chartSubj.unsubscribe();
    this.metricsSub.unsubscribe();
  }

  //Called when component gets created
  ngOnInit(): void {
    this.titleService.set("Dashboard", "", "Hallo, " + localStorage.getItem("username"));
    this.title.setTitle("Dashboard")
    this.getVolumesFromAPI().then(
      (data: Volume[]) => {
        let volumes = data;
        volumes.forEach(
          (volume: Volume, index) => {
            let bytes = volume.size;
            volumes[index].size_string = this.formatBytes(bytes);
          }
        )
        this.volumes = volumes;
        this.volumesFetched.next(true);
      }
    )

    this.getImagesFromAPI().then(
      (data: Image[]) => {
        let images = data;
        images.forEach(
          (image: Image, index) => {
            let imageCreated = new Date(image.created);
            images[index].created = format(imageCreated, 'dd.MM.yyyy');

            let bytes = image.size;
            images[index].size_string = this.formatBytes(bytes);
          }
        )
        this.images = images;
        this.imagesFetched.next(true);
      }
    )

    //Getting information from about endpoint
    this.getAboutFromAPI().then(
      (data: About) => {
        let about = data;
        let bytes = about.max_mem;
        about.max_mem_string = this.formatBytes(bytes);
        this.about = about;
        this.aboutFetched.next(true);
      }
    )

    this.chartSubj = new Subject<SocketMessage<Message>>();
    this.metricsSub = this.socketService.createCombinedStream().subscribe({
      next: (message: SocketMessage<Message>) => {
          console.log(message)
          if(this.dataFetched.getValue() == false) this.dataFetched.next(true);
          this.chartSubj.next(message);
      },
      error: error => console.log('WS Error: ', error),
      complete: () => console.log("WS complete")
  })
  }

  getVolumesFromAPI() {
    return new Promise(resolve => {
      this.httpservice.getVolumes().pipe(
        take(1)
      ).subscribe(
        (data: Volume[]) => {
          resolve(data)
        }
      )
    })
  }

  getImagesFromAPI() {
    return new Promise(resolve => {
      this.httpservice.getImages().pipe(
        take(1)
      ).subscribe(
        (data: Image[]) => {
          resolve(data)
        }
      )
    })
  }

  getAboutFromAPI() {
    return new Promise(resolve => {
      this.httpservice.getDockerStats().pipe(
        take(1)
      ).subscribe(
        (data: About) => {
          resolve(data)
        }
      )
    })
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
