import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token")

    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Added api key")
      return next.handle(request)
    }
    return next.handle(request)
    
  }

  
}
