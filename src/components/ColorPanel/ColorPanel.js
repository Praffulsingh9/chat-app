import React, { Component } from "react";
import { Divider, Menu, Sidebar, Button } from "semantic-ui-react";
class ColorPanel extends Component {
  render() {
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
        <Button icon="add" size="small" color="blue" />
      </Sidebar>
    );
  }
}

export default ColorPanel;
