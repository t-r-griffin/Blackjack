import React from 'react';
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div className="menu">
      <h1 className="moveInLeft">Rules</h1>

      <div className="fadeIn">
        <Link to="/" className="btn" style={{ top: '-200px' }}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Rules;
