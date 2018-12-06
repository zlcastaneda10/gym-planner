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
import { Card, Image } from 'semantic-ui-react';
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Roles } from "meteor/alanning:roles";


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(id, active) {
    if (active)
      Meteor.call(
        "stuffs.unfollow",
        { follower: Meteor.userId(), id: id },
        (err, resp) => {
          if (!err) {
          }
        }
      );
    else
      Meteor.call(
        "stuffs.follow",
        { follower: Meteor.userId(), id: id },
        (err, resp) => {
          if (!err) {

          }
          console.log(err, resp);
        }
      );
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
    const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");
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
                  {isAdmin && <Table.HeaderCell>Actions</Table.HeaderCell>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.stuffs.map(stuff => (
                  <StuffItem key={stuff._id} stuff={stuff} />
                ))}
              </Table.Body>
            </Table>
      
            {/*
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                  <Card.Header>Name</Card.Header>
                  <Card.Meta>
                    <span className='date'>Repetitions</span>
                  </Card.Meta>
                  <Card.Description>Category</Card.Description>
                  <Card.Description>Steps</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    <Card.Description>Trainer</Card.Description>
                  </a>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    <Card.Description>Raiting</Card.Description>
                  </a>
                </Card.Content>
              </Card>
            */}
          </Grid.Column>
          <Grid.Column width={2} style={{ marginTop: 46 }}>
            {this.props.stuffs.map((stuff, i) => {
              const active = stuff.followers.includes(Meteor.userId())
              if (!isAdmin) {
                return (
                  <Button
                    toggle
                    active={active}
                    style={{ height: 41 }}
                    onClick={() => this.handleClick(stuff._id, active)}
                    as="div"
                    labelPosition="right"
                  >
                    <Button toggle active={active} icon>
                      <Icon name="heart" />
                      Follow
                    </Button>
                    <Label
                      active={active}
                      as="a"
                      basic
                      pointing="left"
                    >
                      {stuff.followers ? stuff.followers.length : 0}
                    </Label>
                  </Button>
                );
              } else
                return (
                  <Button
                    active
                    style={{ height: 41 }}
                    as="div"
                    labelPosition="right"
                  >
                    <Button icon active>
                      <Icon name="heart" />
                      Followers:
                    </Button>
                    <Label
                      active
                      as="a"
                      basic
                      pointing="left"
                    >
                      {stuff.followers ? stuff.followers.length : 0}
                    </Label>
                  </Button>
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
