import React, { useState } from 'react';
import './Building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Building = () => {
  const [elevatorState, setElevatorState] = useState([]);
  /**
   * {
   * state: busy/free,
   * currentPos:
   *
   * }
   */
  const [numberOfFloors, setNumberOfFloors] = useState(1);

  const floors = Array.from({ length: numberOfFloors }).map((val, index) => {
    const calledFloor = numberOfFloors - index;

    return (
      <div className="floor_container" id={index}>
        <div className="arrow_container">
          <FontAwesomeIcon
            className="arrow up"
            data-testid="arrowUp"
            size="2xl"
            icon={faCircleChevronUp}
          />
          {calledFloor}
          <FontAwesomeIcon
            className="arrow down"
            data-testid="arrowDown"
            size="2xl"
            icon={faCircleChevronDown}
            onClick={() => moveLiftTo(calledFloor)}
          />
        </div>
      </div>
    );
  });

  const elevators = elevatorState.map((val, index) => {
    let newPos = val.currentPos;
    let duration = val.transitionDuration;
    return (
      <div
        className="elevator"
        key={index}
        style={{
          bottom: `${newPos}px`,
          left: `${50 + index * 60}px`,
          transition: `all ${duration}s linear`,
        }}
      >
        <div className="door"></div>
        <div className="door"></div>
      </div>
    );
  });

  function moveLiftTo(calledFloor) {
    let distance = (calledFloor - 1) * 110;
    let newState = [...elevatorState];
    let freeElevators = newState.find((ele) => ele.state === 'free');
    if (!freeElevators) return;
    freeElevators.currentPos = distance;
    freeElevators.state = 'busy';
    freeElevators.transitionDuration = Math.abs(freeElevators.currentFloor-calledFloor) * 2;
    freeElevators.currentFloor = calledFloor;
    console.log('first', freeElevators);
    setElevatorState([...newState]);

    setTimeout(() => {
      freeElevators.state = 'free';
    }, 1000 * 2 + 5000);
  }

  function removeFloor() {
    if (numberOfFloors === 1) return;
    setNumberOfFloors(numberOfFloors - 1);
  }

  function addFloor() {
    setNumberOfFloors(numberOfFloors + 1);
  }

  function addElevator() {
    setElevatorState((prev) => {
      return [
        ...prev,
        {
          state: 'free',
          currentPos: 0,
          transitionDuration: 0,
          currentFloor: 0
        },
      ];
    });
  }
  function removeElevator() {
    if (elevatorState.length === 1) return;
    elevatorState.pop();
    setElevatorState(() => {
      return [...elevatorState];
    });
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

export default Building;
