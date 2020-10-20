import React, { Component } from 'react';
import { Provider } from './context';

import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';


class App extends Component {
  state = {
    players: [
      {
        name: "Guil",
        id: 1,
        score: 0
      },
      {
        name: "Treasure",
        id: 2,
        score: 0
      },
      {
        name: "Ashley",
        id: 3,
        score: 0
      },
      {
        name: "James",
        id: 4,
        score: 0
      }
    ]
  };

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
    score: prevState.players[index].score += delta
    }));

  } 

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return{
        players: [
          ...prevState.players,
          {
            name, 
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      }
    });
  }

  // player id counter
  prevPlayerId = 4;

  checkHighScore = (player) => {
    let highScore = 0;
    this.state.players.forEach(p => {
      if(p.score > highScore){
        highScore = p.score;
      }
    });

    if(player.score >= highScore){
      return true;
    }else{
      return false;
    }
  }

  render() {
    return (
      <Provider value={this.state.players}>
        <div className="scoreboard">
          <Header />
    
          {/* Players list */}
          {this.state.players.map( (player, index) =>
            <Player 
              name={player.name}
              id={player.id}
              score={player.score}     
              key={player.id.toString()} 
              index={index}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}
              isHighScore={this.checkHighScore(player)}    
            />
          )}

          <AddPlayerForm addPlayer={this.handleAddPlayer} />
        </div>
      </Provider>
    );
  }
}

export default App;
