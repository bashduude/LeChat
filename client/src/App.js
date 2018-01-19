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

  // componentWillMount(){
  //   const socket = socketIOClient('http://localhost:5000');
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.socket.on("chat message", function(msg){
  //     this.setState(
  //       {
  //
  //       }
  //     )
  //   });
  // }

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
    var messagearr = this.state.messagearr.slice();
    var messageitem = textval;
    messagearr.push(messageitem);
    var prevmess = this.state.message.slice();
    var messageId = uuidv4();

    //creating timestamp
    var timeopt = { hour: '2-digit', minute: '2-digit' };
    var timestamp = new Date().toLocaleString('ru-RU', timeopt);

    var newmess = {
      userId: nameval,
      timestamp: timestamp,
      text: textval,
      messageId: messageId
    }
    prevmess.push(newmess);
    this.setState(
      {
        messagearr: messagearr,
        value: '',
        currentliclass: "mymessages",
        message: prevmess
      }
    )
    this.socket.emit("chat message", this.state.value);
  }


  constructor(props) {
    super(props);

    this.state = {
      value: '',
      messagearr: [],
      userId: "",
      message: [{
        userId: null,
        timestamp: null,
        text: null,
        messageId: ""
      }],
      currentliclass: "mymessages"
    };

    this.socket = socketIOClient('http://localhost:5000');
  }

  render() {

    var messagearr = this.state.messagearr.slice();
    this.socket.on("chat message", (msg) => {
      messagearr.push(msg);
      this.setState(
        {
          messagearr: messagearr,
          currentliclass: "othermessages"
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
