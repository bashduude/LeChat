import React from 'react';
import './../App.css';

export class LiMessage extends React.Component {


/*
  ComponentWillReceiveProps = (props) => {
    const chatMessages = props.messages;
    const listItems = chatMessages.map(function(message, i) {
      //<li value={message} key={i}></li>
      alert(message);
    });
  }

*/

  render() {
    const { messages } = this.props;
    const { liclass } = this.props;
    // const { othermessage } = this.props;
    return (
      <div>
        {messages.map(item => (
          <li className={liclass}>{item}</li>
        ))}
      </div>
    );
  }
}