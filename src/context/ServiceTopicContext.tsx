import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the ServiceInfo and ServiceTopic types
interface ServiceInfo {
    name: string;
    value: ServiceTopic;
    link: string;
}

enum ServiceTopic {
    S124 = 's-124',
    ARP = 'arp',
    CHAT = 'chat',
}

// Define the context type
interface ServiceTopicContextType {
    allowedServices: ServiceInfo[];
    setAllowedServices: React.Dispatch<React.SetStateAction<ServiceInfo[]>>;
    chosenService: string[];
    setChosenService: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context
const ServiceTopicContext = createContext<ServiceTopicContextType | undefined>(undefined);

// Create the provider component
const ServiceTopicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allowedServices, setAllowedServices] = useState<ServiceInfo[]>([
        { name: 'Navigational Warning', value: ServiceTopic.S124, link: '/s124' },
        { name: 'Route Planning', value: ServiceTopic.ARP, link: '/routeplan' },
        { name: 'Chat', value: ServiceTopic.CHAT, link: '/chat' },
    ]);

    const [chosenService, setChosenService] = useState<string[]>(allowedServices.map((service) => service.name));

    return (
        <ServiceTopicContext.Provider value={{ allowedServices, setAllowedServices, chosenService, setChosenService }}>
            {children}
        </ServiceTopicContext.Provider>
    );
};

// Create the useServiceTopic hook
const useServiceTopic = () => {
    const context = useContext(ServiceTopicContext);
    if (context === undefined) {
        throw new Error('useServiceTopic must be used within a ServiceTopicProvider');
    }
    return context;
};

export { ServiceTopicProvider, useServiceTopic };