import { Box, Button, Header, Menu } from "grommet";
import { Link } from "react-router-dom";
import { useConnectionState } from "../context/ConnectContext";
import { useEffect, useState } from "react";


function HeaderComponent() {
  const connectionState = useConnectionState();
  const [background, setBackground] = useState("brand");
  const [mrn, setMrn] = useState("Not connected");
  useEffect(() => {
    if (connectionState.connected) {
      setBackground("green");
      setMrn(connectionState.mrn);
    }
  }, [connectionState]);
    return (
    <Header background={background}>
      <span>{mrn}</span>
      <Button hoverIndicator ><Link to="/dashboard">Home</Link></Button>
      <Button hoverIndicator ><Link to="/map">Map</Link></Button>
      <Button hoverIndicator ><Link to="/chat">Chat</Link></Button>
      <Button hoverIndicator ><Link to="/conf">Configure</Link></Button>
      <Menu label="account" items={[{ label: 'logout' }]} />
    </Header>
    );
}

export default HeaderComponent;