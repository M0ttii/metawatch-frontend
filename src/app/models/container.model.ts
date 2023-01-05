import { ContainerState } from "../services/containerstate.enum";

export interface Container {
    id: string;
    name: string;
    ports: Port[];
    image: Image;
    state: State;
    stateEnum: ContainerState;
}

export interface State {
    status: string;
    since: Date;
    restart_policy: string;
}

export interface Image {
    created: Date;
    id: string;
    size: number;
    tag:  string;
}

export interface Port {
    port:  string;
    proto: string;
    host_ip: string;
    host_port: string;
}