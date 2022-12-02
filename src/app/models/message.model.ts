export interface Message {
    when: string;
    cpu: {
        perc: number;
        online: number;
    }
    disk: {
        read: number;
        write: number;
    }
    memory: {
        perc: number;
        usage_bytes: number;
        available_bytes: number;
    }
    net: {
        in: number;
        out: number;
    }
}