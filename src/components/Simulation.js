

import React, { useEffect, useState } from 'react';

const Simulation = ({ scenario, vehicles }) => {
    const [runningVehicles, setRunningVehicles] = useState([]);

    useEffect(() => {
        if (!scenario || vehicles.length === 0) return;

        const interval = setInterval(() => {
            setRunningVehicles(prevVehicles => prevVehicles.map(vehicle => {
                let { initialPositionX, initialPositionY, speed, direction } = vehicle;
                switch (direction) {
                    case 'Towards':
                        initialPositionX += speed;
                        break;
                    case 'Backwards':
                        initialPositionX -= speed;
                        break;
                    case 'Upwards':
                        initialPositionY -= speed;
                        break;
                    case 'Downwards':
                        initialPositionY += speed;
                        break;
                    default:
                        break;
                }
                return {
                    ...vehicle,
                    initialPositionX,
                    initialPositionY,
                };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [scenario, vehicles]);

    useEffect(() => {
        setRunningVehicles(vehicles);
    }, [vehicles]);

    return (
        <div className="simulation">
            <h2>Simulation for {scenario?.name}</h2>
            <div className="simulation-container">
                {runningVehicles?.map(vehicle => (
                    <div
                        key={vehicle.id}
                        style={{
                            position: 'absolute',
                            left: `${vehicle.initialPositionX}px`,
                            top: `${vehicle.initialPositionY}px`,
                            transition: 'all 1s',
                        }}
                    >
                        {vehicle.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Simulation;


