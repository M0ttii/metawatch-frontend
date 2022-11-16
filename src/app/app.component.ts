import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grid-test';

  constructor(protected authGuard: AuthGuardService){
    if(!localStorage.getItem('currentUser')){
      authGuard.redirect('/login')
    }

  }
}
