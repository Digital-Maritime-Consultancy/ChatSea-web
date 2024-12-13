import { Box, Button, CheckBoxGroup, Heading, Main } from "grommet";
import { Certificate } from "pkijs";
import { useMmsContext } from '../context/MmsContext';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useServiceTopic } from "../context/ServiceTopicContext";
import { ServiceInfo, ServiceTopic } from "../models/serviceTopic";
import useKeycloak from "../hooks/useKeycloak";
import { activateServiceSubscription, deactivateServiceSubscription, fetchActiveSubscriptions, fetchPossibleSubscriptions } from "../util/saasAPICaller";
import { UserServiceSubscription } from "../backend-api/saas-management";

export interface ConfigurationProp {
  connect: () => void;
}

const Configuration = ({ connect }: ConfigurationProp) => {
  const {disconnect} = useMmsContext();
  const navigate = useNavigate();
  const { keycloak, token } = useKeycloak();
  const {allowedServices, setAllowedServices, chosenServiceNames, setChosenServiceNames, mySubscriptions, setMySubscriptions} = useServiceTopic();
  const [ serviceNames, setServiceNames ] = useState<string[]>(chosenServiceNames.sort());
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

  const handleSave = async () => {
    // iterate allowedServices
    await allowedServices.forEach((service) => {
      const serviceName = service.name;
      // iterate possibleSubscriptions
      mySubscriptions.forEach((sub) => {
        if (sub.serviceSubscription!.service!.name === serviceName) {
          // update subscription if activity changes
          if (serviceNames.includes(serviceName) && !sub.isActive) {
            console.log("activating", sub.id);
            activateServiceSubscription(keycloak!, token, sub.id!).then((res) => {
              console.log(res);
              updateSubscriptions();
            });
          }
          if (!serviceNames.includes(serviceName) && sub.isActive) {
            console.log("deactivating", sub.id);
            deactivateServiceSubscription(keycloak!, token, sub.id!).then((res) => {
              console.log(res);
              updateSubscriptions();
            });
          }
        }
      });
    });
    setChosenServiceNames(serviceNames);
  }

  const updateSubscriptions = async () => {
    fetchPossibleSubscriptions(keycloak!, token).then((response) => {
      const data = response.data;
      const services = (data as any).map((sub: any) => 
        sub.serviceSubscription.service.name === 'S-124' ? { name: sub.serviceSubscription.service.name, value: ServiceTopic.S124, link: '/s124' } :
        sub.serviceSubscription.service.name === 'Automatic Route Planning' ? { name: sub.serviceSubscription.service.name, value: ServiceTopic.ARP, link: '/routeplan' } :
        sub.serviceSubscription.service.name === 'Chat' ? { name: sub.serviceSubscription.service.name, value: ServiceTopic.CHAT, link: '/chat' } : null
      );
      setAllowedServices(services);
      setMySubscriptions(data as unknown as UserServiceSubscription[]);
    });
    fetchActiveSubscriptions(keycloak!, token).then((response) => {
      const data = response.data;
      const services = (data as any).map((sub: any) => sub.serviceSubscription.service.name);
      setChosenServiceNames(services);
    });
  }
  

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
        value={serviceNames}
        onChange={(event: any) => {
            setServiceNames(event.value.sort());
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