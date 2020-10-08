import React, { Component } from 'react';
import Deal from './Deal';

class Controls extends Component {
  //Render redeal button if game is finished.
  redeal = () => {
    if (this.props.gameFinished) {
      return (
        <div>
          <button
            onClick={this.props.startGame}
            className="redeal btn-floating btn-large red"
          >
            ReDeal
          </button>
        </div>
      );
    }
  };

  //render hit and stand buttons if the player has not gone bust.
  renderButtons = () => {
    if (!this.props.playerBust) {
      return (
        <div className="button-container">
          <p className="buttonText__goodLuck">Goodluck!</p>
          <button
            onClick={this.props.hit}
            disabled={this.props.buttonDisabled}
            className="button button-item1 btn-floating btn-large red instant"
          >
            Hit
          </button>
          <button
            onClick={this.props.stand}
            disabled={this.props.buttonDisabled}
            className="button button-item3 btn-floating btn-large red instant"
          >
            Stand
          </button>
        </div>
      );
    }
    return;
  };

  renderContent() {
    let content;
    if (this.props.gameStarted) {
      content = (
        <React.Fragment>
          <Deal
            className="dealerScore instant"
            gameState={this.props.gameState}
            hit={this.props.hit}
            stand={this.props.stand}
            cardsGiven={this.props.aiCards}
            userCards={this.props.userCards}
            total={this.props.aiCount}
          />
          <Deal
            className="playerScore instant"
            content="content instant"
            gameState={this.props.gameState}
            hit={this.props.hit}
            stand={this.props.stand}
            aiCards={this.props.aiCards}
            cardsGiven={this.props.userCards}
            total={this.props.userCount}
          />
          {this.renderButtons()}
        </React.Fragment>
      );
    } else if (!this.props.gameStarted && !this.props.redeal) {
      content = (
        <React.Fragment className="button-container">
          <button
            onClick={this.props.startGame}
            className="button button-item2 btn-floating btn-large red"
          >
            Deal
          </button>
          <p className="buttonText">Select Deal to get started</p>
        </React.Fragment>
      );
    }
    return content;
  }

  render() {
    return (
      <div>
        <div className="center">
          <div className="controls">{this.renderContent()}</div>
          <div className="controls">{this.redeal()}</div>
        </div>
      </div>
    );
  }
}

export default Controls;
