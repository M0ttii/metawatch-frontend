import { Injectable} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { ContainerState } from './containerstate.enum';
import { HttpserviceService } from './httpservice.service';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class ContainerserviceService{
  public activeContainer: Container;
  public activeContainerID: string;

  public containers: Subject<Container[]> = new Subject<Container[]>;
  public containerList: Container[] = new Array<Container>;
  public isFetched: Boolean = false;

  constructor(private httpservice: HttpserviceService, private route: ActivatedRoute, private loadingService: LoadingService) {
    console.log("CS const")
    this.httpservice.getAllContainers().subscribe({
      next: (data) => {
        data.forEach(c => {
          this.containerList.push(c);
          this.containers.next(data);
          switch (c.state.status){
            case "running":
              c.stateEnum = ContainerState.Running;
          }
        })
        console.log("Fetching completed")
        this.isFetched = true;
      },
      error: (e) => console.error(e)
    });
  }

  public getContainer(): Container{
    return this.getContainers().find(i => i.id === this.activeContainerID);
  }


  public getContainerById(id: string): Container{
    let containers = this.getContainers();
    let container = containers.find(i => i.id.substring(0,12) === id.substring(0, 12))
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
