import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, IAlert } from '../models/alert.model';
import { Container } from '../models/container.model';
import { SingleContainer } from '../models/singlecontainer.model';
import { ContainerserviceService } from './containerservice.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public subject: Subject<IAlert> = new Subject<IAlert>();

  constructor(private containerService: ContainerserviceService) { }

  alert(container_id: string, title: string){
    switch(title){
      case "container_start":
          let alert = new Alert()
            alert.title = "Container started"
            alert.message = "Container with id " + container_id.substring(0, 12) + "... was started."
            alert.type = "success"
            this.subject.next(alert);
          break;
      case "container_die":
        let alert1 = new Alert()
            alert1.title = "Container stopped"
            alert1.message = "Container with id " + container_id.substring(0, 12) + "... was stopped."
            alert1.type = "danger"
            this.subject.next(alert1);
        break;
    }
  }

  customalert(title: string, message: string) {
    let alert = new Alert()
    alert.title = title
    alert.message = message;
    alert.type = "success"
    this.subject.next(alert);

  }
}
