import React, { Component } from "react";
import md5 from "md5";
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
    passwordConfirm: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  isFormValid = () => {
    let errors = [];
    let error = {};

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all Fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Pasword is Invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirm }) => {
    return (
      !email.length ||
      !username.length ||
      !password.length ||
      !passwordConfirm.length
    );
  };

  isPasswordValid = ({ password, passwordConfirm }) => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      return false;
    } else if (password !== passwordConfirm) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                this.setState({ loading: false });
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      errors,
      loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center" icon color="orange">
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

              <FormInput
                fluid
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                className={this.handleInputError(errors, "passwordConfirm")}
                onChange={this.handleChange}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
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
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
