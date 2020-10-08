import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="menu">
      <h1 className="moveInLeft">Settings</h1>

      <div className="fadeIn">
        <Link to="/" className="btn" style={{ top: '-200px' }}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Settings;
