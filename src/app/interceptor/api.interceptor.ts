import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, tap, timer } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.headers.keys().includes("Upgrade")){
      console.log('intercept')
      this.loader.show();
      return next.handle(request).pipe(
        retry({count: 2, delay: this.shouldRetry}),
        catchError((error: HttpErrorResponse) => {
          console.log("Error while intercepting")
          this.loader.error.next(true);
          throw error;
        }),
        finalize(() => {
          console.log('interception finished')
          this.loader.hide();
        })
      );
    }
    next.handle(request)
  }

  shouldRetry(error: HttpErrorResponse){
    if(error.status >= 500){
      console.log("retry");
      return timer(1000);
    }
    throw error;
  }
}
