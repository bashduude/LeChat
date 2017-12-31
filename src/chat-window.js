import React from 'react';
import './App.css';

export class ChatWindow extends React.Component {
  render() {
    return (
      <div>
        <h1>its a window component!</h1>
        <div className="chatwindowbox">
          <ul>
            <li>{this.props.message}</li>
            <li>message 2</li>
          </ul>
        </div>
      </div>
    );
  }
}
