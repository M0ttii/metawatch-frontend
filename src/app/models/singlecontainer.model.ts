import { ContainerState } from "../services/containerstate.enum";

export interface SingleContainer {
    id: string;
    name: string;
    image: string;
    state: State;
    networks: Network[];
}

export interface State {
    status: string;
    since: Date;
    restartpolicy: string;
}

export interface Network{
    name: string;
    id: string;
    ip: string;
}