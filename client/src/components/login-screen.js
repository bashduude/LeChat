import React from 'react';
import './../App.css';

export class LoginScreen extends React.Component {

  handleChange = (e) => {
    const name = e.target.value;
    this.props.onChange(name);
  }

  handleKeyPress = (key) => {
    const nameval = this.props.name;
    if(nameval !== "" && key.key === 'Enter') {
      this.props.onClick(nameval);
    }
  }

  render() {
    return (
      <div className={this.props.currentStyle}>
        <h1>Welcome To the DewdChat!</h1>
        <h4>To join the chat type your name down below and press Enter</h4>
        <input
          className="namefield"
          placeholder="Type your name..."
          value={this.props.name}
          type="text"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
