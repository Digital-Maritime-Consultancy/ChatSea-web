import { Box, Button, Header, Menu } from "grommet";
import { Link } from "react-router-dom";
import { useConnectionState } from "../context/ConnectContext";
import { useEffect, useState } from "react";


function HeaderComponent() {
  const connectionState = useConnectionState();
  const [background, setBackground] = useState("brand");
  useEffect(() => {
    if (connectionState.connected) {
      setBackground("green");
    }
  }, [connectionState]);
    return (
    <Header background={background}>
      <Button hoverIndicator ><Link to="/dashboard">Home</Link></Button>
      <Button hoverIndicator ><Link to="/map">Map</Link></Button>
      <Button hoverIndicator ><Link to="/chat">Chat</Link></Button>
      <Button hoverIndicator ><Link to="/conf">Configure</Link></Button>
      <Menu label="account" items={[{ label: 'logout' }]} />
    </Header>
    );
}

export default HeaderComponent;