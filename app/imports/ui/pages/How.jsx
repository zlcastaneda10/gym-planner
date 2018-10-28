import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    return (
      <Header textAlign="center">
        <p>This is an application that helps users find a proper routin for the gym.</p>
        <p>If you like a trainers's routine, you can always contact him</p>
      </Header>
    );
  }
}
