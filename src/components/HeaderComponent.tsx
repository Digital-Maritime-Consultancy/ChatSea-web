import { Box, Button, Header, Menu } from "grommet";
import { Link } from "react-router-dom";


function HeaderComponent() {
    return (
    <Header background="brand">
      <Button hoverIndicator ><Link to="/dashboard">Home</Link></Button>
      <Button hoverIndicator ><Link to="/map">Map</Link></Button>
      <Button hoverIndicator ><Link to="/chat">Chat</Link></Button>
      <Button hoverIndicator ><Link to="/conf">Configure</Link></Button>
      <Menu label="account" items={[{ label: 'logout' }]} />
    </Header>
    );
}

export default HeaderComponent;