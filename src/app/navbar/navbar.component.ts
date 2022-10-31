import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ContainerserviceService } from '../services/containerservice.service';
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
  protected id: any;
  protected currentID: any;
  protected currentState: String;
  protected currentName: String;

  constructor(private router: Router, private navtitle: NavtitleService, private containerService: ContainerserviceService) { 

  }

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd){
        this.title = this.getTitle(e.url);
      }
    })
    this.navtitle.id.subscribe(id => {
      this.currentID = id;
    })
  }

  public getContainerNameAndState(){
    /* let container = this.containerService.containers.find(i => i.id.toString() === this.currentID);
    this.currentState = container.state.toString();
    this.currentName = container.name; */
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
      let containerName = this.getContainerNameAndState();
      return "containerName[1]";
    }
  }


}
