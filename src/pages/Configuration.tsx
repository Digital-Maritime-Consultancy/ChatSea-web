import { Box, Button, CheckBoxGroup, Heading, Main } from "grommet";
import { Certificate } from "pkijs";
import { useMmsContext } from '../context/MmsContext';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useServiceTopic } from "../context/ServiceTopicContext";
import { ServiceInfo, ServiceTopic } from "../models/serviceTopic";

export interface ConfigurationProp {
  connect: () => void;
}

const Configuration = ({ connect }: ConfigurationProp) => {
  const {disconnect} = useMmsContext();
  const navigate = useNavigate();
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

  const handleDisconnect = () => {
    disconnect();
    navigate("/connect");
  }

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
        <Button label="Disconnect" secondary onClick={handleDisconnect} margin={{ top: "medium" }} />
      </Box>
      </Box>
    </Main>
  );
}

export default Configuration;