import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import NavBar from '../components/NavBar';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
    <div>
          <Image id="main" src="/images/main.jpg"/>
          <h1>Welcome to GYM-PLANNER</h1>
          <NavBar/>
    </div>
    );
  }
}

export default Landing;
