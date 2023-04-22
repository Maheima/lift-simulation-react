import React, { useState } from 'react';
import './floor.css';
import ArrowButtons from '../ArrowButtons/ArrowButtons';
import Elevator from '../Elevator/Elevator';

const Floor = () => {
  const [elevators, setElevators] = useState([]);

  const elevatorsList = elevators.map((index) => {
    return <Elevator key={index} />;
  })

  return (
    <div className="floor_container">
      <ArrowButtons />
      {elevatorsList}
    </div>
  );
};

export default Floor;
