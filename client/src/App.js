import React, { Component } from 'react';
import {ChatWindow} from './components/chat-window';
import {ChatInputField} from './components/chat-input-field';
import {UsernameInputField} from './components/username-input-field';
import {SendMessage} from './components/send-message';
import {LiMessage} from './components/li-message';
import socketIOClient from 'socket.io-client';
import './App.css';
const uuidv4 = require('uuid/v4');


class App extends Component {

  handleChangeInputField = (text) => {
    this.setState(
      {
        value: text,
      }
    )
  }

  handleChangeUsernameInputField = (text) => {
    this.setState(
      {
        userId: text
      }
    )
  }

  handleClickSendMessage = (textval, nameval) => {
    var prevmess = this.state.message.slice();
    var messageId = uuidv4();

    //creating timestamp
    var timeoptions = { hour: '2-digit', minute: '2-digit' };
    var timestamp = new Date().toLocaleString('ru-RU', timeoptions);

    var newmess = {
      userId: nameval,
      timestamp: timestamp,
      text: textval,
      messageId: messageId
    }

    prevmess.push(newmess);

    this.setState(
      {
        value: '',
        message: prevmess
      }
    )

    this.socket.emit("chat message", newmess);
  }


  constructor(props) {
    super(props);

    this.state = {
      value: '',
      userId: "",
      message: [{
        userId: null,
        timestamp: null,
        text: null,
        messageId: ""
      }]
    };

    this.socket = socketIOClient('http://localhost:5000');
  }

  render() {

    var message = this.state.message.slice();

    this.socket.on("chat message", (msgarr) => {
      message.push(msgarr);

      this.setState(
        {
          message: message,
        }
      )

    });

    return (
      <div>
        <ChatWindow>
          <LiMessage messages={this.state.messagearr} messagestuff={this.state.message} liclass={this.state.currentliclass} />
        </ChatWindow>
        <UsernameInputField name={this.state.message.userId} onChange={this.handleChangeUsernameInputField} />
        <ChatInputField value={this.state.value} onChange={this.handleChangeInputField} />
        <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} username={this.state.userId} />
      </div>
    );
  }
}

export default App;
