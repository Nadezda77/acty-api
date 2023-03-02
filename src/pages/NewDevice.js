import React, {useEffect, useState } from 'react';
import {  Button, Input, Label} from 'reactstrap';

//import { useForm } from "react-hook-form";
import axios from 'axios';

import { getUser, getToken, removeUserSession } from '../utils/Common';



export default function NewDev ()  {
    // get functions to build form with useForm() hook

    
    const token = getToken();

  const [name, setName] = useState('');
  const [EUI, setEUI] = useState('');
  const [activationType, setActivationType] = useState('');
  const [deviceProfileId, setDeviceProfileId] = useState('');
  const [applicationEUI, setApplicationEUI] = useState('');
  const [applicationKey, setApplicationKey] = useState('');
  const [connectivity, setConnectivity] = useState('');
  const [routingProfileId, setRoutingProfileId] = useState('');
  const [connectivityPlanId, setConnectivityPlanId] = useState('');


  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);





  const handleSubmit = ()  => 
 
  {
   setLoading(true);
   setIsError(false);
    const data = {
        name :name,
        EUI: EUI,
        activationType: activationType,
        deviceProfileId: deviceProfileId,
        applicationEUI: applicationEUI,
        applicationKey: applicationKey,
        connectivity: connectivity, 
        routingProfileId:routingProfileId, 
        connectivityPlanId: connectivityPlanId
  }
  
  axios.post("https://dx-api.mts.rs/core/latest/api/devices", data, {
  headers: {  
    'Authorization': `Bearer ${token}`}
            }).then(res => {
            setData(res.data);
            setName('');
            setEUI('');
            setActivationType('');
            setDeviceProfileId('');
            setApplicationEUI('');
            setApplicationKey('');
            setConnectivity('');
            setRoutingProfileId('');
            setConnectivityPlanId('');
          
            }).catch(error => {

              setLoading(false);
              setIsError(true);
              
    });
}

return(

    <div classNames="form-group">

<div className="form-control">
  <Label>name</Label>
    <Input type="text" 
           id="name"
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)} 
            required="Required"/>
</div>
<div className="form-control">
  <Label>EUI</Label>
    <Input type="text" id="EUI" 
    placeholder="EUI"
    value={EUI}
    onChange={e => setEUI(e.target.value)} 
    required="Required" />
</div>
  
<div className="form-control">
  <Label>activationType</Label>
    <Input type="text" id="activationType" 
    placeholder="activationType"
    value={activationType}
    onChange={e => setActivationType(e.target.value)} 
    required="Required" />
  </div>

<div className="form-control">
  <Label>deviceProfileId</Label>
    <Input type="text" id="deviceProfileId" 
    value={deviceProfileId}
    onChange={e => setDeviceProfileId(e.target.value)} 
    required="Required" />
  </div>

<div className="form-control">
  <Label>applicationEUI</Label>
    <Input type="text" id="applicationEUI" 
    value={applicationEUI}
    onChange={e => setApplicationEUI(e.target.value)} 
    required="Required"  
    />
</div>

<div className="form-control">
  <Label>applicationKey</Label>
    <Input type="text" id="applicationKey" 
    value={applicationKey}
    onChange={e => setApplicationKey(e.target.value)} 
    required="Required" 
    
    />
</div>

<div className="form-control">
  <Label>connectivity</Label>
    <Input type="text" id="connectivity" 
     value={connectivity}
     onChange={e => setConnectivity(e.target.value)} 
     required="Required"
    
    />
</div>

<div className="form-control">
  <Label>routingProfileId</Label>
    <Input type="text" id="routingProfileId" 
     value={routingProfileId}
     onChange={e => setRoutingProfileId(e.target.value)} 
     required="Required"
    />
</div>

<div className="form-control">
  <Label>connectivityPlanId</Label>
    <Input type="text" id="connectivityPlanId"
    value={connectivityPlanId}
    onChange={e => setConnectivityPlanId(e.target.value)} 
    required="Required"
    
    />
</div>

<div className="form-control">
  <Label></Label>
    <Button  color="primary" type="submit"   onClick={handleSubmit} >New device</Button>
</div>
</div>
);
}

