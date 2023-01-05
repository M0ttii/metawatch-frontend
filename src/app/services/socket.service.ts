import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Log } from '../models/log.model';
import { Message } from '../models/message.model';
import { SocketMessage } from '../models/socketmessage.model';

@Injectable({
  providedIn: 'root'
})

export class SocketService implements OnDestroy, OnInit{
  public socket: WebSocketSubject<SocketMessage<any>>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */
  private metricsObs: Observable<SocketMessage<Message>>;
  private logsObs: Observable<SocketMessage<Log>>;

  constructor() {
    this.connectToSocketServer('ws://localhost:8080/stream')
  }
  ngOnInit(): void {
    console.log('SocketService created')
  }

  ngOnDestroy(): void {
    console.log('SocketService destroyed')
    this.socket.complete();
  }

  public connectToSocketServer(uri: string){
    this.socket = webSocket<SocketMessage<any>>(uri);
    console.log('Connected to SocketServer')
  }

  public createStream(container_ID: string, type: string): Observable<SocketMessage<Message>> {
    if (this.socket == null) return;
    console.log("Metrics subscribed")
    return this.socket.multiplex(
      () => ({ container_id: container_ID, event: 'subscribe', type: type }),
      () => ({ container_id: container_ID, event: 'unsubscribe', type: type }),
      message => message.type === type);
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
