import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { SocketMessage } from '../models/socketmessage.model';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  public socket: WebSocketSubject<SocketMessage>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */

  constructor() {
    //Sends {"subscribe":"metrics"} to server
    //Server knows that client want to get metrics
    /* this.subMetrics = this.metricsObservable.subscribe(
      messageForB => 
      console.log(messageForB)); */
  }

  public connectToSocketServer(uri: string): WebSocketSubject<SocketMessage>{
    if (this.socket == undefined){
      this.socket = webSocket<SocketMessage>(uri);
      return this.socket
    }
    return this.socket;
  }

  public createStream(container_ID: string, type: string): Observable<SocketMessage>{
    if (this.socket == null) return;
    return this.socket.multiplex(
      () => ({container_id: container_ID, event: 'subscribe', type: type}),
      () => ({container_id: container_ID, event: 'unsubscribe', type: type}),
      message => message.type === type);
  }
}
