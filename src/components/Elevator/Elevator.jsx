import React from 'react';
import './elevator.css';

export const ElevatorList = ({ elevators }) => {
  return elevators.map((index, val) => {
    return <Elevator />;
  });
};

const Elevator = () => {
  return (
    <div className="elevator">
      <div className="door"></div>
      <div className="door"></div>
    </div>
  );
};

export default Elevator;
