import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Container } from '../models/container.model';
import { Containers } from '../models/containers.model';
import { Volume, Image, About } from '../models/dashboard.models';
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

  public getVolumes(): Observable<Volume[]>{
    return this.http.get<Volume[]>(this.url + 'volumes');
  }

  public getImages(): Observable<Image[]>{
    return this.http.get<Image[]>(this.url + 'images');
  }

  public getDockerStats(): Observable<About>{
    return this.http.get<About>(this.url + 'about');
  }

}
