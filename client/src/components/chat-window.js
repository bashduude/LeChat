import React from 'react';
import './../App.css';

export class ChatWindow extends React.Component {

  componentDidUpdate(prevProps, prevState){
    this.scrollToBottom();
  }

  scrollToBottom() {
    const {chatwindowbox} = this.refs;
    chatwindowbox.scrollTop = chatwindowbox.scrollHeight - chatwindowbox.clientHeight;
  }


  render() {
    return (
      <div>
        <h1>Welcome to the Dude Chat!</h1>
        <div  ref={"chatwindowbox"}
              className="chatwindowbox">
          <ul>
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}
