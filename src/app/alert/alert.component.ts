import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public active: boolean = false;
  public type: string;
  public title: string;
  public message: string;
  public success: boolean = true;

  public typeSub: Subject<String>;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.typeSub = new Subject<String>();
    this.alertService.subject.subscribe(
      (data) => {
        this.type = data.type;
        this.title = data.title;
        this.message = data.message;
        this.typeSub.next(this.type);

        this.active = true;

        setTimeout(() => {
          this.active = false;
        }, 3000);
      }
    )
  }

  getType(): string{
    if(this.type == "success"){
      return "success"
    }
    if(this.type == "danger"){
      return "danger"
    }
  }

  toggle(){
    if(this.active){
      this.active = false;
      return;
    }
    this.active = true;
  }

}
