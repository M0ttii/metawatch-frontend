import { Message } from './message.model';

export interface SocketMessage<T>{
    container_id: string;
    type: string;
    message: T;

}