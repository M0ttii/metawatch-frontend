import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.loading.next(true);
  }

  hide(){
    this.loading.next(false);
  }
}
