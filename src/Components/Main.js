import React from 'react';
import '../index.css';
import Grid from './Grid';
import Buttons from './Buttons';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.rows = 30;
    this.cols = 50;
    this.speed = 1000;

    this.state = {
      hover : false,
      generation : 0,
      // 2D array representing a grid
      gridFull : Array(this.rows).fill(null).map(() => Array(this.cols).fill(false))
    }
  }

  // If the box is selected, its boolean value is altered
  selectBox = (row, col) => {
    let gridCopy = [...this.state.gridFull];
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({gridFull: gridCopy});
  };

  playButton = () => {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalID);
  }

  // Clear the grid, set generation to 0
  resetGrid = () => {
    let gridCopy = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
    this.setState({gridFull : gridCopy, generation : 0});
    console.log("reset done");
  }

  slow = () => {
    this.speed = 1000;
		this.playButton();
  }

  fast = () => {
    this.speed = 100;
		this.playButton();
  }

  play = () => {
    let g = this.state.gridFull;
    let g2 = [...this.state.gridFull];

    // Game Logic following the rules of Conway's Game of Life
    for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
        let count = 0;

		    if (i > 0) {
          if (g[i - 1][j]){
            count++;
          }
        }

		    if (i > 0 && j > 0){
          if (g[i - 1][j - 1]) {
            count++;
          }
        }
		    if (i > 0 && j < this.cols - 1) {
          if (g[i - 1][j + 1]) {
            count++;
          }
        }
		    if (j < this.cols - 1) {
          if (g[i][j + 1]) {
            count++;
          }
        }
		    if (j > 0) {
          if (g[i][j - 1]) {
            count++;
          }
        }
		    if (i < this.rows - 1) {
          if (g[i + 1][j]) {
            count++;
          }
        }
		    if (i < this.rows - 1 && j > 0) {
          if (g[i + 1][j - 1]) {
            count++;
          }
        }
		    if (i < this.rows - 1 && j < this.cols - 1) {
          if (g[i + 1][j + 1]) {
            count++;
          }
        }
		    if (g[i][j] && (count < 2 || count > 3)) {
          g2[i][j] = false;
        }

		    if (!g[i][j] && count === 3) {
          g2[i][j] = true;
        }

		  }
		}

    this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});
  }

  seed = (evt) => {
    // Reset the grid
    this.resetGrid();

    // Random seed (25% chance for each cell to be alive)
    if(evt === "1"){
      this.setState({hover : false});
      console.log("hover = " + this.state.hover);
      let gridCopy = [...this.state.gridFull];
      for (let i=0; i<this.rows; i++){
        for (let j=0; j<this.cols; j++){
          if(Math.floor(Math.random()*1000) === 2){
            gridCopy[i][j] = true;
          }
        }
      }
      this.setState({gridFull : gridCopy});
    }
    // Hover mode
    else{
      this.setState({hover : true});
      console.log("hover = " + this.state.hover);
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(this.play, 100000);
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          gridSize={this.gridSize}
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clear={this.clear}
          slow={this.slow}
          fast={this.fast}
          seed={this.seed}
          resetGrid={this.resetGrid}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          hover={this.state.hover}
        />
        <h2>Generations : {this.state.generation}</h2>
      </div>
    );
  }
}

export default Main;
