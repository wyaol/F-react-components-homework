import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);

    setInterval(() => {
      this.checkReply();
    }, 1000);
  }

  checkReply = () => {
    const { messages } = this.state;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === ROLE.CUSTOMER) {
      const res = answersData.find((answer) => {
        return answer.tags.find((tag) => lastMessage.text.includes(tag));
      });
      if (res == null) return;
      this.sendByRobot(res.text);
    }
  };

  sendByCustomer = (text) => {
    this.sendMessage(text, ROLE.CUSTOMER);
  };

  sendByRobot = (text) => {
    this.sendMessage(text, ROLE.ROBOT);
  };

  sendMessage = (text, role) => {
    const message = {
      text,
      role,
    };
    this.setState((prev) => ({ messages: prev.messages.concat(message) }));
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput sendMessage={this.sendByCustomer} />
      </main>
    );
  }
}

export default Chat;
