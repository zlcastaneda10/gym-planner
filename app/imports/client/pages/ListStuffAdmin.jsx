import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItemAdmin from '/imports/client/components/StuffItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuffAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    console.log(this.props.followers)
    console.log(this.props.routinesOfFollower)
    return (
        <Container>
          <Header as="h2" textAlign="center">Followers</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Routines Followed</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.followers.map((follower) => <StuffItemAdmin key={follower._id} stuff={follower} routines={this.props.routinesOfFollower[follower._id]} />)}
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
              <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
            </Card.Content>
          </Card>
          */}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuffAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StuffAdmin');
  if(subscription.ready()){
    let stuffs = Stuffs.find({}).fetch();
    let routinesOfFollower = {}
    let followers = stuffs.map((s)=>{
      s.followers.map((f)=>{
        if(routinesOfFollower[f] == undefined){
          routinesOfFollower[f] = [s]
        }
        else{
          routinesOfFollower[f].push(s);
        }
      })
      return s.followers
    })
    followers = Array.from(new Set(followers))[0];
    console.log(followers);
    const subscription2 = Meteor.subscribe('followers',followers);

    return {
      stuffs: stuffs,
      ready: subscription2.ready(),
      followers:Meteor.users.find({_id: { "$in": followers}}).fetch(),
      routinesOfFollower
    };
  }
  else{
    return {
      stuffs: [],
      ready: false,
      followers: []
    }
  }
  
})(ListStuffAdmin);
