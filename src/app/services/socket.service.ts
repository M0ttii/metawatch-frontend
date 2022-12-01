import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  public socket: WebSocketSubject<{type: string, message: string}>;/* webSocket<{type: string, message: string}>('ws://localhost:8001') */

  constructor() {
    //Sends {"subscribe":"metrics"} to server
    //Server knows that client want to get metrics
    /* this.subMetrics = this.metricsObservable.subscribe(
      messageForB => 
      console.log(messageForB)); */
  }

  public connectToSocketServer(uri: string): WebSocketSubject<{type: string, message: string}>{
    if (this.socket == undefined){
      this.socket = webSocket<{type: string, message: string}>(uri);
      return this.socket
    }
    return this.socket;
  }

  public createStream(container_ID: string, type: string): Observable<{type: string, message: string}>{
    if (this.socket == null) return;
    return this.socket.multiplex(
      () => ({container_id: container_ID, event: 'subscribe', type: type}),
      () => ({container_id: container_ID, event: 'unsubscribe', type: type}),
      message => message.type === type);
  }
}
