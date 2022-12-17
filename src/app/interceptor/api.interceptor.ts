import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercept')
    this.loader.show();
    return next.handle(request).pipe(
      finalize(() => {
        console.log('interception finished')
        this.loader.hide();
      })
    );
  }
}
