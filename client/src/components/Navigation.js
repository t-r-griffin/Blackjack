import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      ></input>

      <label for="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              Menu
            </Link>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Rules
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
