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
      messageId: messageId,
      userClass: "mymessages"
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
        messageId: "",
        userClass: null
      }],
      users: [{
        userId: null
      }]
    };

    this.socket = socketIOClient('http://localhost:5000');
  }

  render() {

    var message = this.state.message.slice();
    this.socket.on("chat message", (msgobj) => {
      var others = {
        userId: msgobj.userId,
        timestamp: msgobj.timestamp,
        text: msgobj.text,
        messageId: msgobj.messageId,
        userClass: "othermessages"
      };
      
      message.push(others);

      this.setState(
        {
          message: message,
        }
      )

    });

    return (
      <div className="chatPage">
        <ChatWindow>
          <LiMessage messages={this.state.messagearr} messagestuff={this.state.message} />
        </ChatWindow>
        <UsernameInputField name={this.state.message.userId} onChange={this.handleChangeUsernameInputField} />
        <ChatInputField value={this.state.value} username={this.state.userId} onChange={this.handleChangeInputField} onClick={this.handleClickSendMessage} />
        <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} username={this.state.userId} />
      </div>
    );
  }
}

export default App;
