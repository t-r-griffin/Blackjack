import React, { Component } from 'react';
import Cards from './Cards';

class Deal extends Component {
  renderScore = (props) => {
    if (this.props.gameState === 'INPLAY') {
      return <div className={this.props.className}>{this.props.total}</div>;
    } else {
      return (
        <div
          className={this.props.className}
          style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          {this.props.total}
        </div>
      );
    }
  };

  renderContent = (props) => {
    if (this.props.content && this.props.gameState === 'INPLAY') {
      return <div className={this.props.content}>IN PLAY</div>;
    } else if (this.props.content && this.props.gameState === 'STAND') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: '#ff8c00' }}
        >
          STAND
        </div>
      );
    } else if (this.props.content && this.props.gameState === 'LOSE') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: '#B11B1B' }}
        >
          LOSE
        </div>
      );
    } else if (this.props.content && this.props.gameState === 'WIN') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: 'green' }}
        >
          WIN
        </div>
      );
    } else if (this.props.content && this.props.gameState === 'BLACKJACK') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: 'green' }}
        >
          BLACKJACK
        </div>
      );
    } else if (this.props.content && this.props.gameState === 'BUST') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: '#B11B1B' }}
        >
          BUST
        </div>
      );
    } else if (this.props.content && this.props.gameState === 'PUSH') {
      return (
        <div
          className={this.props.content}
          style={{ color: 'white', backgroundColor: '#CCCC00' }}
        >
          PUSH
        </div>
      );
    }
  };

  render() {
    return (
      <div className="playgrid">
        {this.renderScore()}
        {this.props.cardsGiven.map(function (deck, id) {
          return (
            <div className={`item-${id}`}>
              <Cards key={id} cardValue={deck.src} />
            </div>
          );
        })}
        {this.renderContent()}
      </div>
    );
  }
}

export default Deal;
