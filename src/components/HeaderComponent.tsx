import { Box, Button, Header, Menu } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { useConnectionState } from "../context/ConnectContext";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";
import MMSStatus, { Status } from "./MMSStatus";


function HeaderComponent() {
  const connectionState = useConnectionState();
  const [background, setBackground] = useState("brand");
  const [mmsConnStatus, setMmsConnStatus] = useState(Status.NotConnected);
  const { keycloak, authenticated } = useKeycloak();
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) {
      //console.log(keycloak?.tokenParsed);
    }
    if (connectionState.connected) {
      setMmsConnStatus(Status.Connected);
    }
  }, [connectionState, authenticated]);
  return (
    <Header background={background}>
      <MMSStatus status={mmsConnStatus} />
      {authenticated && (
        <>
          {connectionState.connected && (
            <>
                <Button hoverIndicator onClick={() => navigate("/dashboard")}>Dashboard</Button>
                <Button hoverIndicator onClick={() => navigate("/s124")}>Navigational Warning</Button>
                <Button hoverIndicator onClick={() => navigate("/routeplan")}>Route Planning</Button>
                <Button hoverIndicator onClick={() => navigate("/chat")}>Chat</Button>
                <Button hoverIndicator onClick={() => navigate("/conf")}>Configuration</Button>
            </>
          )}
          {!connectionState.connected && (
            <>
              <Button hoverIndicator onClick={() => navigate("/")} >Home</Button>
              <Button hoverIndicator onClick={() => navigate("/connect")} >Connect</Button>
            </>
          )}
          <Menu label="Account" items={[{ label: 'logout', onClick: () => keycloak?.logout() }]} />
        </>)}
    </Header>
  );
}

export default HeaderComponent;