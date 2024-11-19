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
import {ConnectContext} from './context/ConnectContext';

function App() {
  const [mrn, setMrn] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Grommet>
      <ConnectContext.Provider value={{ mrn, isAuthenticated, setMrn, setIsAuthenticated }}>
        <BrowserRouter>
          <div>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/map" element={<Map />} />
              <Route path="/conf" element={<Configuration />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ConnectContext.Provider>
    </Grommet>
  );
}

export default App;
