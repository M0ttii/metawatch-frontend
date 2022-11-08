import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Containers } from '../models/containers.model';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private url: string = "http://localhost:8080/containers/all";

  constructor(private http: HttpClient) {

  }

  public getAllContainers(): Observable<Containers>{
    return this.http.get<Containers>(this.url);
  }

}
