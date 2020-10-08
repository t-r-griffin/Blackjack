import React, { Component } from 'react';
import Controls from './Controls';
import Navigation from './Navigation';
import { deck } from '../utils/deck';

class Play extends Component {
  state = {
    playerBust: false,
    userCards: [],
    aiCards: [],
    userCount: 0,
    aiCount: 0,
    gameStarted: false,
    gameState: 'INPLAY',
    gameFinished: false,
    dealerTurn: false,
    redeal: false,
    dealerDone: false,
    buttonDisabled: true,
  };

  playerWins = () => {
    if (this.state.userCount <= 21 && this.state.aiCount > 21) {
      return true;
    } else if (
      this.state.aiCount >= 17 &&
      this.state.userCount <= 21 &&
      this.state.userCount > this.state.aiCount
    ) {
      return true;
    } else {
      return false;
    }
  };

  blackJack = () => {
    return this.state.userCount === 21 && this.state.dealerTurn === false;
  };

  tieGame = () => {
    return (
      this.state.userCount === this.state.aiCount && this.state.aiCount >= 17
    );
  };

  dealerWins = () => {
    return (
      (this.state.aiCount <= 21 &&
        this.state.userCount >= 17 &&
        this.state.aiCount > this.state.userCount) ||
      (this.state.aiCount >= 17 &&
        this.state.aiCount <= 21 &&
        this.state.aiCount > this.state.userCount)
    );
  };

  startGame = () => {
    this.setState({
      playerBust: false,
      userCards: [],
      aiCards: [],
      userCount: 0,
      aiCount: 0,
      gameStarted: false,
      gameState: 'INPLAY',
      gameFinished: false,
      dealerTurn: false,
      dealerDone: false,
      buttonDisabled: true,
    });

    setTimeout(() => {
      this.onDeal();
    }, 500);
  };

  onDeal = () => {
    setTimeout(() => this.setState({ buttonDisabled: false }), 5000);
    this.setState({ gameStarted: true });

    setTimeout(() => {
      this.dealACard(this.state.userCards); //Deal a card to dealer
      //Update User's total points
      this.setState({
        userCount: this.getTotal(this.state.userCards),
      });
    }, 500);

    setTimeout(() => {
      this.dealACard(this.state.aiCards); //Deal a card to user
      //Update Ai's total points
      this.setState({ aiCount: this.getTotal(this.state.aiCards) });
    }, 1000);

    setTimeout(() => {
      this.dealACard(this.state.userCards); //Deal a card to user
      //Update Player's total points
      this.setState({
        userCount: this.getTotal(this.state.userCards),
      });
    }, 2000);

    setTimeout(() => {
      const hand = [...this.state.aiCards];
      hand.push(deck[0]);
      this.setState({ aiCards: hand });
    }, 3000);

    //if hand's sum is 21 then its the dealer's turn
    setTimeout(() => {
      if (this.getTotal(this.state.userCards) === 21) {
        this.setState({ playerBust: true });
        setTimeout(() => {
          this.endGame();
        }, 2000);
      }
    }, 5000);
  };

  //Add a card to the player deck stack if the hand's sum is under 21
  hit = () => {
    this.setState({ buttonDisabled: true });

    setTimeout(() => this.setState({ buttonDisabled: false }), 1000);

    //if hand's sum is under 21 add one card
    if (this.state.userCount < 21) {
      this.dealACard(this.state.userCards); //Deal a card to user
    }
    //Update User's total points
    this.setState({
      userCount: this.getTotal(this.state.userCards),
    });

    //if hand's sum is 21 then its the dealer's turn
    if (this.getTotal(this.state.userCards) === 21) {
      this.setState({ playerBust: true });

      this.dealerHand();
    }

    if (this.getTotal(this.state.userCards) > 21) {
      this.setState({ playerBust: true });
      setTimeout(() => {
        this.endGame(); //return that the player lost
      }, 1500);
      this.setState({ playerBust: true });
    }
  };

  //deal cards to the dealer until they get a soft 17 or one card over
  dealerHand = () => {
    this.setState({ dealerTurn: true });
    let hand = this.state.aiCards;
    hand.pop(); //uncover the card by removing the cover card

    //Add card to the dealer hand as long as the sum of the dealer's is less than or equal to 17
    this.drawCard();
  };

  drawCard = () => {
    let currentCount = this.state.aiCount;
    this.dealACard(this.state.aiCards); //Deal a card to user
    //Update Ai's total points
    this.setState({ aiCount: this.getTotal(this.state.aiCards) });
    currentCount = this.getTotal(this.state.aiCards);
    if (currentCount < 17) {
      setTimeout(this.drawCard, 2000);
    } else if (currentCount >= 17) {
      setTimeout(this.endGame, 2000);
    }
  };

  stand = () => {
    this.setState({ buttonDisabled: true });

    setTimeout(() => this.setState({ buttonDisabled: false }), 2000);

    this.setState({ playerBust: true });
    if (this.state.userCount !== 21) {
      this.setState({ gameState: 'STAND' });
      this.dealerHand();
    }
  };

  randomCard = () => {
    return Math.floor(Math.random() * (deck.length - 1)) + 1;
  };

  dealACard = (playerCards) => {
    let playerHand = playerCards;
    let cardNumber = this.randomCard();

    //check if card has been played already
    if (deck[cardNumber].isPlayed) {
      cardNumber = this.randomCard();
      deck[cardNumber].isPlayed = true;
    } else {
      deck[cardNumber].isPlayed = true;
    }
    playerHand.push(deck[cardNumber]);
    this.setState({ playerCards: playerHand });
  };

  // Get a sum of all cards worth and update the state
  getTotal = (deck) => {
    let total = 0;
    let foundAces = 0;

    deck.forEach((card) => {
      if (card.value === 11) {
        //if the value is a 11 track it but don't add
        foundAces++;
      } else {
        total += card.value; //add the value to the total
      }
    });

    if (foundAces > 0) {
      //if the number of Aces is more than 0
      for (var j = 0; j < foundAces; j++) {
        //loop through the number of aces

        if (total + 11 > 21) {
          //if the total of all cards including the Ace is over 21, add the Ace as a 1
          total += 1;
        } else {
          total += 11; //if the total of all cards including the Ace is under 21, add the Ace as a 11
        }
      }
    }
    return total;
  };

  endGame = () => {
    let gameResult = 'STAND';
    if (this.playerWins()) {
      gameResult = 'WIN'; //return that the player won
    } else if (this.state.userCount > 21) {
      gameResult = 'BUST';
    } else if (this.tieGame()) {
      gameResult = 'PUSH';
    } else if (this.blackJack()) {
      gameResult = 'BLACKJACK';
    } else if (this.dealerWins()) {
      gameResult = 'LOSE'; //return that the player lost
    }

    this.setState({ redeal: true });

    this.setState({ gameState: gameResult });

    setTimeout(() => {
      this.setState({ gameFinished: true });
      console.log(this.state);
    }, 1500);
  };

  render() {
    return (
      <div>
        <Navigation />
        <Controls
          playerBust={this.state.playerBust}
          gameStarted={this.state.gameStarted}
          startGame={this.startGame}
          stand={this.stand}
          hit={this.hit}
          aiCount={this.state.aiCount}
          userCount={this.state.userCount}
          aiCards={this.state.aiCards}
          userCards={this.state.userCards}
          gameState={this.state.gameState}
          gameFinished={this.state.gameFinished}
          redeal={this.state.redeal}
          buttonDisabled={this.state.buttonDisabled}
        />
      </div>
    );
  }
}

export default Play;
