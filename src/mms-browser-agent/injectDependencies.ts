import { useEffect } from "react";
import { useConnectionState } from "../context/ConnectContext";
import {initLegacyDependencies} from "./core";

export const useInjectDependencies = () => {
  const connectionState = useConnectionState();

  useEffect(() => {
    // Pass connectionState to initialize the global state
    initLegacyDependencies({
      ws: connectionState.ws,
      ownMrn: connectionState.mrn,
      privateKey: connectionState.privateKey,
    });
  }, [connectionState]);
};
