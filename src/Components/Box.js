import React from 'react';
import '../index.css';

class Box extends React.Component {

  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render() {
    if (this.props.hover === true) {
      return(
        <div
          className={this.props.boxClass}
          onMouseOver={this.selectBox}
        />
      );
    }
    else {
      return(
        <div
          className={this.props.boxClass}
          onClick={this.selectBox}
        />
      );
    }
  }
}

export default Box;
