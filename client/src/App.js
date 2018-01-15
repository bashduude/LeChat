import Customers from './components/customers';
import React, { Component } from 'react';
import {ChatWindow} from './components/chat-window';
import {ChatInputField} from './components/chat-input-field';
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

  handleClickSendMessage = (textval) => {
    var messagearr = this.state.messagearr.slice();
    var messageitem = textval;
    messagearr.push(messageitem);
    this.setState(
      {
        messagearr: messagearr,
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
        }
      )
    });

    return (
      <div>
        <ChatWindow>
          <LiMessage messages={this.state.messagearr}/>
        </ChatWindow>
        <ChatInputField value={this.state.value} onChange={this.handleChangeInputField} />
        <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} />
        <Customers />
      </div>
    );
  }
}

export default App;
