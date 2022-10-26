import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Event, NavigationEnd } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private navtitle: NavtitleService) { 

  }

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd){
        this.title = this.getTitle(e.url);
      }
    })
    /* this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.containerID = +params.get('id');

      console.log(this.containerID);
    }) */
  }

  getTitle(url: String): String{
    if(url == '/'){
      return "Dashboard";
    }
    if(url == '/containers'){
      return "Containers"
    }
    if(url.includes('/container')){
      return "Containers"
    }
  }


}
