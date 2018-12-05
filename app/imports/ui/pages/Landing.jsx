import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Logo from "/imports/ui/components/Logo";

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/gym-routine.png"/>
          </Grid.Column>

          
          <Grid.Column width={8}>
            <h1>Welcome to GYM-PLANNER</h1>
            <p>Find a routine according to your goals!</p>
          </Grid.Column>
          

        </Grid>
        <Grid verticalAlign='middle' textAlign='center' container>
        <Grid.Column width={12}>
            <Image size='small' src="/images/background.jpg"/>
          </Grid.Column>
        </Grid>
        <Logo/>
      </div>
    );
  }
}

export default Landing;
