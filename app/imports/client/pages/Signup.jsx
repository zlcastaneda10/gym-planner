import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Accounts } from "meteor/accounts-base";

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */

const options=[
  { key: 'a', text: 'Trainer', value: 'admin' },
  { key: 'u', text: 'User', value: 'user' }
]
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "", redirect: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  
  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, address, roles } = this.state;
    console.log(email, password, roles);
    Accounts.createUser({ email, username: email, password, address, roles }, err => {
      console.log(err);
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ redirect: true });
      }
    });
  }

  /** Display the signup form. */
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else
      return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Select
                  label="Role"
                  options={options}
                  placeholder="Trainer or User"
                  required
                  name="roles"
                  onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Address"
                    icon="map"
                    iconPosition="left"
                    name="address"
                    placeholder="Address (Your address,city,country)"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Submit" />
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === "" ? (
                ""
              ) : (
                <Message
                  error
                  header="Registration was not successful"
                  content={this.state.error}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      );
  }
}

export default Signup;
