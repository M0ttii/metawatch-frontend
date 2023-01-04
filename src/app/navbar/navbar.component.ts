import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private navtitle: NavtitleService, private containerService: ContainerserviceService, private authGuard: AuthGuardService) {
    this.route.paramMap.subscribe( paramMap => {
      this.currentID = paramMap.get('id');
    })
    /* this.navtitle.id.subscribe(id => {
      this.currentID = id;
    }) */

  }

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd){
        this.title = this.getTitle(e.url);
        this.state = this.getState(e.url);
        this.containerService.containers.subscribe({
          next: (data) => {
            if(this.isContainerSite){
              let containerByID = this.getContainerListByID(data, this.currentID)
              this.title = containerByID.name;
              this.state = containerByID.stateEnum;
              this.color = this.containerService.getColor(this.state);
            }
          }
        })
        if(this.isContainerSite){
          if(this.containerService.containerList.length != 0){
            let containerList = this.containerService.containerList;
            /* let containerByID = this.getContainerByID(containerList, this.currentID); */
            let container = this.containerService.activeContainer;
            this.title = container.name;
            this.state = container.stateEnum;
            this.color = this.containerService.getColor(this.state);
          }
        }
      }
    })
  }

  public getContainerListByID(containerList: Container[], id: string){
    return containerList.find(i => i.id === id)
  }

  public getContainerByID(container: Container[], id: string){
    return container.find(i => i.id === id)
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
