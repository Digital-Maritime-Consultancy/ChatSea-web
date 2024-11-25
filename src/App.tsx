import './App.css';
import { Box, Button, Grommet, Header, Menu } from 'grommet';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import HeaderComponent from './components/HeaderComponent';
import Map from './pages/Map';
import Dashboard from './pages/Dashboard';
import Configuration from './pages/Configuration';
import { useState } from 'react';
import MmsClient from './mms-browser-agent/MmsClient';
import { Certificate } from 'pkijs';
import { ConnectionContextProvider } from './context/ConnectContext';

function App() {
  
  return (
    <Grommet>
      <ConnectionContextProvider>
        <MmsClient>
          <BrowserRouter>
            <div>
              <HeaderComponent />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/map" element={<Map />} />
                <Route path="/conf" element={<Configuration connect={() => {}} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </MmsClient>
      </ConnectionContextProvider>
    </Grommet>
  );
}

export default App;
