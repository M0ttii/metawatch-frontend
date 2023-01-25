import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { ContainerserviceService } from '../services/containerservice.service';
import { HttpserviceService } from '../services/httpservice.service';
import { LoadingService } from '../services/loading.service';
import { NavtitleService } from '../services/navtitle.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit, OnDestroy {
  public containers: Container[];

  constructor(private router: Router, public containerService: ContainerserviceService, public loadingService: LoadingService, private titleService: NavtitleService, private title: Title ) {

   }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.titleService.set("Containers");
    this.title.setTitle("Containers")
    this.containerService.getContainersFromAPI().then(
    (data: Container[]) => {
      this.containers = data;
      this.containers.sort((a, b) => a.state.status.localeCompare(b.state.status)).reverse()
      console.log(data)
    }
    );
  }



  navigateToContainer(containerID: string){
    this.containerService.activeContainerID = containerID;
    localStorage.setItem("currentID", containerID);
    this.router.navigate(['/containers/' + containerID], {state: {data: {id: containerID}}})
  }

}
