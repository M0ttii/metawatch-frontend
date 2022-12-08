import { Log } from "./log.model";

export interface SocketMessage{
    container_id: string;
    type: string;
    message: Log;

}