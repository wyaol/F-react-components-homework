import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  handleOnClick = () => {
    const { sendMessage } = this.props;
    sendMessage(this.chatInput.value);
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          ref={(val) => {
            this.chatInput = val;
          }}
        />
        <button type="button" onClick={this.handleOnClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
