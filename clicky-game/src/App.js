import React, { Component } from 'react';
import './App.css';

import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import photos from "./photos.json";

class App extends Component {
  state = {
    photos,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({ highscore: this.state.score }, function() {
        console.log(this.state.highscore);
      })
    }
    this.state.photos.forEach(card => {
      card.count = 0;
    })
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({ score: 0 })
    return true;
  }

  clickCount = id => {
    this.state.photos.find((o, i) => {
      if (o.id === id) {
        if (photos[i].count === 0) {
          photos[i].count = photos[i].count + 1;
          this.setState({ score: this.state.score + 1 }, function() {
            console.log(this.state.score);
          });
          this.state.photos.sort( () => Math.random() - 0.5 )
          return true
        } else {
          this.gameOver();
        }
      }
    })
  };

  render() {
    return (
      <Wrapper>
        <Header score = { this.state.score } highscore = { this.state.highscore } >Clicky Game </Header>
        {this.state.photos.map (card => (
          <Card
            clickCount= { this.clickCount }
            id= { card.id }
            key= { card.id }
            image = { card.image }
          />
        ))}
      </Wrapper>
    )
  };
}

export default App;
