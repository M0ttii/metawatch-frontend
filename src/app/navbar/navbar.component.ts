import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ContainerserviceService } from '../services/containerservice.service';
import { ContainerState } from '../services/containerstate.enum';
import { NavtitleService } from '../services/navtitle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sub: any;
  protected containerID: any;
  protected title: any = "Dash";
  protected state: any;
  protected color: any;
  protected id: any;
  protected currentID: any;
  protected currentState: ContainerState;
  protected currentName: String;
  protected isContainerSite: Boolean = false;

  constructor(private router: Router, private navtitle: NavtitleService, private containerService: ContainerserviceService) {
    this.navtitle.id.subscribe(id => {
      this.currentID = id;
    })

  }

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd){
        this.title = this.getTitle(e.url);
        this.state = this.getState(e.url);
      }
    })
  }

  public getContainerNameAndState(){
    let container = this.containerService.containers.containers.find(i => i.id.substring(0,12) === this.currentID); 
    console.log(container)
    this.currentState = container.stateEnum;
    this.currentName = container.names[0];
    this.color = this.containerService.getColor(container.stateEnum);
    console.log(this.currentID);
    return new Array(this.currentName, this.currentState);
    /* return new Array(container.name); */
  }

  getTitle(url: String): String{
    if(url == '/'){
      return "Dashboard";
    }
    if(url == '/containers'){
      return "Containers"
    }
    if(url.includes('/container')){
      let container = this.getContainerNameAndState();
      return container[0];
    }
  }

  getState(url: String): String{
    if(!url.includes("/container") || url.includes("/containers")){
      this.isContainerSite = false;
      return;
    }
    this.isContainerSite = true;
    let container = this.getContainerNameAndState();
    return container[1];
  }



}
