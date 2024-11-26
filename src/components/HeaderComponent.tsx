import { Box, Button, Header, Menu } from "grommet";
import { Link } from "react-router-dom";
import { useConnectionState } from "../context/ConnectContext";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";


function HeaderComponent() {
  const connectionState = useConnectionState();
  const [background, setBackground] = useState("brand");
  const [mrn, setMrn] = useState("MMS: Not connected");
  const { keycloak, authenticated } = useKeycloak();
  useEffect(() => {
    if (authenticated) {
      console.log(keycloak?.tokenParsed);
    }
    if (connectionState.connected) {
      setBackground("green");
      setMrn(connectionState.mrn);
    }
  }, [connectionState, authenticated]);
    return (
    <Header background={background}>
      <span>{mrn}</span>
      <Button hoverIndicator ><Link to="/dashboard">Home</Link></Button>
      {connectionState.connected && (
        <>
        <Button hoverIndicator ><Link to="/s124">Navigational Warning</Link></Button>
        <Button hoverIndicator ><Link to="/routeplan">Route Planning</Link></Button>
        <Button hoverIndicator ><Link to="/chat">Chat</Link></Button>
        <Button hoverIndicator ><Link to="/conf">Configuration</Link></Button>
        </>
      )}
      {!connectionState.connected && (
        <Button hoverIndicator ><Link to="/connect">Connect</Link></Button>
        )}
      <Menu label="account" items={[{ label: 'logout', onClick: () => keycloak?.logout() }]} />
    </Header>
    );
}

export default HeaderComponent;