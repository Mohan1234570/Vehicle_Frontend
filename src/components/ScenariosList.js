

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScenariosList.css';
import Sidebar from './SideBar';

const ScenariosList = () => {
  const [scenarios, setScenarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('https://vehicle-backend-3.onrender.com/scenarios');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://vehicle-backend-3.onrender.com/scenarios/${id}`);
      fetchScenarios();
    } catch (error) {
      console.error('Error deleting scenario:', error);
    }
  };

  const handleEdit = (scenario) => {
    setCurrentScenario(scenario);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentScenario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://vehicle-backend-3.onrender.com/scenarios/${currentScenario.id}`, currentScenario);
      setIsEditing(false);
      setCurrentScenario(null);
      fetchScenarios();
      setMsg(msg,'Updated Succesfully..');
    } catch (error) {
      console.error('Error updating scenario:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentScenario(null);
  };

  return (
    <div className="scenarios-list-container">
      <Sidebar />
      <div className='div-container'>
      <h2>Scenarios List</h2>
      {isEditing ? (
        <div className="edit-form">
          <h3>Edit Scenario</h3>
          <input
            type="text"
            name="name"
            style={{width:"280px", padding:"20px"}}
            value={currentScenario.name}
            onChange={handleChange}
            placeholder="Scenario Name"
          />
          <input
            type="text"
            name="time"
            style={{width:"280px", padding:"20px"}}
            value={currentScenario.time}
            onChange={handleChange}
            placeholder="Time"
          />
          <button  style={{width:"120px"}} onClick={handleSave}>Save</button>
          <button  style={{width:"120px"}} onClick={handleCancel}>Cancel</button>
        </div>
      ) : (     
        <div className="scenario-list">
          <h3 style={{color: "white", paddingTop: "3px",marginTop:"10px", fontSize:"30px"}}>ScenariosList</h3>
          <table style={{color:"white"}} border={4} class="responstable">
          <div style={{color:"white"}} className='all-table-heads'>
              <tr>
              <th style={{width:"30px", padding:"37px"}}>Id</th>
               <th>Scenario Name</th>
               <th>Time</th>
               <th>Edit</th>
               <th>Delete</th>

           </tr>
             
              </div>
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-list-item">
              <div>
                <div key={scenario.id} className='list'>
                {/*<div>
                <button onClick={() => handleEdit(scenario)}>Edit</button>
                <button onClick={() => handleDelete(scenario.id)}>Delete</button>
          </div>*/}
            
              <div style={{color: "white"}} className='div-td'>
           <tr style={{color: "white"}}>
            <td style={{width:"30px", padding:"37px"}}>{scenario.id}</td>
            <td>{scenario.name}</td>
            <td>{scenario.time}</td>
             <td><button onClick={() => handleEdit(scenario)}>Edit</button></td>
             <td><button onClick={() => handleDelete(scenario.id)}>Delete</button></td>
           </tr>
           </div>
                </div>
                
              </div>
              
            </div>
            
          ))}
          </table>
        </div>
        
      )}
      </div>
    </div>
    
  );
};

export default ScenariosList;

