import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import queryString from 'query-string';

import { setUserSession } from '../utils/Common';

const Login = props => {

  const history = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://dx-api.mts.rs/admin/latest/api/oauth/token' , queryString.stringify({ client_id: "iot-api/" + username.value, client_secret: password.value, grant_type:'client_credentials' }),
     { headers: {
        'Content-Type':'application/x-www-form-urlencoded',     
          
      }
    }).then(response => {
      setLoading(false);
      setUserSession( response.data.access_token, response.data.expires_in, response.data.client_id, response.data.token_type,  response.data.scope, response.data.jti  );
      history('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;
