import React, { Component } from 'react';
import {ChatWindow} from './chat-window';
import {ChatInputField} from './chat-input-field';
import {SendMessage} from './send-message';
import './App.css';

class App extends Component {

  handleChange = (text) => {
    this.setState(
      {
        value: text,
      }
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <div className="App">
        <ChatWindow message={this.state.value}/>
        <ChatInputField value={this.state.value} onChange={this.handleChange} />
        <SendMessage />
      </div>
    );
  }
}

export default App;
