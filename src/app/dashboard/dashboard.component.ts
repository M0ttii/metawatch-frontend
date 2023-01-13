import { Component, OnDestroy, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject, take } from 'rxjs';
import { About, Image, Volume } from '../models/dashboard.models';
import { HttpserviceService } from '../services/httpservice.service';
import { LoadingService } from '../services/loading.service';
import { NavtitleService } from '../services/navtitle.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public volumes: Volume[];
  public images: Image[];
  public about: About;

  public volumesFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public imagesFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public aboutFetched: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor(private titleService: NavtitleService, protected loadingService: LoadingService, private httpservice: HttpserviceService) {

   }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.titleService.set("Dashboard");
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

    this.getAboutFromAPI().then(
      (data: About) => {
        let about = data;
        let bytes = about.max_mem;
        about.max_mem_string = this.formatBytes(bytes);
        this.about = about;
        this.aboutFetched.next(true);
      }
    )
  }

  getVolumesFromAPI(){
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

  getImagesFromAPI(){
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

  getAboutFromAPI(){
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
