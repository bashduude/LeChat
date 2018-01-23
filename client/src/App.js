import React, { Component } from 'react';
import {ChatWindow} from './components/chat-window';
import {ChatInputField} from './components/chat-input-field';
import {UsernameInputField} from './components/username-input-field';
import {SendMessage} from './components/send-message';
import {LiMessage} from './components/li-message';
import {LoginScreen} from './components/login-screen';
import {OnlineUsers} from './components/online-users';
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
        userId: text,
      }
    )
  }

  //processing name that was given in loginscreen and opening chat
  handleClickLoginScreen = (nameval) => {

    //getting current list of users
    var currentusers = this.state.users.slice();

    //generating custom background color
    var rColor = Math.floor(Math.random() * 210) + 70;
    var gColor = Math.floor(Math.random() * 210);
    var bColor = Math.floor(Math.random() * 210) + 70;
    var bGOpacity = 0.15;
    var yourBGColor = "rgba("+ rColor + ", " + gColor + ", " + bColor + ", " + bGOpacity +")";

    var cursocket = this.socket.id;
    console.log(cursocket);

    //creating new user with custon username and random BackGcolor
    var newuser = {
      userId: nameval,
      yourBGColor: yourBGColor,
      userSocket: cursocket
    }

    currentusers.push(newuser);

    this.setState(
      {
        userId: "",
        users: currentusers,
        loginscreenStyle: {
          classNames: "loginscreen loginscreenDisplay"
        },
        chatPageStyle: {
          classNames: "chatPage"
        }
      }
    )

    this.socket.emit("user joined", newuser);

  }

  handleClickSendMessage = (textval, nameval) => {

    //taking current array of obj from state
    var prevmess = this.state.message.slice();

    //generating random messageId
    var messageId = uuidv4();

    //creating timestamp
    var timeoptions = { hour: '2-digit', minute: '2-digit' };
    var timestamp = new Date().toLocaleString('ru-RU', timeoptions);

    var newmess = {
      userId: nameval,
      timestamp: timestamp,
      text: textval,
      messageId: messageId,
      userClass: "messagesharedclass mymessages",
      nameandtimeClass: "nameandtime",
      yourBGColor: null
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

    this.socket = socketIOClient('http://localhost:5000');

    console.log(this.socket);

    this.state = {
      value: '',
      userId: "",
      message: [{
        userId: null,
        timestamp: null,
        text: null,
        messageId: "",
        userClass: null,
        nameandtimeClass: null,
        yourBGColor: null
      }],
      users: [{
        userId: null,
        yourBGColor: null,
        userSocket: null
      }],
      loginscreenStyle: {
        classNames: "loginscreen"
      },
      chatPageStyle: {
        classNames: "chatPage chatPageDisplay"
      }
    };

  }

  render() {

    // this portion of code until setState adding messages to the state
    // from other chatters
    var message = this.state.message.slice();
    this.socket.on("chat message", (msgobj) => {

      //randombgcolor
      var rColor = Math.floor(Math.random() * 210) + 70;
      var gColor = Math.floor(Math.random() * 210);
      var bColor = Math.floor(Math.random() * 210) + 70;
      var bGOpacity = 0.15;
      var yourBGColor = "rgba("+ rColor + ", " + gColor + ", " + bColor + ", " + bGOpacity +")";

      //after getting another users message from the server, i set it a custom
      // background that was generated(not done yet, its random bg every message for now) when user joined the chat
      var others = {
        userId: msgobj.userId,
        timestamp: msgobj.timestamp,
        text: msgobj.text,
        messageId: msgobj.messageId,
        userClass: "messagesharedclass othermessages",
        nameandtimeClass: "nameandtime",
        yourBGColor: yourBGColor
      };

      message.push(others);

      this.setState(
        {
          message: message,
        }
      )

    });

    //this portion of code adding users to the state from the server
    var users = this.state.users.slice();
    this.socket.on("user joined", (userobj) => {

      users.push(userobj);

      this.setState(
        {
          users: users
        }
      )

    });

    return (
      <div>
        <LoginScreen currentStyle={this.state.loginscreenStyle.classNames} name={this.state.userId} onChange={this.handleChangeUsernameInputField} onClick={this.handleClickLoginScreen}/>
        <div className={this.state.chatPageStyle.classNames}>
          <OnlineUsers usersArray={this.state.users} />
          <ChatWindow>
            <LiMessage messagestuff={this.state.message} />
          </ChatWindow>
          <UsernameInputField name={this.state.message.userId} onChange={this.handleChangeUsernameInputField} />
          <ChatInputField value={this.state.value} username={this.state.userId} onChange={this.handleChangeInputField} onClick={this.handleClickSendMessage} />
          <SendMessage onClick={this.handleClickSendMessage} value={this.state.value} username={this.state.userId} />
        </div>
      </div>
    );
  }
}

export default App;
