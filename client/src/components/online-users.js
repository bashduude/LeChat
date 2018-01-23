import React from 'react';
import './../App.css';

export class OnlineUsers extends React.Component {

  render() {

    const { usersArray } = this.props;
    const usersArrayFixed = usersArray.slice(1);

    return (
      <div className="onlineUsers">
        <h3>Online Users:</h3>
        <ul>
          {usersArrayFixed.map(obj => (
            <li>
              <p>{obj.userId}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
