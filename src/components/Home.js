

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import SideBar from './SideBar';

const Home = () => {
  const [scenarios, setScenarios] = useState([]);
  //const [vehicles, setVehicles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simulationVehicles, setSimulationVehicles] = useState([]);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/scenarios');
      setSelectedScenario(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const fetchVehicles = async (scenarioId) => {
    try {
      const response = await axios.get('http://localhost:5000/vehicles');
      const scenarioVehicles = response.data.filter(vehicle => vehicle.scenarioId === scenarioId);
      setSimulationVehicles(scenarioVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleScenarioSelect = (scenario) => {
    setScenarios(scenario);
    fetchVehicles(scenario.id);
  };

  const startSimulation = () => {
    if (!selectedScenario) {
      alert('Please select a scenario first!');
      return;
    }

    // Simulate vehicle movement
    const interval = setInterval(() => {
      setSimulationVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
          let { posX, posY, speed, direction } = vehicle;
          switch (direction) {
            case 'Towards':
              posX += speed;
              break;
            case 'Backwards':
              posX -= speed;
              break;
            case 'Upwards':
              posY -= speed;
              break;
            case 'Downwards':
              posY += speed;
              break;
            default:
              break;
          }
          return { ...vehicle, posX, posY };
        });
      });
    }, 1000);

    setTimeout(() => clearInterval(interval), selectedScenario.time * 1000);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
       <div className='scenarios-list'>
        <h3>Scenarios</h3>
        <select  onClick={(e) => handleScenarioSelect(e.target.value)}>
        <ul>
          {scenarios.map(scenario => (
              <option key={scenario.id} value="options">{scenario.name}</option>
      
          ))}
          
        </ul>
        </select>
        </div>
      </div>


        <SideBar />
      <div className='div-options'>
      <div className="content">
        <div className='simulation-list'>
        <h3 style={{fontSize:"30px"}}>Selected Scenario: {selectedScenario ? selectedScenario.name : 'None'}</h3>
        <button style={{fontSize:"20px"}} onClick={startSimulation}>Start Simulation</button>
        <div className="simulation-container">
          {simulationVehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className="vehicle"
              style={{ left: vehicle.posX, top: vehicle.posY }}
            >  
              {vehicle.name}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Home;




