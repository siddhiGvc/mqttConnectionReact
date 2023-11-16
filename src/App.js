import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import { Client } from 'paho-mqtt';

function App() {

  useEffect(()=>{
    mqttConnection();
  },[])

  const mqttConnection=()=>{
    const broker = 'vending-machines.in'; // Replace with your MQTT broker URL
      
    // Replace with your MQTT password
 
     const client = new Client(broker,1883, 'SIDDHI-DH'); // Replace with your MQTT broker details
 
     client.onConnectionLost = (responseObject) => {
       if (responseObject.errorCode !== 0) {
         console.log('Connection lost:', responseObject.errorMessage);
       
       }
     };
 
     client.connect({
       onSuccess: onConnect,
      
     });

    
     client.onMessageArrived = (message) => {
       console.log('Message received on topic:', message.destinationName);
       console.log('Payload:', message.payloadString);
     
      
    
       // Handle the MQTT message here
     };

     function onConnect(){
       console.log('Connected to MQTT broker');
       // Subscribe to a topic
       client.subscribe('GVC/VM/SUB');
    
     }
    
    

     return () => {
       // client.disconnect();
     };

   }
    
    const sendMqtt=()=>{
      const broker = 'vending-machines.in'; // Replace with your MQTT broker URL
       console.log(1);
      // Replace with your MQTT password
   
       const client = new Client(broker,1883, 'SIDDHI-DH');
       const topic = 'GVC/VM/PUB'; // Replace with your desired topic
       const message = `Hello Mqtt!`; // Replace with your message
      
       
       const onConnect = () => {
        console.log('Connected to MQTT broker');
            
        // Publish the message after a successful connection
        client.publish(topic, message, 0, false);
      };
    
      client.onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('Connection lost:', responseObject.errorMessage);
        }
      };
    
      // Connect to the broker with the onConnect callback
      client.connect({
        onSuccess: onConnect,
      });
      

    
     
    }
  return (
    <div className="App">
       <button onClick={sendMqtt}>Publish</button>
    </div>
  );
}

export default App;
