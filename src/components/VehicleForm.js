
import React, { useState } from 'react';
import axios from 'axios';
//import { v4 as uuidv4 } from 'uuid';
import Sidebar from './SideBar';
import  './VehicleForm.css';



const VehicleForm = ({ scenarioId }) => {
  const [name, setName] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('Towards');
  const [scenario, setScenario] = useState('')
  const [id, setId] = useState('');
  const [vehicle, setVehicle] = useState({
    id: '',
    scenario: '',
    name: '',
    initialPositionX: '',
    initialPositionY: '',
    speed: '',
    direction: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/vehicles', { id, scenario,name, positionX, positionY, speed, direction, scenarioId }).then(() => {
      setId('');
      setScenario('');
      setName('');
      setPositionX('');
      setPositionY('');
      setSpeed('');
      setDirection('Towards');
    });
  };


  return (
    <div className='vehicle-form'>
     <Sidebar />
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 style={{fontSize:"40px" }}>Add Vehicle</h2>
      <div className='form-input-container'>
        <div className='forms-div'>
      <select style={{width: "150px"}} value={scenario} className='select' onChange={(e) => setScenario(e.target.value)}>
        <option value="Testing">Testing</option>
        <option value="MyTesting">MyTesting</option>
        <option value="Driving">Driving</option>
        <option value="Test">Testing</option>
      </select>
      <input className='container-input' style={{width: "150px"}} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vehicle Name" required />
      <input type="number" style={{width: "120px"}} value={positionX} onChange={(e) => setPositionX(e.target.value)} placeholder="Initial Position X" required /> <br/>
      <input type="number" style={{width: "120px"}} value={positionY} onChange={(e) => setPositionY(e.target.value)} placeholder="Initial Position Y" required />
      <input type="number" style={{width: "100px"}} value={speed} onChange={(e) => setSpeed(e.target.value)} placeholder="Speed" required />
      <select style={{width: "130px", padding:"10px"}} value={direction} onChange={(e) => setDirection(e.target.value)}>
        <option value="Towards">Towards</option>
        <option value="Backwards">Backwards</option>
        <option value="Upwards">Upwards</option>
        <option value="Downwards">Downwards</option>
      </select>
     
      </div>
      </div>
      <div className='buttons-action'>
      <button className='button1' type="submit">Add Vehicle</button>
      </div>

      
      <div>
      <button className='button2' >Reseet</button>
      <button className='button3' >Go Back</button>
      </div>
    </form>
    </div>
    
  );
};

export default VehicleForm;

