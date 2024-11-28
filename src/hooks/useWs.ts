import { useState, useEffect, useRef } from 'react';
import { MmtpMessage, MsgType, ProtocolMessageType, Receive, Filter } from '../mms/mmtp'; // Import relevant types and helpers
import { v4 as uuidv4 } from 'uuid';
import {useMsgStateDispatch} from "../context/MessageContext";
import {verifySignatureOnMessage} from "../mms-browser-agent/core";

const useWs = () => {
  const [wsIsConnected, setWsIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null); // Persistent WebSocket instance
  const [wsUrl, setWsUrl] = useState<string | null>(null);

  // Connect to WebSocket
  const connectWs = (url: string) => {
    setWsUrl(url);
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setWsIsConnected(true);
      };

      wsRef.current.onmessage = async (msgEvent) => {
        console.log("NEW INCOMING MSG");
        try {
          const data = msgEvent.data as Blob;
          const bytes = await data.arrayBuffer();
          const msg = MmtpMessage.decode(new Uint8Array(bytes));
          console.log("Decoded message:", msg);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      wsRef.current.onclose = (evt) => {
        if (evt.code !== 1000) {
          alert("Connection to Edge Router closed unexpectedly: " + evt.reason);
        }
        console.log('WebSocket disconnected');
        setWsIsConnected(false);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  };

  // Disconnect from WebSocket
  const disconnectWs = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  return {
    connectWs,
    disconnectWs,
    wsIsConnected,
    getWs: () => wsRef.current, // Expose the WebSocket instance
  };
};

export default useWs;
