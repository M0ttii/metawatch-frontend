import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuardService } from './auth/auth-guard.service';
import { EventMessage } from './models/events.model';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'grid-test';
  public eventSub: Subscription;

  constructor(protected authGuard: AuthGuardService, private loadingService: LoadingService, private socketService: SocketService, private alertService: AlertService){
  

  }
  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }
  ngOnInit(): void {

    this.eventSub = this.socketService.createEventStream().subscribe({
      next: (message: EventMessage) => {
        this.alertService.alert(message.message.id, message.message.type)
          console.log(message)
      },
      error: error => console.log('WS Error: ', error),
      complete: () => console.log("WS complete")
  })
    console.log("AppComponent init")
  }

  setStyle(){
    return {'--sidebarColor': '#1D1E2E'}
  }
}
