import React, { Component } from 'react';
import {ChatWindow} from './chat-window';
import {ChatInputField} from './chat-input-field';
import {SendMessage} from './send-message';
import {LiMessage} from './li-message';
import './App.css';


class App extends Component {

  handleChangeInputField = (text) => {

    this.setState(
      {
        value: text,
      }
    )
  }

  handleClickSendMessage = (textval) => {
    var messagearr = this.state.messagearr.slice();
    var messageitem = textval;

    messagearr.push(messageitem);

    this.setState(
      {
        messagearr: messagearr,
      }
    )
    console.log(this.state.messagearr);
  }


  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messagearr: [],
    };
  }

  render() {
    return (
      <div>
        <ChatWindow>
          <LiMessage messages={this.state.messagearr}/>
        </ChatWindow>
        <ChatInputField value={this.state.value} onChange={this.handleChangeInputField} />
        <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} />
      </div>
    );
  }
}

export default App;
