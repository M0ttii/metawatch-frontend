import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  /* private logObject = {} as Log; */

  constructor(private httpservice: HttpserviceService) { 
    
  }

  public getLogs(): Array<Log> {
    let logArray = []
    this.httpservice.getLogs().subscribe(data => {
      data.forEach(index => {
        let logObject = {} as Log;
        logObject.when = index.when;
        logObject.type = index.type;
        logObject.data = index.data;
        logArray.push(logObject);
      })
    }
    )
    return logArray;
  }
}
