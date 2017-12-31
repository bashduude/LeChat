import React from 'react';
import './App.css';

export class SendMessage extends React.Component {

  handleClick = () => {
    alert('Le batton was clicked!');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Отправить</button>
      </div>
    );
  }
}
