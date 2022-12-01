import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private url: string = "http://localhost:8080/containers/all";
  private localFile: string = "assets/testlog.json";

  constructor(private http: HttpClient) {

  }

  public getAllContainers(): Observable<Container[]>{
    return this.http.get<Container[]>(this.url);
  }

  public getLogs(): Observable<Log[]>{
    return this.http.get<Log[]>(this.localFile);
  }

}
