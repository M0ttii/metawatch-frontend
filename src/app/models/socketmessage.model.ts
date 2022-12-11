export interface SocketMessage<T>{
    container_id: string;
    type: string;
    message: T;
}