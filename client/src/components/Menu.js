import React from 'react';
import { Link } from 'react-router-dom';
import cards from '../assets/PNG/cards.png';
import Img from './Img';

const Menu = () => {
  return (
    <div className="menu">
      <h1 className="heading">BlackJack</h1>

      <Img width={202} height={204} className="menu__card" src={cards} alt="" />

      <div className="options">
        <Link to="/Play" className="btn">
          Play
        </Link>
        <Link to="#" className="btn">
          Rules
        </Link>
        <Link to="#" className="btn">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Menu;
