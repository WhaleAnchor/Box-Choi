import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Inventory from './components/Inventory';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Register from './components/Register';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
    <Routes>
      <>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/inventory" element={<Inventory />} />
      </>
      </Routes>
    </Router>
  );
}

export default App;
