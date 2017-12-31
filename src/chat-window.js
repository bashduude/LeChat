import React from 'react';
import './App.css';

export class ChatWindow extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Dude Chat!</h1>
        <div className="chatwindowbox">
          <ul>
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}
