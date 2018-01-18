import React from 'react';
import './../App.css';

export class SendMessage extends React.Component {

  handleClick = () => {
    const textval = this.props.value;
    const nameval = this.props.username;
    if (textval !== "" && nameval !== "") {
      this.props.onClick(textval, nameval);
    }
  }


  render() {
    return (
      <div>
        <button onClick={this.handleClick}> Отправить</button>
      </div>
    );
  }
}
