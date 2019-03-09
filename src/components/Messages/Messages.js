import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser
  };

  render() {
    const { channel, messagesRef, user } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">HELLO</Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
