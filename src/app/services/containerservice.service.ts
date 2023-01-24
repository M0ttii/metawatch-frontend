import { Injectable} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resolve } from 'path';
import { Observable, Subject, Subscription, take } from 'rxjs';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { Metric } from '../models/metrics.model';
import { SingleContainer } from '../models/singlecontainer.model';
import { ContainerState } from './containerstate.enum';
import { HttpserviceService } from './httpservice.service';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class ContainerserviceService{
  public activeContainer: Container;
  public activeContainerID: string;
  public isContainerSite: boolean = false;

  public containers: Subject<Container[]> = new Subject<Container[]>();
  public containerList: Container[] = new Array<Container>();
  public isFetched: Boolean = false;

  public inMetricLoading: Boolean = false;

  constructor(private httpservice: HttpserviceService) {
    console.log("CS const")
  }

  getContainersFromAPI(){
    return new Promise(resolve => {
      this.httpservice.getAllContainers().subscribe(
        (data: Container[]) => {
          resolve(data)
          this.containerList = data;
        }
      )
    })
  }

  getMetricsFromAPI(id: string, from: string, to: string, amount: number, inMetrics: boolean){
    if(inMetrics == true){
      this.inMetricLoading = true;
    }
    return new Promise(resolve => {
      this.httpservice.getMetricsHistory(id, from, to, amount).pipe(
        take(1)
      ).subscribe(
        (data: Metric[]) => {
          resolve(data)
        }
      )
    })
  }

  getContainerFromAPI(id: string){
    return new Promise(resolve => {
      this.httpservice.getContainer(id).pipe(
        take(1)
      ).subscribe(
        (data: SingleContainer) => {
          resolve(data)
        }
      )
    })
  }

  public getContainer(): Container{
    return this.getContainers().find(i => i.id === this.activeContainerID);
  }

  public getContainerById(id: string): Container{
    console.log(this.containerList)
    let container = this.containerList.find(i => i.id === id)
    return container;
  }

  public setActiveContainer(container_ID: string){
    let container = this.getContainerById(container_ID)
    if (container == undefined){
      console.log("Container with ID " + container_ID + " does not exist.")
      return false;
    }
    this.activeContainer = container;
    return this.activeContainer;
  }

  public getContainers(): Array<Container>{
    if(this.isFetched == true){
      return this.containerList;
    }
    return null;
  }

  public getStatePathAndColor(stateEnum: ContainerState): string[]{
    switch (stateEnum){
      case ContainerState.Running:
        return new Array(".././assets/check.svg", "Running");
      case ContainerState.Restarting:
        return new Array(".././assets/restarting.svg", "Restarting");
      case ContainerState.Exited:
        return new Array(".././assets/warning.svg", "Exited");
      case ContainerState.Paused:
        return new Array(".././assets/restarting.svg", "Paused");
      case ContainerState.Dead:
        return new Array(".././assets/warning.svg", "Dead");
      case ContainerState.Created:
        return new Array(".././assets/check.svg", "Created")
    }
  }

  public getColor(stateEnum: ContainerState): String{
    switch (stateEnum){
      case ContainerState.Running:
        return "#14e86c";
      case ContainerState.Restarting:
        return "#f4871a"
      case ContainerState.Exited:
        return "#f02634"
      case ContainerState.Paused:
        return "#f4871a"
      case ContainerState.Dead:
        return "#f02634"
      case ContainerState.Created:
        return "#14e86c"
    }
  }
}
