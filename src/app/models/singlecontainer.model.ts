import { ContainerState } from "../services/containerstate.enum";

export interface SingleContainer {
    id: string;
    name: string;
    image: Image;
    state: State;
    ports: Port[];
    networks: Network[];
    volumes: Volume[];
}

export interface State {
    status: string;
    since: string;
    restart_policy: string;
    date_distance: string;
}

export interface Volume {
    name: string;
    mountpoint: string;
    size: number;
    used_by: string;
}

export interface Network{
    name: string;
    id: string;
    ip: string;
}

export interface Image{
    id: string;
    tag: string;
    size: number;
    size_string: string;
    created: string;
}

export interface Port {
    port: string;
    proto: string;
    host_ip: string;
    host_port: string;
}