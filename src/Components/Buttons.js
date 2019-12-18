import React from 'react';
import { Button, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';
import '../index.css';

class Buttons extends React.Component {

 handleSelect = (evt) => {
     this.props.seed(evt);
 }

  render() {
    return (
      <div className="buttons">
        <ButtonToolbar>
					<Button variant="primary" onClick={this.props.playButton}>
						Play
					</Button>
					<Button variant="secondary" onClick={this.props.pauseButton}>
					  Pause
					</Button>
          <Button variant="secondary" onClick={this.props.resetGrid}>
					  Clear
					</Button>
					<Button variant="secondary" onClick={this.props.slow}>
					  Slow
					</Button>
					<Button variant="secondary" onClick={this.props.fast}>
					  Fast
					</Button>

          <DropdownButton
            title="Seed"
            id="seed-menu"
            variant="secondary"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">Random</Dropdown.Item>
            <Dropdown.Item eventKey="2">Hover</Dropdown.Item>
          </DropdownButton>

        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
