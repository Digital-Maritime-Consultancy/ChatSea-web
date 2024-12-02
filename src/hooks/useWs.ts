import { useState, useEffect, useRef, useCallback } from 'react';
import { MmtpMessage, MsgType, ProtocolMessageType, Receive, Filter } from '../mms/mmtp';



const useWs = () => {
  const [wsIsConnected, setWsIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null); // Persistent WebSocket instance
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const [messageQueue, setMessageQueue] = useState<MmtpMessage[]>([]);

  const dequeueMessage = useCallback((): MmtpMessage => {
    // Access the current state synchronously
    const currentQueue = [...messageQueue];

    if (currentQueue.length === 0) {
      throw new Error("Queue is empty. Cannot dequeue a message.");
    }

    // Dequeue the first message
    const dequeuedMessage = currentQueue[0];

    // Update the state without the dequeued message
    setMessageQueue(currentQueue.slice(1));

    return dequeuedMessage;
  }, [messageQueue]);



  const enqueueMessage = useCallback((message: MmtpMessage) => {
    setMessageQueue((prevQueue: MmtpMessage[]) => [...prevQueue, message]);
  }, []);

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
        try {
          const data = msgEvent.data as Blob;
          const bytes = await data.arrayBuffer();
          const msg = MmtpMessage.decode(new Uint8Array(bytes));
          enqueueMessage(msg)
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      wsRef.current.onclose = (evt) => {
        console.log("WS CLoses")
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
    messageQueue,
    dequeueMessage,
    connectWs,
    disconnectWs,
    wsIsConnected,
    getWs: () => wsRef.current, // Expose the WebSocket instance
  };
};

export default useWs;
