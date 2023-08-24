import React, { useState, useRef } from 'react';
import './Building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Building = () => {
  const [elevatorState, setElevatorState] = useState([]);
  const [liftReqQueue, setLiftReqQueue] = useState([]);
  
  const [doorStyle, setDoorStyle] = useState({});

  const [numberOfFloors, setNumberOfFloors] = useState(1);
  
  function removeFloor() {
    if (numberOfFloors === 1) return;
    setNumberOfFloors(numberOfFloors - 1);
  }

  function addFloor() {
    setNumberOfFloors(numberOfFloors + 1);
  }

  function addElevator() {
    const width = window.innerWidth;
    const numberOfLifts = elevatorState.length + 1;
    if (width < 769 && numberOfLifts >= (width - 80) / 70) return;
    if (width >= 769 && numberOfLifts >= (width - 80) / 70) return;
    setElevatorState((prev) => {
      return [
        ...prev,
        {
          state: 'free',
          currentPos: 0,
          transitionDuration: 0,
          currentFloor: 0,
          isDoorOpen: false,
          dStyle: { width: '50%'},
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

  const floors = Array.from({ length: numberOfFloors }).map((val, index) => {
    const floorNumber = numberOfFloors - index;
    return (
      <div className="floor_container" id={index} key={index}>
        <div className="arrow_container">
          <FontAwesomeIcon
            className="arrow up"
            data-testid="arrowUp"
            size="2xl"
            icon={faCircleChevronUp}
          />
          {floorNumber}
          <FontAwesomeIcon
            className="arrow down"
            data-testid="arrowDown"
            size="2xl"
            icon={faCircleChevronDown}
            onClick={() => moveLiftTo(floorNumber)}
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
        <div style={val.dStyle} className="door"></div>
        <div style={val.dStyle} className="door"></div>
      </div>
    );
  });

  function freeELevatorStates(freeElevatorIndex, duration) {
    let doorOpeningDuration = duration * 1000;
    let doorClosingDuration = duration * 1000 + 2500;
    let liftFreeDuration = duration * 1000 + 5000;
    
    setTimeout(() => {
      let newArray = [...elevatorState];
      newArray[freeElevatorIndex].dStyle = { width: '0px' , transition: 'all ease-in-out 2.5s'};
      console.log('Inside 1st setTimeout', freeElevatorIndex);
      setElevatorState(newArray);
      console.log('elevatorState 1st timeout', elevatorState)

    }, doorOpeningDuration);

    setTimeout(() => {
      let newArray = [...elevatorState];
      newArray[freeElevatorIndex].dStyle = {
        width: '100%',
        transition: 'all ease-in-out 5s',
      };
      console.log('Inside 2nd setTimeout', freeElevatorIndex);
      setElevatorState(newArray);
      console.log('elevatorState 2nd timeout', elevatorState)
    }, doorClosingDuration);
    setTimeout(() => {
      let newArray = [...elevatorState];
      newArray[freeElevatorIndex].state = 'free';
      console.log('Inside 3rd setTimeout', freeElevatorIndex);
      console.log('elevatorState 3rd timeout', elevatorState)
      if (liftReqQueue.length !== 0) {
        moveLiftTo(Number(liftReqQueue[0]));
      }
      liftReqQueue.shift();
      setElevatorState(newArray);
      console.log('liftReqQueue', liftReqQueue)
    }, liftFreeDuration);
  }

  function moveLiftTo(calledFloor) {
    let distance = (calledFloor - 1) * 110;
    let newState = [...elevatorState];
    let freeElevator = newState.find((ele) => ele.state === 'free');
    let freeElevatorIndex = newState.findIndex((ele) => ele.state === 'free');
    if (!freeElevator) {
      setLiftReqQueue([...liftReqQueue, calledFloor])
      console.log('liftReqQueue', liftReqQueue);
      return;
    }
    freeElevator.currentPos = distance;
    freeElevator.state = 'busy';
  
    freeElevator.transitionDuration =
      Math.abs(Number(freeElevator.currentFloor) - Number(calledFloor)) * 2;

    freeElevator.currentFloor = calledFloor;
    freeELevatorStates(
      freeElevatorIndex,
      freeElevator.transitionDuration
    );
    setElevatorState([...newState]);
    console.log('elevatorState moveLiftTo', elevatorState)
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
