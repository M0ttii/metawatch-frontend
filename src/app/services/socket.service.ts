import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket} from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket = webSocket<{type: string, message: string}>('ws://localhost:8001');
  private subMetrics: any;
  private metricsObservable = this.socket.multiplex( 
      () => ({ containerid:'test123', subscribe: 'metrics' }),
      () => ({ unsubscribe: 'metrics' }),
      message => message.type === 'metrics');
  private logsObservable = this.socket.multiplex( 
    () => ({ subscribe: 'logs' }),
    () => ({ unsubscribe: 'logs' }),
    message => message.type === 'logs'
  );

  constructor() {
    //Sends {"subscribe":"metrics"} to server
    //Server knows that client want to get metrics
    this.subMetrics = this.metricsObservable.subscribe(
      messageForB => 
      console.log(messageForB));
  }

  unSubscribe(){
    this.subMetrics.unsubscribe();
    this.socket.error({ code: 4000, reason: 'I think our app just broke!' });
  }
}
