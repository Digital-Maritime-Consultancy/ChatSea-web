import { Button, Header, Menu } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";
import { useMmsContext } from '../context/MmsContext';
import { useServiceTopic } from "../context/ServiceTopicContext";
import MMSStatus, { MMSConnStatus } from "./MMSStatus";
import { UserServiceSubscription } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import { fetchActiveSubscriptions, fetchPossibleSubscriptions } from "../util/saasAPICaller";
import { ServiceTopic } from "../models/serviceTopic";

function HeaderComponent() {
  const [background, setBackground] = useState("brand");
  const { keycloak, authenticated, orgMrn, mrn, token } = useKeycloak();
  const navigate = useNavigate();
  const redirectUri = window.location.origin;
  const {allowedServices, setAllowedServices, chosenServiceNames, setChosenServiceNames, setMySubscriptions} = useServiceTopic();
  const { connected, mrn: mrnFromMMS, disconnect } = useMmsContext();
  const [mmsConnStatus, setMmsConnStatus] = useState<MMSConnStatus>(MMSConnStatus.NotConnected);
  useEffect(() => {
    if (authenticated) {
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
    if (connected) {
      console.log("connected?", connected);
      setBackground("green");
      console.log(mrnFromMMS)
      setMmsConnStatus(MMSConnStatus.Connected);
    } else if (!connected && authenticated) {
      setBackground("brand");
    } else if (!connected) {
      setBackground("brand");
    }
  }, [connected, authenticated, mrnFromMMS]);

  const callDisconnect = () => {
    if (connected) {
      disconnect();
    } else {
      alert("You are not connected to MMS");
    }
    
  }
  return (
    <Header background={background}>
      <MMSStatus status={mmsConnStatus} mrn={mrnFromMMS} />

      {authenticated && (
        <>
          {connected && (
            <>
                <Button hoverIndicator onClick={() => navigate("/dashboard")}>Dashboard</Button>
                {allowedServices.map((service) => {
                  if (chosenServiceNames.includes(service.name)) {
                    return <Button key={service.value} hoverIndicator onClick={() => navigate(service.link)}>{service.name}</Button>
                  }
                })}
                <Button hoverIndicator onClick={() => navigate("/conf")}>Configuration</Button>
            </>
          )}
          {!connected && (
            <>
              <Button hoverIndicator onClick={() => navigate("/dashboard")}>Dashboard</Button>
              {chosenServiceNames.includes("Automatic Route Planning") && allowedServices.filter((service) => service.value === "arp").map(
                (service) => <Button key={service.value} hoverIndicator onClick={() => navigate(service.link)}>{service.name}</Button>
              )}
              <Button hoverIndicator onClick={() => navigate("/connect")} >Connect</Button>
              <Button hoverIndicator onClick={() => navigate("/conf")}>Configuration</Button>
            </>
          )}
          <Menu label="Account" items={[{ label: 'Disconnect from MMS', onClick: () => callDisconnect() }, { label: 'Log out', onClick: () => keycloak?.logout({redirectUri}) }]} />
        </>)}
    </Header>
  );
}

export default HeaderComponent;
