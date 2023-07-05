import React, {useEffect, useState } from 'react';
import { Container, Button, Table,  Card, Row, Col} from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import { getUser, getToken, removeUserSession } from '../utils/Common';

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
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

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


  const removeData = (ref) => {

    axios.delete(`https://dx-api.mts.rs/core/latest/api/devices/${ref}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    
    );

      setDevice(
        device.filter((key) => {
          return key.ref !== ref;
       })
      );
  };


  const [selectedRow, setSelectedRow] = React.useState(-1);

const deviceDetail = (ref) => {

  axios.get(`https://dx-api.mts.rs/core/latest/api/devices/${ref}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  );

    setDevice(
      device.filter((key) => {
        return key.ref !== ref;
     })
    );
};



  return (
  <Container>
     Welcome {user.user}!<br /><br />
      <Button onClick={handleLogout} value="Logout">Logout</Button><br /><br />
<Row>
  <Col>
    <Table hover="true">
      <thead>
        <tr>
          <th>name</th>
          <th>DevEUI</th>
          <th>networkAddress</th>
          <th>ref</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
        <tbody>
          {device.map((device, key)=> (
            <tr key={key} onClick={() =>  setSelectedRow(device.ref)}>
              <td>{device.name}</td>
              <td>{device.EUI}</td>
              <td>{device.networkAddress}</td>
              <td>{device.ref}</td>
              <td><Button type='submit' onClick={() => removeData(device.ref)}>delete</Button></td>
              <td><Button type='submit' onClick={() => deviceDetail(device.ref)}>view</Button></td>
            </tr>
            ))}
        </tbody>
      <tfoot></tfoot>
    </Table>
    </Col>
    <Col></Col>
    <Col>
<Card 
style={{
  width: '18rem'
}}>

  <Button  hover onClick={handleClick} tag="h5">
      Create device
  </Button>

</Card>

      {isShown && <NewDev/>}
</Col>
</Row>
</Container>
  );
}
export default Dashboard;