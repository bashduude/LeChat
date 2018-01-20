import React from 'react';
import './../App.css';

export class ChatInputField extends React.Component {

  handleChange = (e) => {
    const text = e.target.value;
    this.props.onChange(text);
  }

  handleKeyPress = (key) => {
    const value = this.props.value;
    const nameval = this.props.username;
    if(value !== "" && nameval !== "" && key.key === 'Enter') {
      this.props.onClick(value, nameval);;
    }
  }

  render() {
    return (
      <div>
        <input
         placeholder="Type your message..."
         value={this.props.value}
         type="text"
         onChange={this.handleChange}
         onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
