import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { environment } from 'src/environments/environment';
import { EventMessage } from '../models/events.model';
import { Log } from '../models/log.model';
import { Message } from '../models/message.model';
import { SocketMessage } from '../models/socketmessage.model';

@Injectable({
  providedIn: 'root'
})

export class SocketService{
  public socket: WebSocketSubject<SocketMessage<any>>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */
  public metricsObs: Observable<SocketMessage<any>>;
  public combObs: Observable<SocketMessage<any>>
  public logsObs: Observable<SocketMessage<any>>;
  public eventObs: Observable<SocketMessage<any>>;

  constructor() {
    this.connectToSocketServer('ws://' + environment.apiURL + '/stream')
  }

  public connectToSocketServer(uri: string){
    this.socket = webSocket<SocketMessage<any>>(uri);
    console.log('Build SocketObject')
  }

  createEventStream(): Observable<EventMessage>{
    if (this.socket == undefined || null){
      console.log("No socket found")
      return;
    }
    if (this.eventObs == undefined){
      this.eventObs = this.socket.multiplex(
        () => ({container_id: '', event: 'subscribe', type: 'events' }),
        () => ({container_id: '',event: 'unsubscribe', type: 'events' }),
        message => message.type === 'event');
      return this.eventObs
    }
    return this.eventObs
  }

  public createCombinedStream(): Observable<SocketMessage<Message>>{
    if (this.socket == null) return;
    console.log("Metrics subscribed, connected to server")
    if(this.combObs == undefined){
      this.combObs = this.socket.multiplex(
        () => ({ container_id: "_all", event: 'subscribe', type: "combined_metrics" }),
        () => ({ container_id: "_all", event: 'unsubscribe', type: "combined_metrics" }),
        message => message.type === "combined_metrics");
      return this.combObs;
    }
    return this.combObs;
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

  public createLogStream(container_ID: string, type: string): Observable<SocketMessage<Log>> {
    if (this.socket == null) return;
    console.log("Logssubscribed")
    if(this.logsObs == undefined){
      this.logsObs = this.socket.multiplex(
        () => ({ container_id: container_ID, event: 'subscribe', type: type }),
        () => ({ container_id: container_ID, event: 'unsubscribe', type: type }),
        message => message.type === type);
      return this.logsObs;
    }
    return this.logsObs;
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
