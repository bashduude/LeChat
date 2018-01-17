import React from 'react';
import './../App.css';

export class SendMessage extends React.Component {

  handleClick = () => {
    const textval = this.props.value;
    this.props.onClick(textval);

  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}> Отправить</button>
      </div>
    );
  }
}
