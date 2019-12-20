import React from "react";
import sudoku from "sudoku-umd";
import Fade from 'react-reveal/Fade';
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
      usedSolveGame: false,
      usedCheckGame: false,
      gameWon: false,
      gameBoard: [],
      gameDifficulty: '',
      selectedNumber: '',
      selectedTile: ''
    }

    this.solvedGameBoard = [];
    this.initialGameBoard = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  newGame(difficulty) {
    //Creating game board based on chosen difficulty
    const initialGameSetup = sudoku.generate(difficulty);
    //Spliting numbers from board
    const gameArray = initialGameSetup.split('');

    this.setState({
      gameOn: true,
      usedSolveGame: false,
      usedCheckGame: false,
      gameWon: false,
      gameBoard: gameArray,
      gameDifficulty: difficulty,
      selectedNumber: '',
      selectedTile: ''
    });

    //Creating solved game board for checking purpose
    this.solvedGameBoard = sudoku.solve(initialGameSetup);
    this.initialGameBoard = initialGameSetup;
  }

  solveGame() {
    const solvedGame = this.solvedGameBoard.split('');
    this.setState({
      gameBoard: solvedGame,
      usedSolveGame: true
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
    this.setState({
      usedCheckGame: true
    })
    this.solvedGameBoard === presentGame ? this.setState({gameWon: true}) : this.setState({gameWon: false});
  }

  quitGame() {
    this.setState({
      gameOn: false,
      usedSolveGame: false,
      usedCheckGame: false,
      gameWon: false,
      gameBoard: [],
      gameDifficulty: '',
      selectedNumber: '',
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
      selectedNumber: number
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
        <Fade delay={150}>
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
        </Fade>
        <Fade bottom delay={300}>
          <button
            type="submit"
            className="main__submit"
          >
            <i className="fas fa-play main__icon"></i>
          </button>
        </Fade>
      </form>
    )
  }

  renderGameScreen() {
    return (
      <React.Fragment>
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
          chosenNumber={this.handleChosenNumber.bind(this)}
        />
        <Controls 
          reset={this.resetGame.bind(this)}
          check={this.checkGame.bind(this)}
          solve={this.solveGame.bind(this)}
          quit={this.quitGame.bind(this)}
        />
      </React.Fragment>
    )
  }

  render() {
    const screen = this.state.gameOn === true ? this.renderGameScreen() : this.renderDiffcultyScreen();
    let resultPopUpClass = "";
    let resultPopUpText = "";

    if (this.state.usedCheckGame === true && this.state.gameWon === true && this.state.usedSolveGame === false) {
      resultPopUpClass = 'main__score--won';
      resultPopUpText = "You won!";
    } else if (this.state.usedCheckGame === true && this.state.gameWon === false && this.state.usedSolveGame === false) {
      resultPopUpClass = "main__score--failed";
      resultPopUpText = "Not yet!"
    } else if (this.state.usedCheckGame === true & this.state.usedSolveGame === true) {
      resultPopUpClass = "main__score--solved";
      resultPopUpText = "You didn't solve this board..."
    }

    return (
      <div className="main">
        <Fade top>
          <h1 className="main__header" onClick={this.quitGame.bind(this)}>
            Sud<span className="main__span">q</span>
          </h1>
        </Fade>
        <Fade>
          <span className={`main__score ${resultPopUpClass}`}>{resultPopUpText}</span>
        </Fade>
        {screen}
      </div>
    )
  }
}