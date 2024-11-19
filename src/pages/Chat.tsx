import React, { useState } from "react";
import { Box, Button, Heading, TextInput, Select, TextArea, RadioButtonGroup, FileInput } from "grommet";

const Chat = () => {
  const [receiverType, setReceiverType] = useState("");
  const [mrn, setMrn] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <Box pad="medium">
      {/* Header */}
      <Box direction="row" justify="between" align="center">
        <Heading level={1} margin="none">MMS Browser Agent</Heading>
      </Box>
      <hr />

      {/* SMMP Session Establishment */}
      <Box direction="row" gap="large" pad={{ top: "medium" }}>
        <Box basis="1/2">
          <Heading level={3}>SMMP Session Establishment</Heading>
          <TextInput
            placeholder="Remote client MRN, e.g. urn:mrn:mcp:device:mcc:core:abc"
            value={mrn}
            onChange={(event) => setMrn(event.target.value)}
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

      {/* Send Message */}
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
            placeholder="Select MRN"
            value={mrn}
            onChange={(event) => setMrn(event.target.value)}
          />
        )}
        {receiverType === "subject" && (
          <Select
            options={["Subject 1", "Subject 2"]}
            placeholder="Select a subject"
            margin={{ top: "small" }}
          />
        )}
        <TextArea
          placeholder="Write Message Here"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          resize={false}
        />
        <FileInput
          name="file"
          onChange={(event) => setFile(event.target.files![0])}
        />
        <Box direction="row" gap="small" margin={{ top: "medium" }}>
          <Button label="Send" primary />
          <Button label="Send SMMP" />
        </Box>
      </Box>
      <hr />
    </Box>
  );
};

export default Chat;
