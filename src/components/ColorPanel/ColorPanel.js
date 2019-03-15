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

import { SliderPicker } from "react-color";
import firebase from "../../firebase";
class ColorPanel extends Component {
  state = {
    modal: false,
    primary: "",
    secondary: "",
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users")
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handlePrimary = color => this.setState({ primary: color.hex });

  handleSecondary = color => this.setState({ secondary: color.hex });

  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = () => {
    this.state.usersRef
      .child(`${this.state.user.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log("colors added");
        this.closeModal();
      })
      .catch(err => console.error(err));
  };

  render() {
    const { modal, primary, secondary } = this.state;
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
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color" />
              <SliderPicker color={primary} onChange={this.handlePrimary} />
            </Segment>
            <Segment inverted>
              <Label content="Secondary Color" />
              <SliderPicker color={secondary} onChange={this.handleSecondary} />
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

export default ColorPanel;
