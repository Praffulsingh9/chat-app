import React, { Component } from "react";
import {
  Divider,
  Menu,
  Sidebar,
  Button,
  Modal,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";

import { connect } from "react-redux";
import { setColors } from "../../actions";
import { SliderPicker } from "react-color";
import firebase from "../../firebase";
class ColorPanel extends Component {
  state = {
    modal: false,
    primary: "",
    secondary: "",
    usersRef: firebase.database().ref("users"),
    user: this.props.currentUser,
    userColors: []
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.currentUser.uid);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  addListener = userId => {
    let userColors = [];
    this.state.usersRef.child(`${userId}/colors`).on("child_added", snap => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  removeListener = () => {
    this.state.usersRef
      .child(`${this.state.user.currentUser.uid}/colors`)
      .off();
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.setState({ primary: color.hex });

  handleChangeSecondary = color => this.setState({ secondary: color.hex });

  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        this.closeModal();
      })
      .catch(err => console.error(err));
  };

  displayUserColors = colors =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() => this.props.setColors(color.primary, color.secondary)}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            />
          </div>
        </div>
      </React.Fragment>
    ));

  render() {
    const { modal, primary, secondary, userColors } = this.state;
    return (
      <Sidebar
        as={Menu}
        vertical
        icon="labeled"
        inverted
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal} />
        {this.displayUserColors(userColors)}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color" />
              <SliderPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label content="Secondary Color" />
              <SliderPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark" />
              Save Colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(
  null,
  { setColors }
)(ColorPanel);
