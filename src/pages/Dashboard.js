import React, {useEffect, useState } from 'react';
import { Container, Button, Table,  Card, CardBody, CardTitle} from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import { getUser, getToken, removeUserSession } from '../utils/Common';
//import { useForm } from "react-hook-form";
import axios from 'axios';

import NewDev from "./NewDevice";

const Dashboard = props => {
 const history = useNavigate();
 const user = getUser();
  const token = getToken();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
   history('/login');
 }
 
  const [device, setDevice] = useState([]);

  useEffect(() => {
   
    axios.get('https://dx-api.mts.rs/core/latest/api/devices', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {

      setDevice(res.data);

      //console.log(res.data);
      return res.data;
     
    })
    .catch((error) => {
      console.error(error)
    })
    ;
  }, []);



 


  return (
    <Container>
     Welcome {user.user}!<br /><br />
      <Button onClick={handleLogout} value="Logout">Logout</Button><br /><br />
  <Container>
    <Table hover>
      <thead>
        <tr>
          <th>DevEUI</th>
          <th>name</th>
          <th>networkAddress</th>
          <th>ref</th>
        </tr>
      </thead>
        <tbody>
          {device.map((device, key)=> (
            <tr key={key}>
              <td>{device.EUI}</td>
              <td>{device.name}</td>
              <td>{device.networkAddress}</td>
              <td>{device.ref}</td>
            </tr>
            ))}
        </tbody>
      <tfoot></tfoot>
    </Table>
  </Container> 
  <Card
  style={{
    width: '18rem'
  }}>
<CardBody>
  <CardTitle tag="h5">
      Create device
  </CardTitle>
          </CardBody>
       </Card>

       <NewDev/>
        </Container>
  );
}
export default Dashboard;