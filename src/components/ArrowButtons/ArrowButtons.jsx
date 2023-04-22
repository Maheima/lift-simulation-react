import React from 'react';
import './arrowButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const ArrowButtons = ({ floorNum, handleFloorClick }) => {
  
  // console.log('floorNum', floorNum)
  return (
    <div className="arrow_container">
      <FontAwesomeIcon
        className="arrow up"
        size="2xl"
        icon={faCircleChevronUp}
      />
      <FontAwesomeIcon
        className="arrow down"
        size="2xl"
        icon={faCircleChevronDown}
      />
    </div>
  );
};

export default ArrowButtons;
