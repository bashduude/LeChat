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
            <li className={liclass} key={obj.messageId}>
              <h3 className="nameandtime">{obj.timestamp} {obj.userId}:</h3>
              <h4 className="textmessage">{obj.text}</h4>
            </li>
          ))}
      </div>
    );
  }
}
