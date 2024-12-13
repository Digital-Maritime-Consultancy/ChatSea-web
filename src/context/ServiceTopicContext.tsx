import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserServiceSubscription } from '../backend-api/saas-management';

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
    chosenServiceNames: string[];
    setChosenServiceNames: React.Dispatch<React.SetStateAction<string[]>>;
    mySubscriptions: UserServiceSubscription[];
    setMySubscriptions: React.Dispatch<React.SetStateAction<UserServiceSubscription[]>>;
}

// Create the context
const ServiceTopicContext = createContext<ServiceTopicContextType | undefined>(undefined);

// Create the provider component
const ServiceTopicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allowedServices, setAllowedServices] = useState<ServiceInfo[]>([]);
    const [chosenService, setChosenService] = useState<string[]>(allowedServices.map((service) => service.name));
    const [mySubscriptions, setMySubscriptions] = useState<UserServiceSubscription[]>([]);
    return (
        <ServiceTopicContext.Provider value={{ allowedServices, setAllowedServices, chosenServiceNames: chosenService, setChosenServiceNames: setChosenService, mySubscriptions: mySubscriptions, setMySubscriptions: setMySubscriptions }}>
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