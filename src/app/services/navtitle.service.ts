import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContainerserviceService } from './containerservice.service';

@Injectable({
  providedIn: 'root'
})
export class NavtitleService implements OnInit{
  public id = new Subject<String>();
  public currentState: String;
  public currentName: String;

  constructor() {
  }

  ngOnInit(){

  }

}
