import React, {createContext, useContext, useEffect, useState} from 'react';
import useWs from '../hooks/useWs';
import {Certificate} from "pkijs";
import {getConnectMsg, sendDirectMsg, sendMsg, sendSubjectMsg} from "../mms-browser-agent/core"; // Import the WebSocket management hook


// Define the MMS context type
interface MmsContextType {
  mrn: string;
  connected: boolean; // MMS connection state
  connect: (url: string, sk: CryptoKey, cert: Certificate, mrn : string) => void; // Connect to MMS
  disconnect: () => void; // Disconnect from MMS
  sendDirect: (subj : string, body : Uint8Array) => void;
  sendSubject: (receiver : string, body : Uint8Array) => void;
  signingKey: CryptoKey | undefined;
  certificate: Certificate | undefined;
}

// Create the context
const MmsContext = createContext<MmsContextType | undefined>(undefined);

// Provider component
export const MmsProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const [url, setUrl] = useState(''); // Store WebSocket URL
  const { connectWs, disconnectWs, wsIsConnected, getWs } = useWs(); // Manage WebSocket connection
  const [connected, setConnected] = useState(false);
  const [mrn, setMrn] = useState('');
  const [signingKey, setSigningKey] = useState<CryptoKey | undefined>(undefined);
  const [certificate, setCertificate] = useState<Certificate | undefined>(undefined);


  useEffect(() => {
    console.log("Ws is connected", wsIsConnected);

    const handleConnectMmtp = async () => {
      try {
        await connectMmtp(); // Await and handle errors
        setConnected(true);
      } catch (error) {
        console.error("Error during connectMmtp:", error);
      }
    };

    if (wsIsConnected) {
      handleConnectMmtp(); // Call the async wrapper
    } else {
      setConnected(false);
    }
  }, [wsIsConnected]);



  useEffect(() => {
    return () => {
      console.log('Cleaning up WebSocket and resetting state...');
      disconnect();
    };
  }, []);

  // MMS-specific connect method
  const connect = (url : string, sk : CryptoKey, cert : Certificate, mrn : string) => {
    setUrl(url)
    setMrn(mrn)
    if (sk) {
      setSigningKey(sk);
    } else {
      console.log("NO SIGNING KEY!!")
    }
    if (cert) {
      setCertificate(cert)
      setMrn(readMrnFromCert(cert))
      console.log("Mrn set to", mrn)
    }
    connectWs(url) //setup the ws first
  };

  const connectMmtp = async () => {
    if (wsIsConnected) {
      console.log("MMS Connected");

      let connectMsg = getConnectMsg(mrn)
      let ws = getWs()
      if (ws) {
        await sendMsg(connectMsg, ws)
      } else {
        throw ("Invalid websocket connection");
      }
    }
    //Some mmtp logic
  }

  const sendSubject = async (subj : string, body : Uint8Array) => {
    console.log("send subject", subj);
    let ws = getWs()
    console.log("ws is", ws)
    console.log("sk is", signingKey)
    console.log("wsConnected is", wsIsConnected)
    if (wsIsConnected && signingKey && ws) {
      console.log("OK")
      await sendSubjectMsg(subj, body, signingKey, ws, mrn)
      console.log("SubjectCast Msg sent")
    } else {
      console.log("Problem")
    }
  }
  const sendDirect = async (receiver : string, body : Uint8Array) => {
    let ws = getWs()
    if (wsIsConnected && signingKey && ws) {
      await sendDirectMsg(body, receiver, signingKey, ws, mrn)
      console.log("Direct Msg sent")
    }
  }

  // MMS-specific disconnect method
  const disconnect = () => {
    disconnectWs(); // Close WebSocket connection
    setConnected(false); // Update MMS connection state
  };

  const readMrnFromCert = (cert: Certificate): string => {
    let ownMrn = "";
    if (cert) {
      console.log("Have a cert")
      for (const rdn of cert.subject.typesAndValues) {
        console.log("loop")
        if (rdn.type === "0.9.2342.19200300.100.1.1") {
          ownMrn = rdn.value.valueBlock.value;
          break;
        }
      }
    }
    return ownMrn;
  }

  return (
    <MmsContext.Provider value={{ mrn, connected, connect, disconnect, sendDirect, sendSubject, certificate, signingKey}}>
      {children}
    </MmsContext.Provider>
  );
};

// Custom hook to consume the context
export const useMmsContext = (): MmsContextType => {
  const context = useContext(MmsContext);
  if (!context) {
    throw new Error('useMmsContext must be used within an MmsProvider');
  }
  return context;
};
