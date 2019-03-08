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
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      });
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center" icon color="violet">
            <Icon name="code branch" color="violet" />
            Login to Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <FormInput
                fluid
                type="email"
                name="email"
                value={email}
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                className={this.handleInputError(errors, "email")}
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
                className={this.handleInputError(errors, "password")}
                onChange={this.handleChange}
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                size="large"
                fluid
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an Account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
