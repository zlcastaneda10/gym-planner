import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    return (
      <Header textAlign="center">
        <p>This is an application that helps users find a proper routin for the gym.</p>
        <p>For the login you can enter as a Trainer or as a user.</p>
        <p>If you enter as a Trainer you have a few options than users doesnt have.For example, you can add a routine or see all the routines</p>
        <p>If you enter as a User you only can see the list of routines that the trainers had already pushed and you can rating all of them</p>       
        <p>If you like a trainers's routine, you can always contact him</p>
      </Header>
    );
  }
}
