import React from 'react';
import './../App.css';

export class LiMessage extends React.Component {

  render() {
    const { messagestuff } = this.props;
    const messagefixed = messagestuff.slice(1);

    return (
      <div>
          {messagefixed.map(obj => (
            <div className={obj.userClass} key={obj.messageId} style={{background: obj.yourBGColor}}>
              <li>
                <h3 className={obj.nameandtimeClass}>{obj.timestamp} {obj.userId}:</h3>
                <h4 className="textmessage">{obj.text}</h4>
              </li>
            </div>

          ))}
      </div>
    );
  }
}
