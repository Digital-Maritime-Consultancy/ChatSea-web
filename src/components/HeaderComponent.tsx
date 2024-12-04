import { Button, Header, Menu } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useKeycloak from "../hooks/useKeycloak";
import { useMmsContext } from '../context/MmsContext';

function HeaderComponent() {
  const [background, setBackground] = useState("brand");
  const { keycloak, authenticated } = useKeycloak();
  const navigate = useNavigate();
  const { connected, mrn } = useMmsContext();
  const [displayMrn, setDisplayMrn] = useState<string>()
  useEffect(() => {
    if (authenticated) {
      console.log(keycloak?.tokenParsed);
    }
    if (connected) {
      console.log("connected?", connected);
      setBackground("green");
      console.log(mrn)
      setDisplayMrn(`My Mrn: ${mrn}`);
    } else if (!connected && authenticated) {
      setBackground("red");
      setDisplayMrn("Connection lost");
    } else if (!connected) {
      setBackground("brand");
      setDisplayMrn("");
    }
  }, [connected, authenticated, mrn]);

  return (
    <Header background={background}>
      {/* Indented and styled displayMrn */}
      <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>{displayMrn}</span>

      {connected && (
        <>
          <Button hoverIndicator><Link to="/dashboard">Dashboard</Link></Button>
          <Button hoverIndicator><Link to="/s124">Navigational Warning</Link></Button>
          <Button hoverIndicator><Link to="/routeplan">Route Planning</Link></Button>
          <Button hoverIndicator><Link to="/chat">Chat</Link></Button>
          <Button hoverIndicator><Link to="/conf">Configuration</Link></Button>
        </>
      )}
      {!connected && (
        <>
          <Button hoverIndicator onClick={() => navigate("/")}>Home</Button>
          <Button hoverIndicator onClick={() => navigate("/connect")}>Connect</Button>
        </>
      )}

      <Menu label="account" items={[{ label: 'logout', onClick: () => keycloak?.logout() }]} />
    </Header>
  );
}

export default HeaderComponent;
