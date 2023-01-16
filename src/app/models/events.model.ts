export interface EventMessage {
    type: string;
    message: Message;
}

export interface Message {
    type: string;
    id: string;
}