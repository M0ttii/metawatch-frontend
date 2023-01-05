import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavtitleService } from '../services/navtitle.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private titleService: NavtitleService) { }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.titleService.set("Dashboard");
  }

}
