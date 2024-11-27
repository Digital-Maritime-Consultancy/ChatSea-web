import { Box, Button, CheckBoxGroup, FileInput, Heading, Main, Paragraph, Select } from "grommet";
import { useContext, useState } from "react";
import { useConnectionState, useConnectionStateDispatch } from "../context/ConnectContext";
import { loadCertAndPrivateKeyFromFiles } from "../mms-browser-agent/core";
import { Certificate } from "pkijs";
import { ServiceInfo, ServiceTopic } from "../models/serviceTopic";
import { useServiceTopic } from "../context/ServiceTopicContext";

export interface ConfigurationProp {
  connect: () => void;
}

const Configuration = ({ connect }: ConfigurationProp) => {
  const connectionState = useConnectionState();
  const setConnectionState = useConnectionStateDispatch();
  const [certFile, setCertFile] = useState<File | null>(null);
  const [privKeyFile, setPrivKeyFile] = useState<File | null>(null);
  const [wsUrl, setWsUrl] = useState<string>("");
  const {allowedServices, setAllowedServices, chosenService, setChosenService} = useServiceTopic();
  
  const serviceTopics = allowedServices.map((service) => service.name);

  const readMrnFromCert = (cert: Certificate): string => {
    let ownMrn = "";
    for (const rdn of cert.subject.typesAndValues) {
      if (rdn.type === "0.9.2342.19200300.100.1.1") {
        ownMrn = rdn.value.valueBlock.value;
        break;
      }
    }
    return ownMrn;
  }

  const handleSave = () => {
    console.log("Config done");
  };

  return (
    <Main pad="large">
      <Heading>Configuration</Heading>
      <Box>
        <Heading level={3}>Select Service</Heading>
        <Box pad="medium">
        <CheckBoxGroup
        value={chosenService}
        onChange={(event: any) => {
          setChosenService(event.value);
        }}
        options={serviceTopics}
      />
        </Box>
      <Box pad={{ top: "medium" }}>
        <Button label="Save" primary onClick={handleSave} />
      </Box>
      </Box>
    </Main>
  );
}

export default Configuration;