import { Message } from './message.model';

export interface SocketMessage{
    container_id: string;
    type: string;
    message: Message;

}