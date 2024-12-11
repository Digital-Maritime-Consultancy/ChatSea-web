import React, {createContext, useContext, useEffect, useState} from 'react';
import useWs from '../hooks/useWs';
import {Certificate} from "pkijs";
import {
  getConnectMsg,
  sendDirectMsg, sendDisconnect,
  sendMsg,
  sendMsgReceive,
  sendSubjectMsg,
  sendSubName,
  sendSubOwnMrn
} from "../mms-browser-agent/core";
import {MsgType, ProtocolMessageType, ResponseEnum} from "../mms/mmtp";
import {useMsgState, useMsgStateDispatch} from "./MessageContext"; // Import the WebSocket management hook


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
  const { connectWs, disconnectWs, wsIsConnected, getWs, dequeueMessage, messageQueue } = useWs(); // Manage WebSocket connection
  const [connected, setConnected] = useState(false);
  const [mrn, setMrn] = useState('');
  const [signingKey, setSigningKey] = useState<CryptoKey | undefined>(undefined);
  const [certificate, setCertificate] = useState<Certificate | undefined>(undefined);
  const setMsgState = useMsgStateDispatch();
  const msgState = useMsgState();


  useEffect(() => {
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
    const handleSubSetup = async () => {
      console.log("Attempt subscribe to own MRN")
      try {
        let ws = getWs()
        if (ws) {
          await sendSubOwnMrn(mrn, ws);
          // subscribe S-124 by default
          await subscribe('s-124');
        } else {
          console.error("Error no websocket:", ws);
        }
      } catch (error) {
        console.error("Error during attempting to subscribe to own MRN adressed messages:", error);
      }
    };

    if (connected) {
      handleSubSetup(); // Call the async wrapper
    }
  }, [connected]);

  useEffect(() => {
    if (messageQueue.length > 0 ) {
      const newMsg = dequeueMessage(); // Assuming dequeueMessage always returns MmtpMessage
      if (newMsg && newMsg.msgType === MsgType.RESPONSE_MESSAGE) {
        if (newMsg.responseMessage?.response === ResponseEnum.ERROR) {
          console.error(newMsg);
          return
        }
        const msgs = newMsg.responseMessage?.applicationMessages;

        if (msgs) {
          for (const msg of msgs) {
            if (msg.body && msg.header?.sender) {
              console.log("--------Set msg state done!, sender is-------", msg.header?.sender) //Pass using the MsgStateContext
              setMsgState({
                ...msgState,
                mmtpMsgData: msg.body,
                senderMrn: msg.header.sender,
              });
            }
          }
        }
      } else if (newMsg && newMsg.msgType === MsgType.PROTOCOL_MESSAGE) {
        if (
          newMsg.protocolMessage?.protocolMsgType ===
          ProtocolMessageType.NOTIFY_MESSAGE
        ) {
          const ws = getWs();

          if (ws) {
            sendMsgReceive(ws); // Acknowledge the protocol message
            return; // Exit early if processing is complete
          }
        }
      } else {
        console.error("Unknown msg err", newMsg);
      }
    } else {
      console.log("No new messages to process");
    }
  }, [messageQueue]);




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

  const subscribe = async (subj: string) => {
    console.log("subscribe subject", subj);
    let ws = getWs()
    if (wsIsConnected && ws) {
      await sendSubName(subj, ws)
      console.log("Subscribe Msg sent")
    } else {
      console.log("Problem")
    }
  }

  const sendSubject = async (subj : string, body : Uint8Array) => {
    console.log("send subject", subj);
    let ws = getWs()
    if (wsIsConnected && signingKey && ws) {
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
  const disconnect = async () => {
    console.log("Call DIsconnect")
    let ws = getWs()
    if (ws) {
      await sendDisconnect(ws) //Properly await the MMTP disconnect before terminating the websocket
      setConnected(false)
      disconnectWs()
      console.log("Websocket disconnected")
    } else {
      console.error("Could not terminate MMTP - No Websocket")
    }
    setMrn(''); // Reset MRN
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
