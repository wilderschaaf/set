import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <div
        className={"square "+this.props.value[4]}
        onClick={() => this.props.onClick()}
      >
        {this.renderPattern(this.props.value[0],this.props.value[1],this.props.value[2],this.props.value[3])}
      </div>
    );
  }
  renderPattern(i,c,s,f){
      if (i==0){
        return (
          <div className="pattern-container">
            <div className={"one-bg color"+c+" shape"+s+f}/>
          </div>
        );
      }
      else if (i==1) {
        return (
          <div className="pattern-container">
            <div className={"two-bg color"+c+" shape"+s+f}/>
            <div className={"two-bg color"+c+" shape"+s+f}/>
          </div>
        );
      }
      else if (true) {
        return (
          <div className="pattern-container">
            <div className={"three-bg color"+c+" shape"+s+f}/>
            <div className={"three-bg color"+c+" shape"+s+f}/>
            <div className={"three-bg color"+c+" shape"+s+f}/>
          </div>
        );
      }
      return;
  }
}


class Grid extends React.Component {
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
    return (
      <Square
        value={[this.props.number[i],this.props.color[i],this.props.shape[i],this.props.fill[i],this.props.clicked[i]]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }
}

class Deck extends React.Component {

}

class Info extends React.Component {
  render (){
    return (
      <div className = "info-panel">
        <div className = "score">
          Score: {this.props.score}
        </div>
      </div>
    )
  }
}

/* TODO: add a time/score keeping feature and a reset button,
may want to move some control up to this component*/
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      color: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      shape: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      fill: Array.from({length: 12}, () => Math.floor(Math.random() * 3)),
      clickedCount: 0,
      clicked: Array.from({length:12}, () => "unclicked"),
      score: 0,
    };
  }

  handleClick(i) {
    var clicked = this.state.clicked.slice();
    var clickedCount = this.state.clickedCount;
    const number = this.state.number.slice();
    const color = this.state.color.slice();
    const shape = this.state.shape.slice();
    const fill = this.state.fill.slice();
    if (clickedCount === 2 && clicked[i]==="unclicked"){
       clicked[i] = "clicked";
       let index = getClickIndices(clicked);
       console.log(checkSet([number,color,shape,fill],index))
       if (checkSet([number,color,shape,fill],index)){
         let i;
         for (i = 0; i < 3; i++){
           number[index[i]] = Math.floor(Math.random()*3);
           color[index[i]] = Math.floor(Math.random()*3);
           shape[index[i]] = Math.floor(Math.random()*3);
           fill[index[i]] = Math.floor(Math.random()*3);
         }
         this.state.score++;
       }
       clicked = Array.from({length:12}, () => "unclicked");
       this.setState({
         clicked: clicked,
         clickedCount: 0,
         number: number,
         color: color,
         shape: shape,
         fill: fill
       });
       return;
    }
    if (clicked[i]==="unclicked"){
      clickedCount++;
    }
    else{
      clickedCount--;
    }
    clicked[i] = (clicked[i]==="unclicked")?"clicked":"unclicked";
    this.setState({clicked: clicked, clickedCount: clickedCount});
  }

  render() {
    return (
      <div className="game">
        <Info
          score = {this.state.score}
        />
        <div className="game-board">
          <Grid
            number = {this.state.number}
            color = {this.state.color}
            shape = {this.state.shape}
            fill = {this.state.fill}
            clicked = {this.state.clicked}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function checkSet(a,index){
  let i;
  for (i=0; i<4; i++){
    if (!checkProp(a[i][index[0]],a[i][index[1]],a[i][index[2]])){
      return false;
    }
  }
  return true;
}

function checkProp(i,j,k){
  if (i===j && j===k){
    return true;
  }
  if (i!=j && i!=k && k!=j){
    return true;
  }
  return false;
}

function getClickIndices(a){
  let i;
  let b = [];
  for (i = 0; i < 12; i++){
    if (a[i]==="clicked"){
      b.push(i);
    }
  }
  return b;
}
