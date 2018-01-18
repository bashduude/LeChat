import React from 'react';
import './../App.css';

export class UsernameInputField extends React.Component {

  handleChange = (e) => {
    const name = e.target.value;
    this.props.onChange(name);
  }

  render() {
    return (
      <div>
        <input
          className="namefield"
          placeholder="Type your name..."
          value={this.props.name}
          type="text"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
