import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Log } from '../models/log.model';
import { Message } from '../models/message.model';
import { SocketMessage } from '../models/socketmessage.model';

@Injectable({
  providedIn: 'root'
})

export class SocketService{
  public socket: WebSocketSubject<SocketMessage<any>>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */
  public metricsObs: Observable<SocketMessage<any>>;
  public eventObs: Observable<SocketMessage<any>>;

  constructor() {
    this.connectToSocketServer('ws://localhost:8080/stream')
  }

  public connectToSocketServer(uri: string){
    this.socket = webSocket<SocketMessage<any>>(uri);
    console.log('Connected to SocketServer')
  }

  createEventStream(): Observable<SocketMessage<Message>>{
    if (this.socket == undefined || null){
      console.log("No socket found")
      return;
    }
    if (this.eventObs == undefined){
      this.eventObs = this.socket.multiplex(
        () => ({event: 'subscribe', type: 'event' }),
        () => ({event: 'unsubscribe', type: 'event' }),
        message => message.type === 'event');
      return this.eventObs
    }
    return this.eventObs
  }

  public createStream(container_ID: string, type: string): Observable<SocketMessage<Message>> {
    if (this.socket == null) return;
    console.log("Metrics subscribed")
    if(this.metricsObs == undefined){
      this.metricsObs = this.socket.multiplex(
        () => ({ container_id: container_ID, event: 'subscribe', type: type }),
        () => ({ container_id: container_ID, event: 'unsubscribe', type: type }),
        message => message.type === type);
      return this.metricsObs;
    }
    return this.metricsObs;
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
