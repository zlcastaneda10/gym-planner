import React from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Table,
  Header,
  Loader,
  Button,
  Icon,
  Label,
  Grid
} from "semantic-ui-react";
import { Stuffs } from "/imports/api/stuff/stuff";
import StuffItem from "/imports/client/components/StuffItem";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: {} };
  }
  handleClick(id, i) {
    if (this.state.active[i])
      Meteor.call(
        "stuffs.unfollow",
        { follower: Meteor.userId(), id: id },
        (err, resp) => {
          if (!err) {
            let active = this.state.active;
            active[i] = false;

            this.setState({
              active: active
            });
          }
        }
      );
    else
      Meteor.call(
        "stuffs.follow",
        { follower: Meteor.userId(), id: id },
        (err, resp) => {
          if (!err) {
            let active = this.state.active;
            active[i] = true;

            this.setState({
              active: active
            });
          }
          console.log(err, resp);
        }
      );
  }
  componentDidMount() {
    this.props.stuffs.map((stuff, i) => {
      if (stuff.includes(Meteor.userId())) {
        active[i] = true;
      } else {
        active[i] = false;
      }
    });
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">
          List Routines
        </Header>
        <Grid textAlign="center" centered columns={2}>
          <Grid.Column width={14}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Repetitions</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Steps</Table.HeaderCell>
                  <Table.HeaderCell>Trainer</Table.HeaderCell>
                  <Table.HeaderCell>Raiting</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.stuffs.map(stuff => (
                  <StuffItem key={stuff._id} stuff={stuff} />
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={2} style={{ marginTop: 46 }}>
            {this.props.stuffs.map((stuff, i) => {
              if (stuff.owner != Meteor.userId()) {
                return(
                <Button
                  toggle
                  active={this.state.active[i]}
                  style={{ height: 41 }}
                  onClick={() => this.handleClick(stuff._id, i)}
                  as="div"
                  labelPosition="right"
                >
                  <Button toggle active={this.state.active[i]} icon>
                    <Icon name="heart" />
                    Follow
                  </Button>
                  <Label
                    toggle
                    active={this.state.active[i]}
                    as="a"
                    basic
                    pointing="left"
                  >
                    {stuff.followers ? stuff.followers.length : 0}
                  </Label>
                </Button>);
              } else
                return (
                  <div style={{ height: 41 }} as="div" labelPosition="right">
                    <div icon>
                      <Icon name="heart" />
                      Followers:
                    </div>
                    <Label as="a" basic pointing="left">
                      {stuff.followers ? stuff.followers.length : 0}
                    </Label>
                  </div>
                );
            })}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe("Stuff");
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready()
  };
})(ListStuff);
