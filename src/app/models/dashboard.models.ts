export interface Volume {
    name: string;
    mountpoint: string;
    driver: string;
    used_by: number;
    size: number;
    size_string: string;
    created: string;
}

export interface Image {
    id: string;
    tag: string;
    size: number;
    size_string: string;
    created: string;
}

export interface About {
    version: string;
    api_version: string;
    os: string;
    image_n: number;
    container_n: number;
    cups: number;
    max_mem: number;
    max_mem_string: string;
}