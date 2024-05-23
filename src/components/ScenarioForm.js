import React, { useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import './SideBar.css';
import './ScenarioForm.css';

const ScenarioForm = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/scenarios', { name, time }).then(() => {
      setName('');
      setTime('');
    });
  };   
                
           
  return (
    <div className='add-scenario'>
      <SideBar />  
      <div className='div-container'>
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 style={{textShadow: "1px 0.5px white", fontSize:"40px"}} className='h2-text'> Add Scenario</h2>

       <div className='input-div'>
      <input  type="text" style={{width: "270px", padding: "20px"}} value={name} onChange={(e) => setName(e.target.value)} placeholder="Scenario Name" required />
      <input type="number" style={{width: "270px"}} value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time in seconds" required />
      </div>
      <div className='buttons-actions'>
      <button className='button1' type="submit">Add Scenario</button>
      <button onClick={(e) => e.target.reset()} className='button2' type="submit">Reset</button>
      <button className='button3' type="submit">Add Scenario</button>
      </div>
    </form>
    </div>
    
    </div>
  );
};

export default ScenarioForm;

