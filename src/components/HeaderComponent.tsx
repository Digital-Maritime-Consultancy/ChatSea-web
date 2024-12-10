import { Button, Header, Menu } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";
import { useMmsContext } from '../context/MmsContext';
import { useServiceTopic } from "../context/ServiceTopicContext";
import MMSStatus, { MMSConnStatus } from "./MMSStatus";

function HeaderComponent() {
  const [background, setBackground] = useState("brand");
  const { keycloak, authenticated } = useKeycloak();
  const navigate = useNavigate();
  const {allowedServices, setAllowedServices, chosenService, setChosenService} = useServiceTopic();
  const { connected, mrn, disconnect } = useMmsContext();
  const [mmsConnStatus, setMmsConnStatus] = useState<MMSConnStatus>(MMSConnStatus.NotConnected);
  useEffect(() => {
    if (authenticated) {
      console.log(keycloak?.tokenParsed);
    }
    if (connected) {
      console.log("connected?", connected);
      setBackground("green");
      console.log(mrn)
      setMmsConnStatus(MMSConnStatus.Connected);
    } else if (!connected && authenticated) {
      setBackground("brand");
    } else if (!connected) {
      setBackground("brand");
    }
  }, [connected, authenticated, mrn]);

  const callDisconnect = () => {
    if (connected) {
      disconnect();
    } else {
      alert("You are not connected to MMS");
    }
    
  }
  return (
    <Header background={background}>
      <MMSStatus status={mmsConnStatus} mrn={mrn} />

      {authenticated && (
        <>
          {connected && (
            <>
                <Button hoverIndicator onClick={() => navigate("/dashboard")}>Dashboard</Button>
                {allowedServices.map((service) => {
                  if (chosenService.includes(service.name)) {
                    return <Button key={service.value} hoverIndicator onClick={() => navigate(service.link)}>{service.name}</Button>
                  }
                })}
                <Button hoverIndicator onClick={() => navigate("/conf")}>Configuration</Button>
            </>
          )}
          {!connected && (
            <>
              <Button hoverIndicator onClick={() => navigate("/dashboard")}>Dashboard</Button>
              {chosenService.includes("Route Planning") && allowedServices.filter((service) => service.value === "arp").map(
                (service) => <Button key={service.value} hoverIndicator onClick={() => navigate(service.link)}>{service.name}</Button>
              )}
              <Button hoverIndicator onClick={() => navigate("/connect")} >Connect</Button>
            </>
          )}
          <Menu label="Account" items={[{ label: 'Disconnect from MMS', onClick: () => callDisconnect() }, { label: 'Log out', onClick: () => keycloak?.logout() }]} />
        </>)}
    </Header>
  );
}

export default HeaderComponent;
