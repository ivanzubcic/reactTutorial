import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
  render() {
    return (
      <button className={this.props.winner ? 'square-winner' : 'square'} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}*/

function Square(props){
	return(
		<button className={props.winner ? 'square-winner' : 'square'} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
/*  constructor(props){
  	super(props);
  	this.state = {
  		squares: Array(9).fill(null),
  		xIsNext: true,
  	};
  }*/

/*  handleClick(i){
  	const squares = this.state.squares.slice();
  	if(calculateWinner(squares) || squares[i]){
  		return;
  	}
  	squares[i] = this.state.xIsNext ? 'X' : 'O';
  	this.setState({squares: squares,
  				   xIsNext: !this.state.xIsNext});
  }*/

  renderSquare(i) {
    return ( 
    	<Square
    		winner={this.props.winner && this.props.winner.includes(i) ? '1' : ''}
    		value={this.props.squares[i]}
    		onClick={() => this.props.onClick(i)}/>
    	);
  }

  render() {
  	/*let status = 'Next player: ' +(this.state.xIsNext ? 'X' : 'O');
  	const winner = calculateWinner(this.state.squares);
  	if(winner){
  		status = "Winner: " + winner;
  	}*/

  	/*
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
  	*/
    return (
      <div>
      	{Array.apply(null, Array(3)).map((item, i) => {
      		return(
				<div className="board-row">
					{Array.apply(null, Array(3)).map((item, j) => {
						return this.renderSquare(3*i+j);
					})}
				</div>
			);
      	})}
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		history: [{
  			squares: Array(9).fill(null),
  			playerMove: -1,
  		}],
  		xIsNext:true,
  		stepNumber:0,
  		reverseHistory:false,
  	};
  }

  handleClick(i){
  	const history = this.state.history.slice(0, this.state.stepNumber+1);
  	const current = history[history.length - 1];
  	const squares = current.squares.slice();
  	if(calculateWinner(squares) || squares[i]){
  		return;
  	}
  	squares[i] = this.state.xIsNext ? 'X' : 'O';
  	this.setState({history: history.concat([{
  						squares: squares,
  						playerMove:i,
  						}]),
  				   xIsNext: !this.state.xIsNext,
  				   stepNumber: history.length,});
  }

  jumpTo(step){
  	this.setState({
  		stepNumber: step,
  		xIsNext: (step % 2) === 0,
  	});
  }

  reverseHistory(){
  	this.setState({
  		reverseHistory:!this.state.reverseHistory,
  		stepNumber:this.state.history.length-1-this.state.stepNumber,
  	});
  }

  render() {
  	let history;
  	if(this.state.reverseHistory){
  		history=this.state.history.slice(0).reverse();
  	}else{
  		history = this.state.history;
  	}
  	const current = history[this.state.stepNumber];
  	const winner = calculateWinner(current.squares);

  	const moves = history.map((step, move) => {
  		const curr = history[move];
  		const plMove = curr.playerMove;
  		let desc;
  		if(this.state.reverseHistory){
  			desc = move!==history.length-1 ? 
  							'Go to move #'+(history.length-1-move)+"("+plMove%3+","+Math.floor(plMove/3)+")"
  							: 'Go to game start';
  		}else{
			desc = move ? 'Go to move #'+move+"("+plMove%3+","+Math.floor(plMove/3)+")"
  							: 'Go to game start';
  		}

		return (			
  			<li key={move}>
  				<button className={this.state.stepNumber===move ? 'button-clicked' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
  			</li>
  		);

  	});
 
  	let status;
  	if(winner){
  		status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
  	}else{
  		status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');		
  	}
    return ( 
      <div className="game">
        <div className="game-board">
          <Board 
          	winner={winner}
          	squares={current.squares}
          	onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
          	<button onClick={() => this.reverseHistory()}>Asc/Desc</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);