import { ContainerState } from "../services/containerstate.enum";

export interface Container {
    id: string;
    names: string[];
    image: string;
    state: State;
    stateEnum: ContainerState;
}

export interface State {
    status: string;
    since: Date;
}