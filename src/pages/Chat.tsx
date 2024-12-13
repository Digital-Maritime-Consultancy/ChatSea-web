import React, { useEffect, useState } from "react";
import { Box, Button, Heading, TextInput, Select, TextArea, RadioButtonGroup, FileInput } from "grommet";
import { useMsgState, useMsgStateDispatch } from "../context/MessageContext";
import { getS100FileName, isS100File } from "../util/S100FileUtil";
import { useMmsContext } from '../context/MmsContext';
import { MyUserControllerApi } from "../backend-api/saas-management/apis/my-user-controller-api";
import { Configuration, Service, UserServiceUsageDto } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import useKeycloak from "../hooks/useKeycloak";
import { getAllActiveServices, getOrgServiceUsageCost, getServiceCostLimit, reportUsage } from "../util/saasAPICaller";

const Chat = () => {
  const { keycloak, token, orgMrn } = useKeycloak();
  const [receiverType, setReceiverType] = useState("");
  const [receiverMrn, setReceiverMrn] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const msgState = useMsgState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const mrnPlaceholder = "urn:mrn:mcp:device:mcc:core:abc"
  const [messagePlaceholder, setMessagePlaceholder] = useState("Write Message Here"); // State for placeholder
  const [sendBtnPlaceholder, setSendBtnPlaceholder] = useState("Send"); // State for placeholder
  const { connected, signingKey, sendDirect, sendSubject } = useMmsContext();
  const [serviceId, setServiceId] = useState(0);
  const [serviceUnitPrice, setServiceUnitPrice] = useState(0);

  useEffect(() => {
  }, [useMmsContext()]); //Do something whenever ConnetioNState updates

  useEffect(() => {
    if (!connected) {
      return;
    }
    getAllActiveServices(keycloak!, token).then((response) => {
      const services = response.data.content;
      const service = services.find((service: Service) => service.name === 'Chat');
      if (service === undefined) {
          alert('Service is not active for you');
      } else {
          setServiceId(service.id);
          setServiceUnitPrice(service.unitPrice);
      }
  });
  }, [connected]); 

  useEffect(() => {
    if (msgState && msgState.senderMrn && msgState.mmtpMsgData.length > 0) {
      // Decode the Uint8Array into a string
      const decodedData = new TextDecoder().decode(msgState.mmtpMsgData);

      // Construct the display message
      let displayMessage = "";
      if (isS100File(decodedData)) {
        displayMessage = `Sender: ${msgState.senderMrn}\nMessage: ${getS100FileName(decodedData)}`;
      } else {
        displayMessage = `Sender: ${msgState.senderMrn}\nMessage: ${decodedData}`;
      }
      // Prepend the new message to the receivedMessages array
      addChatMessage(displayMessage);
    }
  }, [msgState]);

  const canUseService = async (incomingUsageAmount: number = 0) => 
  {
      const limit = await getServiceCostLimit(keycloak!, token, orgMrn);
      const usage = await getOrgServiceUsageCost(keycloak!, token, orgMrn);
      const response = await getAllActiveServices(keycloak!, token);
      const services = response.data.content;
      const service = services.find((service: Service) => service.name === 'Chat');
      if (service === undefined) {
        alert('Service is not active for you');
          return false;
      } else {
        setServiceId(service.id);
        setServiceUnitPrice(service.unitPrice);
        if (usage + incomingUsageAmount * service.unitPrice < limit){
            return true;
        } else {
            alert('Service limit reached! Current usage: ' + (usage + incomingUsageAmount * service.unitPrice) + ' / Limit: ' + limit);
            return false;
        }
      }
  }

  const addChatMessage = (message: string) => {
    setReceivedMessages((prevMessages) => [message, ...prevMessages]);
  }

  const handleSendClick = async () => {
    if (!await canUseService()) {
      return;
    }
    const encoder = new TextEncoder();
    if (receiverType == "subject") {
      sendSubject(selectedSubject, encoder.encode(message))
    } else if (receiverType == "mrn") {
      sendDirect(receiverMrn, encoder.encode(message))
    }
    setMessage("")
    setMessagePlaceholder("Message Sent");
    setTimeout(() => setMessagePlaceholder("Write Message Here"), 3000); // Reset after 3 seconds
    reportUsage(keycloak!, token, serviceId, 1, serviceUnitPrice).then((data) => {
      console.log(data);
    });
  };

  return (
    <Box pad="medium">
      {/* Header */}
      <TextArea
        placeholder="No messages received yet"
        readOnly // Makes the TextArea read-only
        resize={true} // Prevents resizing
        value={receivedMessages.length > 0 ? receivedMessages.join("\n") : ""} // Displays messages only if available
        style={{ minHeight: "500px", minWidth: "400px" }} // Sets a larger default size
      />
      <hr />

      {/* SMMP Session Establishment 
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
              </Box>
            </Box>
          </Box>
          <hr />
        </>
      )}
      */}

      {/* Send Message - renders only if we have a connection, should be only if auth*/}
      {connected && (
        <Box pad={{ top: "medium" }}>
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
            {/* <Button label="Send Smmp" secondary /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
