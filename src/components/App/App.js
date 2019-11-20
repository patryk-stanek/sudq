import React from "react";
import sudoku from "sudoku-umd";
import {Board} from "../Board/Board";

import "./App.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameBoard: [],
      gameDifficulty: '',
      gameResult: '',
      gameInitialBoard: [],
      chosenNumber: '',
      selectedTile: ''
    }

    this.solvedGameBoard = [];
    this.initialGameBoard = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.newGame("easy");
  }

  newGame(difficulty) {
    const initialGameSetup = sudoku.generate(difficulty);
    const gameArray = initialGameSetup.split('');
    console.log(difficulty);

    this.setState({
      gameBoard: gameArray,
      gameDifficulty: difficulty
    });

    this.solvedGameBoard = sudoku.solve(initialGameSetup);
    this.initialGameBoard = initialGameSetup;
  }

  solveGame() {
    const solvedGame = this.solvedGameBoard.split('');
    this.setState({
      gameBoard: solvedGame
    })
  }

  resetGame() {
    const initialBoard = this.initialGameBoard.split('');
    this.setState({
      gameBoard: initialBoard
    })
  }

  checkGame() {
    const presentGame = this.state.gameBoard.join('');
    this.solvedGameBoard === presentGame ? this.setState({gameResult: "Perfect!"}) : this.setState({gameResult: "Not yet!"})
  }

  handleSelectedTile(id) {
    console.log(id);
    this.setState({
      selectedTile: id
    })
  }

  handleUpdateBoard(id, newVal) {
    const updatedBoard = this.state.gameBoard;

    updatedBoard[id] = newVal;

    this.setState({
      gameBoard: updatedBoard
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.newGame(this.state.gameDifficulty);
  }

  handleChange(event) {
    this.setState({
      gameDifficulty: event.target.value
    })
  }

  render() {
    return (
      <div className="main">
        <form 
          onSubmit={this.handleSubmit.bind(this)}
        >
          <select 
            value={this.state.gameDifficulty}
            onChange={this.handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input type="submit" value="Start New Game" />
        </form>
        {
          this.state.gameBoard && (
            <Board 
              gameData={this.state.gameBoard}
              initData={this.initialGameBoard}
              updateBoard={this.handleUpdateBoard.bind(this)}
              selected={this.handleSelectedTile.bind(this)}
            />
          )
        }
        <button onClick={this.solveGame.bind(this)}>Solve</button>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <button onClick={this.checkGame.bind(this)}>Check</button>
        <span>{this.state.gameResult}</span>
        <span>selected tile: {this.state.selectedTile}</span>
      </div>
    )
  }
}