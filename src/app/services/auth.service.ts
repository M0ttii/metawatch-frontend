import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isBefore, parseISO } from 'date-fns';
import { environment } from 'src/environments/environment';
import { Observable, tap, shareReplay, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

   }

  login(username: string, password: string): Observable<any>{
    let url = 'http://' + environment.apiURL + '/login';
    return this.http.post<any>(url, {username, password})
      .pipe(
        catchError((err: HttpErrorResponse) => {throw err}),
        tap(res => this.setSession(res)),
        shareReplay()
      )
  }

  private setSession(authResult){
    const expiresAt = authResult.expire

    localStorage.setItem('token', authResult.token)
    localStorage.setItem('expire', expiresAt);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
  }

  public isLoggedIn(){
    console.log(isBefore(new Date(), this.getExp()))
    return isBefore(new Date(), this.getExp())
  }

  getExp(){
    const exp = localStorage.getItem('expire');
    const expiresAt = parseISO(exp);
    return expiresAt;
  }
}
