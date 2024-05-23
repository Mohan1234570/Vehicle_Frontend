
import React from 'react';
import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
//import SideBar from './components/SideBar';
import Home from './components/Home';
import ScenarioForm from './components/ScenarioForm';
import ScenariosList from './components/ScenariosList';
import VehicleForm from './components/VehicleForm';
import './App.css'
import Simulation from './components/Simulation';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'add-vehicle',
      element: <VehicleForm />
    },
    {
      path: 'add-scenario',
      element: <ScenarioForm />
    },
    {
      path: 'all-scenarios',
      element: <ScenariosList />
    },
    {
      path: 'add-simulation',
      element: <Simulation />
    }
  ])
  
  return (
      <div className="App">
        
          <RouterProvider router={router} />
      
      </div>
   
  );
}

export default App;

