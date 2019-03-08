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
import firebase from "../../firebase";
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { username, email, password, passwordConfirm } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" icon color="orange">
            <Icon name="puzzle piece" color="orange" />
            Register For Start Chatting
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <FormInput
                fluid
                type="text"
                name="username"
                value={username}
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                type="email"
                name="email"
                value={email}
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
              />

              <FormInput
                fluid
                type="password"
                name="password"
                value={password}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
              />

              <FormInput
                fluid
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
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
