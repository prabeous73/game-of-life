import React from 'react';
import Box from './Box';
import '../index.css';

class Grid extends React.Component {

  render() {

    let boxClass = "";

    const boxes = this.props.gridFull.map((arrayRow, indexRow) => {
      return(
        arrayRow.map((box, indexCol) => {
          boxClass = this.props.gridFull[indexRow][indexCol] ? "box on" : "box off"
          return(
            <Box
              row={indexRow}
              col={indexCol}
              key={indexRow + "_" + indexCol}
              boxClass={boxClass}
              selectBox={this.props.selectBox}
              hover={this.props.hover}
            />
          );
        })
      );
    });
    return(
      <div className="grid">
        {boxes}
      </div>
    );
  }
}

export default Grid;
