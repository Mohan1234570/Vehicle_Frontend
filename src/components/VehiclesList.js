import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VehicleLists.css';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('https://vehicle-backend-3.onrender.com/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://vehicle-backend-3.onrender.com/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://vehicle-backend-3.onrender.com/vehicles/${currentVehicle.id}`, currentVehicle);
      setIsEditing(false);
      setCurrentVehicle(null);
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentVehicle(null);
  };

  return (
    <div className="vehicles-list-container">
      <h2>Vehicles List</h2>
      {isEditing ? (
        <div className="edit-form">
          <h3>Edit Vehicle</h3>
          <input
            type="text"
            name="name"
            value={currentVehicle.name}
            onChange={handleChange}
            placeholder="Vehicle Name"
          />
          <input
            type="number"
            name="initialPositionX"
            value={currentVehicle.initialPositionX}
            onChange={handleChange}
            placeholder="Initial Position X"
          />
          <input
            type="number"
            name="initialPositionY"
            value={currentVehicle.initialPositionY}
            onChange={handleChange}
            placeholder="Initial Position Y"
          />
          <input
            type="number"
            name="speed"
            value={currentVehicle.speed}
            onChange={handleChange}
            placeholder="Speed"
          />
          <select name="direction" value={currentVehicle.direction} onChange={handleChange}>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-list-item">
              <div>
                <strong>{vehicle.name}</strong>
                <p>Position: ({vehicle.initialPositionX}, {vehicle.initialPositionY})</p>
                <p>Speed: {vehicle.speed}</p>
                <p>Direction: {vehicle.direction}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(vehicle)}>Edit</button>
                <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehiclesList;
