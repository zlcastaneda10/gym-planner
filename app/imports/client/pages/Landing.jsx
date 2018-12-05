import React from "react";
import { Grid, Image } from "semantic-ui-react";
import "../components/header.css";

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div
          id="hero"
          className="Hero"
          style={{
            backgroundImage: "url(/images/background.jpg)"
          }}
        >
          <div className="content">
            <Image size="small" circular src="/images/gym-routine.png" />

            <p>
            <h1>Welcome to GYM-PLANNER</h1>
            <p>Find a routine according to your goals!</p>
            </p>
            <div className="button-wrapper" />
          </div>
          <div className="overlay" />
        </div>
        {/* <Grid verticalAlign="middle" textAlign="center" container>
          <Grid.Column width={4}>
            <Image size="small" circular src="/images/gym-routine.png" />
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to GYM-PLANNER</h1>
            <p>Find a routine according to your goals!</p>
          </Grid.Column>
        </Grid>
        <Grid verticalAlign="middle" textAlign="center" container>
          <Grid.Column width={12} /><h1>Welcome to GYM-PLANNER</h1>
            <p>Find a routine according to your goals!</p>
        </Grid> */}
      </div>
    );
  }
}

export default Landing;
