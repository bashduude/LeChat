import React from 'react';
import './App.css';

export class ChatInputField extends React.Component {

  handleChange = (e) => {
    const text = e.target.value;
    this.props.onChange(text);
  }

  render() {
    return (
      <div>
        <input
         placeholder="Type your message..."
         value={this.props.value}
         type="text"
         onChange={this.handleChange}
        />
      </div>
    );
  }
}
