import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContainerserviceService } from './containerservice.service';

@Injectable({
  providedIn: 'root'
})
export class NavtitleService implements OnInit{
  public title = new Subject<Array<String>>();
  public id = new Subject<String>();
  public currentState: String;
  public currentName: String;

  constructor() {
  }

  ngOnInit(){

  }

  set(title: string, sub?: string){
    let titleA = [];
    if(sub == undefined){
      titleA.push(title)
      this.title.next(titleA)
      return;
    }
    titleA.push(title)
    titleA.push(sub);
    this.title.next(titleA)
  }

}
