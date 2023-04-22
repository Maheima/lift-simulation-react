import React, { useState } from 'react';
import './controls.css';
import Floor from '../Floor/Floor';
import ArrowButtons from '../ArrowButtons/ArrowButtons';
import { ElevatorList } from '../Elevator/Elevator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Controls = () => {
  const [floorArr, setFloorArr] = useState([1]);
  const [floorClickArr, setFloorClickArr] = useState([]);
  const [elevators, setElevators] = useState([1]);

  const floors = floorArr.map((val, index) => {
    return (
      <div className="floor_container" id={index}>
        <div className="arrow_container">
          <FontAwesomeIcon
            className="arrow up"
            data-testid="arrowUp"
            size="2xl"
            icon={faCircleChevronUp}
          />
          <FontAwesomeIcon
            className="arrow down"
            data-testid='arrowDown'

            size="2xl"
            icon={faCircleChevronDown}
          />
        </div>
        {index === 0 &&
          elevators.map((val, index) => {
            return (
              <div className="elevator">
                <div className="door"></div>
                <div className="door"></div>
              </div>
            );
          })}
      </div>
    );
  });

  function removeFloor() {
    if (floorArr.length === 1) return;
    floorArr.pop();
    setFloorArr(() => {
      return [...floorArr];
    });
  }

  function addFloor() {
    setFloorArr((prevItems) => {
      return prevItems.concat(1);
    });
  }

  function addElevator() {
    setElevators((prevItems) => {
      return prevItems.concat(1);
    });
  }

  function removeElevator() {
    if (elevators.length === 1) return;
    elevators.pop();
    setElevators(() => {
      return [...elevators];
    });
  }

  return (
    <>
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
    </>
  );
};

export default Controls;
