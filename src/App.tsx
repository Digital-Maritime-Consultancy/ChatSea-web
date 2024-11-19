import './App.css';
import { Box, Button, Grommet, Header, Menu } from 'grommet';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import HeaderComponent from './components/HeaderComponent';
import Map from './pages/Map';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Grommet>
      <BrowserRouter>
      <div>
        <HeaderComponent />
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      </div>
    </BrowserRouter>
  </Grommet>
  );
}

export default App;
