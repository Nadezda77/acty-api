import React, {useEffect, useState } from 'react';
import { Form, FormGroup, Button, Input, Label} from 'reactstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getUser, getToken, removeUserSession } from '../utils/Common';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';




//export default function NewDev ()  {

const NewDevice = () => {

    // get functions to build form with useForm() hook

    const { control, register, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm({
      // progressive: true, optional prop for progressive enhancement
    });
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
  const [rprofIds, setRprofIds] = useState([]);
  const [dprofIds, setDprofIds] = useState([]);


  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);


  const onSubmit = async ()  => 
 
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
          
            }).catch(err => {

              setLoading(false);
              setIsError(true);    
    });
  }


  useEffect(() => {

    axios.get("https://dx-api.mts.rs/core/latest/api/connectivityPlans", {
      headers: {  
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      
      }
      }).then(res=> {
      setCPlanIds(res.data)
      return res.data;  
     
   })
    .catch((error) => {
      console.error(error)
    });
      }, []);
  

  useEffect(() => {

    axios.get("https://dx-api.mts.rs/core/latest/api/routingProfiles", {
      headers: {  
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
           
      }
      }).then(res=> {
      setRprofIds(res.data)
          return res.data;  
       })
        .catch((error) => {
          console.error(error)
    });
      }, []);
      

      // useEffect(() => {

      //   axios.get("https://dx-api.mts.rs/core/latest/api/deviceProfiles", {
      //     headers: {  
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json',
               
      //     }
      //     }).then(res=> {
      //     setDprofIds(res.data)
      //         return res.data;  
      //      })
      //       .catch((error) => {
      //         console.error(error)
      //   });
      //     }, []);
          



  
return(

<Form style={{
      width: '18rem'
    }} onSubmit={handleSubmit(onSubmit)}>


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

  

  <Label>activationType</Label>
    <Input type="select" id="activationType" 
    placeholder="activationType"
    value={activationType}
    onChange={e => setActivationType(e.target.value)} 
    required="Required">
      <option></option>
      <option>
        OTAA
      </option>
      <option>
        ABP
      </option>
    </Input>
 

  
  <Label>deviceProfileId</Label>
    <Input type="select" id="deviceProfileId" 
    value={deviceProfileId}
    onChange={e => setDeviceProfileId(e.target.value)} 
    required="Required" >
<option></option>
  <option>
    LORA/GenericA.1.0.2a_ETSI_Rx2-SF12
  </option>
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
      <option></option>
      <option>
      LORAWAN
      </option>
    </Input>
   

  <Label>routingProfileId</Label>
    <Input type="select" id="routingProfileId" 
     value={routingProfileId}
     onChange={e => setRoutingProfileId(e.target.value)} 
     required="Required">
      <option></option>
      {!rprofIds ? (
    <>Loading data...</>
  ) : rprofIds.length === 0 ? (
    <>No data found</>
  ) : (
    rprofIds.map( rprofId  => (

            <option key={rprofId.id}  >
              {rprofId.id}
            </option>
        
        ))
        )}

       </Input> 
    

  <Label>connectivityPlanId</Label>
    <Input type="select" id="connectivityPlanId"
        value={connectivityPlanId}
        onChange={e => setConnectivityPlanId(e.target.value)} 
        required="Required">
          <option></option>
        {!cPlanIds ? (
            <>Loading data...</>
          ) : cPlanIds.length === 0 ? (
            <>No data found</>
          ) : (

        cPlanIds.map(cPlanId => (
          <option key={cPlanId.id} >
          {cPlanId.id}
          </option>
        ))
        )}
    </Input>
 
    <Button  color="primary" type="submit"  >New device</Button>
    {isSubmitSuccessful && <p>Form submit successful.</p>}
      
      {errors?.root?.server && <p>Form submit failed.</p>}
</Form>
);
}

export default NewDevice;