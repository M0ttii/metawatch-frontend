import { Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  set(title: string, sub?: string, sub2?: string){
    console.log(title, sub, sub2);
    let titleA = [];
    if(sub2 != undefined){
      titleA.push(title)
      titleA.push("")
      titleA.push(sub2)
      this.title.next(titleA)
      return;
    }
    if(sub == "" || sub == undefined){
      titleA.push(title)
      this.title.next(titleA)
      return;
    }
    titleA.push(title)
    titleA.push(sub);
    this.title.next(titleA)
  }


}
