import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isBefore, parseISO } from 'date-fns';
import { environment } from 'src/environments/environment';
import { Observable, tap, shareReplay, catchError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

   }

  login(username: string, password: string): Observable<any>{
    let url = 'http://' + environment.apiURL + '/login';
    return this.http.post<any>(url, {username, password})
      .pipe(
        catchError((err: HttpErrorResponse) => {throw err}),
        tap(res => {
          this.setSession(res)
          this.router.navigate(['']).then(() => {
            window.location.reload()
          })
        }),
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
    this.router.navigate(['login']).then(() => {
      window.location.reload()
    })
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
