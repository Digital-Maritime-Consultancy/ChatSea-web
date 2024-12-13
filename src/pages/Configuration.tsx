import { Box, Button, CheckBoxGroup, Heading, Main } from "grommet";
import { Certificate } from "pkijs";
import { useMmsContext } from '../context/MmsContext';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useServiceTopic } from "../context/ServiceTopicContext";
import { ServiceInfo, ServiceTopic } from "../models/serviceTopic";
import useKeycloak from "../hooks/useKeycloak";
import { activateServiceSubscription, deactivateServiceSubscription } from "../util/saasAPICaller";

export interface ConfigurationProp {
  connect: () => void;
}

const Configuration = ({ connect }: ConfigurationProp) => {
  const {disconnect} = useMmsContext();
  const navigate = useNavigate();
  const { keycloak, token } = useKeycloak();
  const {allowedServices, setAllowedServices, chosenServiceNames, setChosenServiceNames, mySubscriptions} = useServiceTopic();
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
    // iterate allowedServices
    allowedServices.forEach((service) => {
      const serviceName = service.name;
      // iterate possibleSubscriptions
      mySubscriptions.forEach((sub) => {
        if (sub.serviceSubscription!.service!.name === serviceName) {
          // update subscription if activity changes
          if (chosenServiceNames.includes(serviceName) && !sub.isActive) {
            activateServiceSubscription(keycloak!, token, sub.id!);
          } else if (!chosenServiceNames.includes(serviceName) && sub.isActive) {
            deactivateServiceSubscription(keycloak!, token, sub.id!);
          } else {
            alert("You need to create user service subscription for the service first");
          }
        }
      });
    });
    console.log(chosenServiceNames);
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
        value={chosenServiceNames}
        onChange={(event: any) => {
          setChosenServiceNames(event.value);
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