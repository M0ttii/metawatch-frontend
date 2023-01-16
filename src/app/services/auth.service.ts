import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { add, format, isBefore, parseISO, toDate } from 'date-fns';
import { shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

   }

  login(name: string, password: string){
    return this.http.post(environment.apiURL + '/login', {name, password})
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      )
  }

  private setSession(authResult){
    const expiresAt = add(new Date(), {seconds: authResult.expiresIn})

    localStorage.setItem('token', authResult.token)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(){
    return isBefore(new Date(), this.getExp())
  }

  getExp(){
    const exp = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(exp);
    return parseISO(expiresAt);
  }
}
