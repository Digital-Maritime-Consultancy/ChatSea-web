export enum ServiceTopic {
    S124 = "s-124",
    ARP = "arp",
    CHAT = "chat",
    CERT = "cert"
}

export interface ServiceInfo {
    name: string;
    value: ServiceTopic;
    link: string;
}