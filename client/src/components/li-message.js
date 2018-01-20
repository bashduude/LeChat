import React from 'react';
import './../App.css';

export class LiMessage extends React.Component {

  render() {
    const { liclass } = this.props;
    const { messagestuff } = this.props;
    const messagefixed = messagestuff.slice(1);

    return (
      <div>
          {messagefixed.map(obj => (
            <li className="mymessages" key={obj.messageId}>
              <h3 className="nameandtime">{obj.timestamp} {obj.userId}:</h3>
              <h4 className="textmessage">{obj.text}</h4>
            </li>
          ))}
      </div>
    );
  }
}
