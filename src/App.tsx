import './App.css';
import { Box, Button, Grommet, Header, Menu } from 'grommet';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import HeaderComponent from './components/HeaderComponent';
import S124 from './pages/S124';
import Dashboard from './pages/Dashboard';
import Configuration from './pages/Configuration';
import { useState } from 'react';
import { Certificate } from 'pkijs';
import { ConnectionContextProvider } from './context/ConnectContext';
import { MsgContextProvider } from './context/MessageContext';
import { KeycloakProvider } from './context/KeycloakContext';
import { MmsProvider } from './context/MmsContext';
import RoutePlan from './pages/RoutePlan';
import Connect from './pages/Connect';
import { ServiceTopic } from './models/serviceTopic';
import { ServiceTopicProvider } from './context/ServiceTopicContext';

function App() {
  

  return (
    <Grommet>
      <BrowserRouter>
        <KeycloakProvider>
          <ConnectionContextProvider>
            <MsgContextProvider>
              <MmsProvider>
                <ServiceTopicProvider>
                    <HeaderComponent />
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/s124" element={<S124 />} />
                      <Route path="/routeplan" element={<RoutePlan />} />
                      <Route path="/connect" element={<Connect />} />
                      <Route path="/conf" element={<Configuration connect={() => {}} />} />
                    </Routes>
                  </ServiceTopicProvider>
              </MmsProvider>
          </MsgContextProvider>
          </ConnectionContextProvider>
        </KeycloakProvider>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
