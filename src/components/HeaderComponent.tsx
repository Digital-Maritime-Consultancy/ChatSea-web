import { Button, Header, Menu } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";
import { useMmsContext } from '../context/MmsContext';
import { useServiceTopic } from "../context/ServiceTopicContext";
import MMSStatus, { MMSConnStatus } from "./MMSStatus";
import { Configuration, UserManagementControllerApi } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import { fetchUserServiceSubscriptions } from "../util/saasAPICaller";

function HeaderComponent() {
  const [background, setBackground] = useState("brand");
  const { keycloak, authenticated, orgMrn, mrn, token } = useKeycloak();
  const navigate = useNavigate();
  const redirectUri = window.location.origin;
  const {allowedServices, setAllowedServices, chosenService, setChosenService} = useServiceTopic();
  const { connected, mrn: mrnFromMMS, disconnect } = useMmsContext();
  const [mmsConnStatus, setMmsConnStatus] = useState<MMSConnStatus>(MMSConnStatus.NotConnected);
  useEffect(() => {
    if (authenticated) {
      fetchUserServiceSubscriptions(keycloak!, token, orgMrn, mrn).then((data) => {
        // const services = data.map((service: any) => {
        //   return {
        //     name: service.serviceName,
        //     value: service.serviceId,
        //     link: `/service/${service.serviceId}`
        //   }
        // });
        // setAllowedServices(services);
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
          <Menu label="Account" items={[{ label: 'Disconnect from MMS', onClick: () => callDisconnect() }, { label: 'Log out', onClick: () => keycloak?.logout({redirectUri}) }]} />
        </>)}
    </Header>
  );
}

export default HeaderComponent;
