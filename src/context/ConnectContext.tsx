import { Certificate } from 'pkijs';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface ConnectContextType {
  mrn: string;
  connected: boolean;
  certificate: Certificate | undefined;
  privateKey: CryptoKey | undefined;
  privateKeyEcdh: CryptoKey | undefined;
  ws: WebSocket | undefined;
  wsUrl: string;
}


interface Props {
  children: ReactNode;
}

// Context 생성
const ConnectionStateContext = createContext({} as ConnectContextType);
const ConnectionDispatchContext = createContext<Dispatch<SetStateAction<ConnectContextType>>>(() => {});

// Provider 생성
export const ConnectionContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<ConnectContextType>({
    mrn: "",
    connected: false,
    certificate: undefined,
    privateKey: undefined,
    privateKeyEcdh: undefined,
    ws: undefined,
    wsUrl: "",
  });
  return (
    <ConnectionStateContext.Provider value={state}>
      <ConnectionDispatchContext.Provider value={setState}>
        {children}
      </ConnectionDispatchContext.Provider>
    </ConnectionStateContext.Provider>
  );
};

// Custom Hooks
export const useConnectionState = () => useContext(ConnectionStateContext);
export const useConnectionStateDispatch = () => useContext(ConnectionDispatchContext);
