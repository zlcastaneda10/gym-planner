import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class How extends React.Component {
  render() {
    return (
      <div id="fondo" className="container">
        <div className="row mb-3">
          <div id="descripcion" className="col-12 text-center mt-3">
            <center>
              <h1 className="gym-text-yellow mt-3 mb-3">
                Welcome to Gymplanner
              </h1>
            </center>
            <h5 className="mt-3 mb-3">
              Gymplanner is an application that helps users find 
              a proper routin for the gym
            </h5>
          </div>
        </div>
        <div className="row text-center mt-5">
          <div className="col-md-6 col-sm-12 mb-3">
            <center>
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-info" />
                <i className="fas fa-users fa-stack-1x fa-inverse" />
              </span>
            </center>
            <br />
            If you login as <b className="gym-text">Trainer</b>,
            you have a few options than users doesnt have.
            For example, you can add a routine or see all the routines
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <center>
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x gym-text-light-green" />
                <i className="fas fa-users fa-stack-1x fa-inverse" />
              </span>
            </center>
            <br />
            If you login as <b className="gym-text">user</b>,you only can see 
            the list of routines that the trainers had already pushed and you can 
            rating all of them.Also,if you like a trainers's routine, you can always 
            contact him.
          </div>
          <div className="col-12">
            <br />
          </div>

        </div>
      </div>
    );
  }

}
