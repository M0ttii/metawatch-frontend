import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { Log } from '../models/log.model';
import { SingleContainer } from '../models/singlecontainer.model';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private url: string = "http://localhost:8080/";
  private localFile: string = "assets/testlog.json";

  constructor(private http: HttpClient) {

  }

  public getAllContainers(): Observable<Container[]>{
    return this.http.get<Container[]>(this.url + 'containers/all');
  }

  public getLogs(): Observable<Log[]>{
    return this.http.get<Log[]>(this.localFile);
  }

  public getContainer(id: string): Observable<SingleContainer>{
    return this.http.get<SingleContainer>(this.url + 'containers/' + id);
  }

}
