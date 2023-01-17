import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading = new BehaviorSubject<boolean>(false);
  public error = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.loading.next(true);
  }

  hide(){
    if(!this.error.getValue()){
      this.loading.next(false);
    }
  }
}
