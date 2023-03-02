import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter , Route, Routes, NavLink } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import axios from 'axios';

import logo from './logo.png';

import { getToken, removeUserSession, setUserSession, getUser} from './utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);


  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`https://dx-api.mts.rs/admin/latest/api/oauth/tokeninfo/?access_token=${token}`).then(response => {
      setUserSession( response.data.access_token, response.data.expires_in, response.data.client_id, response.data.token_type,  response.data.scope, response.data.jti );
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    
       <BrowserRouter>
      
          <div className="header">
            <NavLink to="/" className="home-button"><a href="" className="logo"><img className="logo" src={logo} alt=""/></a></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
            
  
          </div>
          <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route index element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
          </div>
        
      </BrowserRouter>
  );
}
export default App;