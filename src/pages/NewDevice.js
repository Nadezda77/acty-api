import React, {useEffect, useState } from 'react';
import { Form, FormGroup, Button, Input, Label} from 'reactstrap';
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


  const [cPlanIds, setCPlanIds] = useState([]);
  //const [rPlanIds, setRPlanIds] = useState([]);


  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);


  useEffect(() => {

    axios.get("https://dx-api.mts.rs/core/latest/api/connectivityPlans", {
      headers: {  
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      
      }
      }).then(res=> {
      setCPlanIds(res.data)
      //return res.data;  
   // })
    //.catch((error) => {
     // console.error(error)
    });
      }, []);
  

  // useEffect(() => {

  //   axios.get("https://dx-api.mts.rs/core/latest/api/routingProfiles", {
  //     headers: {  
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
           
  //     }
  //     }).then(res=> {
  //     setRPlanIds(res.data)
  //         //return res.data;  
  //      // })
  //       //.catch((error) => {
  //        // console.error(error)
  //   });
  //     }, []);
      



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

<Form  style={{
      width: '18rem'
    }}>


  <Label>name</Label>
    <Input type="text" 
           id="name"
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)} 
            required="Required"/>


  <Label>EUI</Label>
    <Input type="text" id="EUI" 
    placeholder="EUI"
    value={EUI}
    onChange={e => setEUI(e.target.value)} 
    required="Required" />

  
<FormGroup>
  <Label>activationType</Label>
    <Input type="select" id="activationType" 
    placeholder="activationType"
    value={activationType}
    onChange={e => setActivationType(e.target.value)} 
    required="Required">
      <option>
        OTAA
      </option>
      <option>
        ABP
      </option>
    </Input>
  </FormGroup>

  <Label>deviceProfileId</Label>
    <Input type="text" id="deviceProfileId" 
    value={deviceProfileId}
    onChange={e => setDeviceProfileId(e.target.value)} 
    required="Required" >
     {/* <option>
     LORA/GenericA.1_ETSI_Rx2-SF12
     </option> */}
     </Input>
  <Label>applicationEUI</Label>
    <Input type="text" id="applicationEUI" 
    value={applicationEUI}
    onChange={e => setApplicationEUI(e.target.value)} 
    required="Required" />


  <Label>applicationKey</Label>
    <Input type="text" id="applicationKey" 
    value={applicationKey}
    onChange={e => setApplicationKey(e.target.value)} 
    required="Required"/>


  <Label>connectivity</Label>
    <Input type="select" id="connectivity" 
     value={connectivity}
     onChange={e => setConnectivity(e.target.value)} 
     required="Required">
      <option>
      LORAWAN
      </option>
    </Input>

  <Label>routingProfileId</Label>
    <Input type="text" id="routingProfileId" 
     value={routingProfileId}
     onChange={e => setRoutingProfileId(e.target.value)} 
     required="Required">
       {/* {rPlanIds.map(rPlanId => (
            <option key={rPlanId.id} value={rPlanId.id}>
              {rPlanId.id}
            </option>
          ))}   */}
       <option>
        TWA_1100000048.202
      </option> 
       </Input> 

  <Label>connectivityPlanId</Label>
    <Input type="text" id="connectivityPlanId"
    value={connectivityPlanId}
    onChange={e => setConnectivityPlanId(e.target.value)} 
    required="Required">

{cPlanIds.map(cPlanId => (
            <option key={cPlanId.id} value={cPlanId.id}>
              {cPlanId.id}
            </option>
))}

</Input>

  <Label></Label>
    <Button  color="primary" type="submit"   onClick={handleSubmit} >New device</Button>

</Form>
);
}

