import { Injectable } from '@angular/core';
import { ContainerState } from './containerstate.enum';

@Injectable({
  providedIn: 'root'
})
export class ContainerserviceService {
  public containers = [{name: "seafile", id:"f3f22sg4", image:"lscr.io/linuxserver/syncthing", state: ContainerState.Exited, port:"80"},
                          {name: "wireguard", id:"kgsu32fbv", image:"lscr.io/linuxserver/wireguard", state: ContainerState.Exited, port:"443"},
                          {name: "gotify", id:"k4jhcs8", image:"ghcr.io/gotify/server", state: ContainerState.Running, port:"81"},
                          {name: "seafile", id:"hgn744g", image:"lscr.io/linuxserver/seafile", state: ContainerState.Running, port:"81"},
                          {name: "mongodb", id:"xd83vb3", image:"lscr.io/linuxserver/mongodb", state: ContainerState.Running, port:"81"},
                          {name: "redis", id:"l92cb33", image:"lscr.io/linuxserver/redis", state: ContainerState.Running, port:"81"}];

  constructor() { }


  public getStateNameAndColor(stateEnum: ContainerState): string[]{
    switch (stateEnum){
      case ContainerState.Running:
        return new Array("Running", "#14e86c");
      case ContainerState.Restarting:
        return new Array("Restarting", "#f08426");
      case ContainerState.Exited:
        return new Array("Exited", "#f02634");
      case ContainerState.Paused:
        return new Array("Paused", "#f08426");
      case ContainerState.Dead:
        return new Array("Dead", "#f02634");
      case ContainerState.Created:
        return new Array("Created", "#14e86c")
    }
    

  }
}
