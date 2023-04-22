import React, { useState } from 'react';
import './controls.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Controls = () => {
  const [numberOfFloors, setNumberOfFloors] = useState(1);
  const [numberOfElevators, setNumberOfElevators] = useState(1);

  const floors = Array.from({ length: numberOfFloors }).map((val, index) => {
    const calledFloor = numberOfFloors - index
    return (
      <div className="floor_container" id={index}>
        <div className="arrow_container">
          <FontAwesomeIcon
            className="arrow up"
            data-testid="arrowUp"
            size="2xl"
            icon={faCircleChevronUp}
          />
          {numberOfFloors - index}
          <FontAwesomeIcon
            className="arrow down"
            data-testid="arrowDown"
            size="2xl"
            icon={faCircleChevronDown}
          />
        </div>
      </div>
    );
  });

  const elevators = Array.from({ length: numberOfElevators }).map(
    (val, index) => {
      return (
        <div
          className="elevator"
          key={index}
          style={{ bottom: '0px', left: `${50 + index * 60}px` }}
        >
          <div className="door"></div>
          <div className="door"></div>
        </div>
      );
    }
  );

  function removeFloor() {
    if (numberOfFloors === 1) return;
    setNumberOfFloors(numberOfFloors - 1);
  }

  function addFloor() {
    setNumberOfFloors(numberOfFloors + 1);
  }

  function addElevator() {
    setNumberOfElevators(numberOfElevators + 1);
  }

  function removeElevator() {
    if (numberOfElevators === 1) return;
    setNumberOfElevators(numberOfElevators - 1);
  }

  return (
    <div className="building">
      <div className="controls_container">
        <div className="elevator_controls">
          <div className="floor_btn">
            <button className="remove btn remove_floor" onClick={removeFloor}>
              Remove Floor
            </button>
          </div>
          <div className="floor_btn">
            <button className="add btn add_floor" onClick={addFloor}>
              Add Floor
            </button>
          </div>
        </div>
        <div className="lift_controls">
          <div className="lift_btn">
            <button
              className="remove btn remove_lift"
              id=""
              onClick={removeElevator}
            >
              <i className="fas fa-minus"></i>
              Remove Lift
            </button>
          </div>
          <div className="lift_btn">
            <button className="add btn add_lift" onClick={addElevator}>
              <i className="fas fa-plus"></i>
              Add Lift
            </button>
          </div>
        </div>
      </div>
      {floors}
      {elevators}
    </div>
  );
};

export default Controls;
