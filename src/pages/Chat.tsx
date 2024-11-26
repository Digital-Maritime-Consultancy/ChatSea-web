import React, {useEffect, useState} from "react";
import { Box, Button, Heading, TextInput, Select, TextArea, RadioButtonGroup, FileInput } from "grommet";
import {useConnectionState} from "../context/ConnectContext";
import {sendDirectMsg, sendSubjectMsg} from "../mms-browser-agent/core";
import {useInjectDependencies} from "../mms-browser-agent/injectDependencies";
import {useMsgState, useMsgStateDispatch} from "../context/MessageContext";
import { getS100FileName, isS100File } from "../util/S100FileUtil";

const Chat = () => {
  const [receiverType, setReceiverType] = useState("");
  const [receiverMrn, setReceiverMrn] = useState("");
  const [mrn, setMrn] = useState("");
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const connectionState = useConnectionState();
  const msgState = useMsgState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const mrnPlaceholder = "urn:mrn:mcp:device:mcc:core:abc"
  const [messagePlaceholder, setMessagePlaceholder] = useState("Write Message Here"); // State for placeholder
  const [sendBtnPlaceholder, setSendBtnPlaceholder] = useState("Send"); // State for placeholder


  useInjectDependencies();

  useEffect(() => {
      setMrn(connectionState.mrn); //Updates mrn variable
      setWs(connectionState.ws)
  }, [connectionState]); //Do something whenever ConnetioNState updates

  useEffect(() => {
    if (msgState && msgState.senderMrn && msgState.mmtpMsgData.length > 0) {
      // Decode the Uint8Array into a string
      const decodedData = new TextDecoder().decode(msgState.mmtpMsgData);

      if (isS100File(decodedData)) {
        // Construct the display message
        const displayMessage = `Sender: ${msgState.senderMrn}\nMessage: ${getS100FileName(decodedData)}`;
        // Prepend the new message to the receivedMessages array
        addChatMessage(displayMessage);
      } else {
        // Construct the display message
        const displayMessage = `Sender: ${msgState.senderMrn}\nMessage: ${decodedData}`;
        // Prepend the new message to the receivedMessages array
        addChatMessage(displayMessage);
      }
    }
  }, [msgState]);

  const addChatMessage = (message: string) => {
    setReceivedMessages((prevMessages) => [message, ...prevMessages]);
  }

  const handleSendClick = async () => {
    const encoder = new TextEncoder();
    if (receiverType == "subject") {
      await sendSubjectMsg(selectedSubject, encoder.encode(message))
    } else if (receiverType == "mrn") {
      await sendDirectMsg(selectedSubject, encoder.encode(message), receiverMrn)
    }
    setMessage("")
    setMessagePlaceholder("Message Sent");
    setTimeout(() => setMessagePlaceholder("Write Message Here"), 3000); // Reset after 3 seconds
  };

  return (
    <Box pad="medium">
      {/* Header */}
      <Box direction="row" justify="between" align="center">
        <Heading level={1} margin="none">{mrn}</Heading>
      </Box>
      <hr />

      {/* SMMP Session Establishment */}

      {connectionState.connected && (
        <>
          <Box direction="row" gap="large" pad={{ top: "medium" }}>
            <Box basis="1/2">
              <Heading level={3}>SMMP Session Establishment</Heading>
              <TextInput
                placeholder="Remote client MRN, e.g. urn:mrn:mcp:device:mcc:core:abc"
                onChange={(event) => setReceiverMrn(event.target.value)}
              />
              <Button label="Connect SMMP" primary margin={{ top: "medium" }} />
            </Box>
            <Box basis="1/2">
              <Heading level={3}>Active SMMP Sessions</Heading>
              <Box hidden>
                {/* Active SMMP Sessions will be rendered here */}
              </Box>
            </Box>
          </Box>
          <hr />
        </>
      )}

      {/* Send Message - renders only if we have a connection, should be only if auth*/}
      {connectionState.connected && (
        <Box pad={{ top: "medium" }}>
          <Heading level={3}>Send Message</Heading>
          <RadioButtonGroup
            name="receiverType"
            options={[
              { label: "Direct Message", value: "mrn" },
              { label: "Subject", value: "subject" },
            ]}
            value={receiverType}
            onChange={(event) => setReceiverType(event.target.value)}
          />
          {receiverType === "mrn" && (
            <TextInput
              placeholder={mrnPlaceholder}
              onChange={(event) => setReceiverMrn(event.target.value)}
            />
          )}
          {receiverType === "subject" && (
            <Select
              options={["MCP", "s-124", "s-125"]}
              placeholder="Select a subject"
              margin={{ top: "small" }}
              value={selectedSubject}
              onChange={({ option }) => setSelectedSubject(option)}
            />
          )}
          <TextArea
            placeholder={messagePlaceholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            resize={false}
          />
          <FileInput
            name="file"
            onChange={(event) => setFile(event.target.files![0])}
          />
          <Box direction="row" gap="small" margin={{ top: "medium" }}>
            <Button label={sendBtnPlaceholder} primary onClick={handleSendClick} />
            <Button label="Send Smmp" secondary />
          </Box>
        </Box>
      )}
      <hr />
      <Heading level={3}>Received Messages</Heading>
      <TextArea
        placeholder="No messages received yet"
        readOnly // Makes the TextArea read-only
        resize={true} // Prevents resizing
        value={receivedMessages.length > 0 ? receivedMessages.join("\n") : ""} // Displays messages only if available
        style={{ minHeight: "200px", minWidth: "400px" }} // Sets a larger default size
      />
    </Box>
  );
};

export default Chat;
