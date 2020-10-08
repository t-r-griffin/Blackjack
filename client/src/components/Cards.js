import React from 'react';
import cover from '../assets/PNG/blue_back.png';

export default function Cards(context) {
  return (
    <div>
      <img src={context.cardValue} className="image1 faceUp" alt="" />
      <img src={cover} className="image2 faceDown" alt="" />
    </div>
  );
}
