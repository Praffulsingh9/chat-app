import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as{" "}
          <strong>{this.state.user.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>SignOut</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("user signed out"))
      .catch(err => console.error(err));
  };

  render() {
    const { user, primaryColor } = this.state;
    const { primaryColor } = this.props;

    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>ChatItOut</Header.Content>
            </Header>

            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image
                      src={user.currentUser.photoURL}
                      spaced="right"
                      avatar
                    />
                    {user.currentUser.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
