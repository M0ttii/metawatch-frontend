import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private socketService: SocketService) { }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
  }

}
