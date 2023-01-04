import { ContainerState } from "../services/containerstate.enum";

export interface Container {
    id: string;
    name: string;
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