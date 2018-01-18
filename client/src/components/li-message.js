import React from 'react';
import './../App.css';

export class LiMessage extends React.Component {


  render() {
    // const { messages } = this.props;
    const { liclass } = this.props;
    const { messagestuff } = this.props;
    return (
      <div>
          {messagestuff.map(obj => (
            <li className={liclass} key={obj.messageId}>{obj.timestamp} {obj.userId}: {obj.text}</li>
          ))}
      </div>
    );
  }
}
