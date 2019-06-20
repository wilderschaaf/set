import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <div className="square">
        {this.renderPattern(this.props.value[0],this.props.value[1],this.props.value[2])}
      </div>
    );
  }
  renderPattern(i,c,s){
      if (i==0){
        return (
          <div className="pattern-container">
            <div className={"one-bg color"+c}/>
          </div>
        );
      }
      else if (i==1) {
        return (
          <div className="pattern-container">
            <div className={"two-bg color"+c}/>
            <div className={"two-bg color"+c}/>
          </div>
        );
      }
      else if (true) {
        return (
          <div className="pattern-container">
            <div className={"three-bg color"+c}/>
            <div className={"three-bg color"+c}/>
            <div className={"three-bg color"+c}/>
          </div>
        );
      }
      return;
  }
}


class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      color: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      shade: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
    };
  }
  render() {
    return (
      <div className = "game-container">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
      </div>
    );
  }
  renderSquare(i){
    return <Square value={[this.state.number[i],this.state.color[i],this.state.shade[i]]}/>
  }
}

class Deck extends React.Component {

}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Grid />
        </div>
        <div className="deck">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
