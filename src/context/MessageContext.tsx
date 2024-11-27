import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface MsgContextType {
  senderMrn : string
  mmtpMsgData : Uint8Array,
}


interface Props {
  children: ReactNode;
}

// Context 생성
const MsgStateContext = createContext({} as MsgContextType);
const MsgDispatchContext = createContext<Dispatch<SetStateAction<MsgContextType>>>(() => {});

// Provider 생성
export const MsgContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<MsgContextType>({
    senderMrn: "",
    mmtpMsgData:  new Uint8Array(0)
  });
  return (
    <MsgStateContext.Provider value={state}>
      <MsgDispatchContext.Provider value={setState}>
        {children}
      </MsgDispatchContext.Provider>
    </MsgStateContext.Provider>
  );
};

// Custom Hooks
export const useMsgState = () => useContext(MsgStateContext);
export const useMsgStateDispatch = () => useContext(MsgDispatchContext);
