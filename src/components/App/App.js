import React from "react";
import sudoku from "sudoku-umd";
import { Board } from "../Board/Board";
import { Numbers } from "../Numbers/Numbers";
import { Controls } from "../Controls/Controls";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import "./App.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOn: false,
      gameBoard: [],
      gameDifficulty: '',
      gameResult: '',
      chosenNumber: '',
      selectedTile: ''
    }

    this.solvedGameBoard = [];
    this.initialGameBoard = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  newGame(difficulty) {
    const initialGameSetup = sudoku.generate(difficulty);
    const gameArray = initialGameSetup.split('');

    this.setState({
      gameOn: true,
      gameBoard: gameArray,
      gameDifficulty: difficulty,
      gameResult: '',
      chosenNumber: '',
      selectedTile: ''
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

  quitGame() {
    this.setState({
      gameOn: false,
      gameBoard: [],
      gameDifficulty: '',
      gameResult: '',
      chosenNumber: '',
      selectedTile: ''
    })
  }

  handleSelectedTile(id) {
    this.setState({
      selectedTile: id
    })
  }

  handleChosenNumber(number) {
    this.setState({
      chosenNumber: number
    })
    this.handleUpdateBoard(this.state.selectedTile, number)
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

  renderDiffcultyScreen() {
    return (
      <form 
        className="main__form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div>
          <input
            name="difficulty"
            className="main__option" 
            type="radio"
            value="easy"
            id="option-easy"
            onChange={this.handleChange}
            defaultChecked
          />
          <label 
            className="main__label"
            htmlFor="option-easy"
          >
            Easy
          </label>
          <input
            name="difficulty"
            className="main__option" 
            type="radio"
            value="medium"
            id="option-medium"
            onChange={this.handleChange}
          />
          <label 
            className="main__label"
            htmlFor="option-medium"
          >
            Medium
          </label>
          <input
            name="difficulty"
            className="main__option" 
            type="radio"
            value="hard"
            id="option-hard"
            onChange={this.handleChange}
          />
          <label 
            className="main__label"
            htmlFor="option-hard"
          >
            Hard
          </label>
        </div>
        <button
          type="submit"
          className="main__submit"
        >
          <i className="fas fa-play main__icon"></i>
        </button>
      </form>
    )
  }

  renderGameScreen() {
    return (
      <div>
        {
          this.state.gameBoard && (
            <Board 
              gameData={this.state.gameBoard}
              initData={this.initialGameBoard}
              updateBoard={this.handleUpdateBoard.bind(this)}
              selected={this.handleSelectedTile.bind(this)}
              selectedTile={this.state.selectedTile}
            />
          )
        }
        <Numbers 
          numberOption={this.handleChosenNumber.bind(this)}
        />
        <Controls 
          reset={this.resetGame.bind(this)}
          check={this.checkGame.bind(this)}
          solve={this.solveGame.bind(this)}
          quit={this.quitGame.bind(this)}
        />
        {/* <button onClick={this.solveGame.bind(this)}>Solve</button>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <button onClick={this.checkGame.bind(this)}>Check</button>
        <button onClick={this.quitGame.bind(this)}>Quit</button> */}
      </div>
    )
  }

  render() {
    const screen = this.state.gameOn === true ? this.renderGameScreen() : this.renderDiffcultyScreen();

    return (
      <div className="main">
        <h1 className="main__header" onClick={this.quitGame.bind(this)}>
          Sud<span className="main__span">q</span>
        </h1>
        {screen}
      </div>
    )
  }
}