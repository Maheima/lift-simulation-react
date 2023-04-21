import React from 'react';
import './controls.css'

const Controls = () => {
  return (
    <div className="controls_container">
      <div className="elevator_controls">
        <div className="floor_btn">
          <button className="remove btn remove_floor">
            <i className="fas fa-minus"></i>
            Remove Floor
          </button>
        </div>
        <div className="floor_btn">
          <button className="add btn add_floor">
            <i className="fas fa-plus"></i>
            Add Floor
          </button>
        </div>
      </div>
      <div className="lift_controls">
        <div className="lift_btn">
          <button className="remove btn remove_lift" id="">
            <i className="fas fa-minus"></i>
            Remove Lift
          </button>
        </div>
        <div className="lift_btn">
          <button className="add btn add_lift">
            <i className="fas fa-plus"></i>
            Add Lift
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
