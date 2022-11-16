import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../auth/auth-guard.service';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { ContainerserviceService } from '../services/containerservice.service';
import { ContainerState } from '../services/containerstate.enum';
import { NavtitleService } from '../services/navtitle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  protected containerID: any;
  protected title: any = "Dash";
  protected state: any;
  protected color: any;
  protected id: any;
  protected currentID: any;
  protected currentState: ContainerState;
  protected currentName: String;
  protected isContainerSite: Boolean = false;

  constructor(private router: Router, private navtitle: NavtitleService, private containerService: ContainerserviceService, private authGuard: AuthGuardService) {
    console.log("Navbar const")
    this.navtitle.id.subscribe(id => {
      this.currentID = id;
    })

  }

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd){
        console.log("IsFetched: " + this.containerService.isFetched)
        this.title = this.getTitle(e.url);
        this.state = this.getState(e.url);
        this.containerService.containers.subscribe({
          next: (data) => {
            if(this.isContainerSite){
              let containerByID = this.getContainerListByID(data, this.currentID)
              this.title = containerByID.names[0];
              this.state = containerByID.stateEnum;
              this.color = this.containerService.getColor(this.state);
            }
          }
        })
        if(this.isContainerSite){
          if(this.containerService.containerList.length != 0){
            let containerList = this.containerService.containerList;
            let containerByID = this.getContainerByID(containerList, this.currentID);
            this.title = containerByID.names[0];
            this.state = containerByID.stateEnum;
            this.color = this.containerService.getColor(this.state);
            console.log(containerByID.names[0]);
          }
        }
      }
    })
  }

  public getContainerListByID(containerList: Containers, id: string){
    return containerList.containers.find(i => i.id.substring(0, 12) === id.substring(0,12))
  }

  public getContainerByID(container: Container[], id: string){
    return container.find(i => i.id.substring(0, 12) === id.substring(0,12))
  }

  getTitle(url: String): String{
    if(url == '/'){
      return "Dashboard";
    }
    if(url == '/containers'){
      return "Containers"
    }
  }

  getState(url: String): String{
    if(!url.includes("/container") || url.includes("/containers")){
      this.isContainerSite = false;
      return;
    }
    this.isContainerSite = true;
  }

  logout(){
    this.authGuard.redirect('/login')
    localStorage.removeItem('currentUser');

  }


}
