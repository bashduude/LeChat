import React, { Component } from 'react';
import {ChatWindow} from './components/chat-window';
import {ChatInputField} from './components/chat-input-field';
import {UsernameInputField} from './components/username-input-field';
import {SendMessage} from './components/send-message';
import {LiMessage} from './components/li-message';
import socketIOClient from 'socket.io-client';
import './App.css';


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
        message: [{
          userId: text
        }],
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
        value: '',
        currentliclass: "mymessages"
      }
    )
    this.socket.emit("chat message", this.state.value);
    console.log(this.state.messagearr);
  }


  constructor(props) {
    super(props);

    this.state = {
      value: '',
      messagearr: [],
      othermessarr: [],
      message: [{
        socketId: "",
        userId: "",
        timestamp: "",
        text: ""
      }],
      currentliclass: "mymessages"
    };

    this.socket = socketIOClient('http://localhost:5000');
  }

  render() {

    var socketId = this.socket.id;
    console.log(socketId);
    // this.setState(
    //   {
    //     message: [{
    //       socketId: socketId
    //     }],
    //   }
    // )


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
          <LiMessage messages={this.state.messagearr} othermessage={this.state.othermessarr} liclass={this.state.currentliclass} />
        </ChatWindow>
        <ChatInputField value={this.state.value} onChange={this.handleChangeInputField} />
        <UsernameInputField name={this.state.message.userId} onChange={this.handleChangeUsernameInputField} />
        <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} username={this.state.message.userId} />
      </div>
    );
  }
}

export default App;
