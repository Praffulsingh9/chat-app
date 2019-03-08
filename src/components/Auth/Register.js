import React, { Component } from "react";
import {
  FormInput,
  Grid,
  Form,
  Segment,
  Message,
  Header,
  Button,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {};

  handleChange = () => {};

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" icon color="orange">
            <Icon name="puzzle piece" color="orange" />
            Register For Start Chatting
          </Header>
          <Form size="large">
            <Segment stacked>
              <FormInput
                fluid
                type="text"
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                type="email"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
              />

              <FormInput
                fluid
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
              />

              <FormInput
                fluid
                type="password"
                name="passwordConfirm"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Button color="orange" size="large" fluid>
                Submit
              </Button>
              <Message>
                Already a user? <Link to="/login">Login</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
