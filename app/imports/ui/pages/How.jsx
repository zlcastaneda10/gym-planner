import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    return (
      <Header textAlign="center">
        <p>This is an application that seeks people to find exercise routines published by coaches without the need to go to the gym.</p>
      </Header>
    );
  }
}