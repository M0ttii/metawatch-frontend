import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Log } from '../models/log.model';
import { Message } from '../models/message.model';
import { SocketMessage } from '../models/socketmessage.model';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  public socket: WebSocketSubject<SocketMessage<Message>>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */
  private metricsObs: Observable<SocketMessage<Message>>;
  private logsObs: Observable<SocketMessage<Log>>;

  constructor() {
    //Sends {"subscribe":"metrics"} to server
    //Server knows that client want to get metrics
    /* this.subMetrics = this.metricsObservable.subscribe(
      messageForB => 
      console.log(messageForB)); */
  }

  public connectToSocketServer(uri: string): WebSocketSubject<SocketMessage<Message>>{
    console.log("Connected to WS")
    if (this.socket == undefined){
      this.socket = webSocket<SocketMessage<Message>>(uri);
      return this.socket
    }
    return this.socket;
  }

  public createStream(container_ID: string, type: string): Observable<SocketMessage<Message>> {
    if (this.socket == null) return;
    console.log("Metrics subscribed")
    return this.socket.multiplex(
      () => ({ container_id: container_ID, event: 'subscribe', type: type }),
      () => ({ container_id: container_ID, event: 'unsubscribe', type: type }),
      message => message.type === type);
    /* return this.metricsObs; */
  }

  /* public createLogStream(container_ID: string, type: string): Observable<SocketMessage<Log>>{
    if (this.socket == null) return;
    this.logsObs = this.socket.multiplex(
      () => ({ container_id: container_ID, event: 'subscribe', type: type }),
      () => ({ container_id: container_ID, event: 'unsubscribe', type: type }),
      message => message.type === type);
    return this.logsObs;
  } */

  public getSocket(): WebSocketSubject<SocketMessage<any>>{
    return this.socket;
  }
}
