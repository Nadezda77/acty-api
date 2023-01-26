import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getToken, removeUserSession } from '../utils/Common';
import { useForm } from "react-hook-form";
import axios from 'axios';
 
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

  const [showIt, setShowIt] = useState(true);
  const {register, handleSubmit, formState: { errors }
  } = useForm();
  //const newDevice = [name, EUI, activationType, deviceProfileId, processingStrategyId, applicationEUI, applicationKey, motionIndicator];  
  const onSubmit = data => 
  {
    axios.post("https://dx-api.mts.rs/core/latest/api/devices", data, {
    headers: {  
      'Authorization': `Bearer ${token}`}
              }).then(res => {
              
                console.log(res.data)
              }).catch(error => {
                console.log(error.data)
      });
    };

  return (
    <div>
      Welcome {user.user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" /><br /><br />
     

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>EUI</th>
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
      </table>
    </div>

        <div className="submit-form">{showIt ?
          <div className={"visible"}></div>
                  :
          <div className={"invisible"}></div>}
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control">
                <label>name</label>
                  <input type="text" name="name" {...register("name", {required: "Required"})} />
              </div>
              <div className="form-control">
                <label>EUI</label>
                  <input type="text" name="EUI" {...register("EUI", {required: "Required"})} />
              </div>
              
              <div className="form-control">
                <label>activationType</label>
                  <input type="text" name="activationType" {...register("activationType", {required: "Required"})} />
              </div>
              <div className="form-control">
                <label>deviceProfileId</label>
                  <input type="text" name="deviceProfileId" {...register("deviceProfileId", {required: "Required"})} />
              </div>

              <div className="form-control">
                <label>applicationEUI</label>
                  <input type="text" name="applicationEUI" {...register("applicationEUI", {required: "Required"})} />
              </div>

              <div className="form-control">
                <label>applicationKey</label>
                  <input type="text" name="applicationKey" {...register("applicationKey", {required: "Required"})} />
              </div>

              <div className="form-control">
                <label>connectivity</label>
                  <input type="text" name="connectivity" {...register("connectivity", {required: "Required"})} />
              </div>

              <div className="form-control">
                <label>routingProfileId</label>
                  <input type="text" name="routingProfileId" {...register("routingProfileId", {required: "Required"})} />
              </div>

              <div className="form-control">
                <label>connectivityPlanId</label>
                  <input type="text" name="connectivityPlanId" {...register("connectivityPlanId", {required: "Required"})} />
              </div>
  
              <div className="form-control">
                <label></label>
                <button type="submit">New device</button>
              </div>
            </form>
          </div>
        </div>
  );
}
 
export default Dashboard;