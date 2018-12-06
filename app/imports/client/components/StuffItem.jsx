import React from "react";
import {
  Table,
  Rating,
  Button,
  Icon,
  Label,
  Card,
  Image
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { Roles } from "meteor/alanning:roles";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  state = {};

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
  handleRate = (e, { rating }) => {
    this.setState({ rating }, () => {
      Meteor.call(
        "stuffs.updateScore",
        { id: this.props.stuff._id, score: rating },
        (err, result) => {
          console.log(err, result);
        }
      );
    });
  };

  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");
    const active = this.props.stuff.followers.includes(Meteor.userId())
    const imagen= this.props.stuff.category;
    let source;
    console.log(this.props.stuff);
    if (imagen==="Abs")
    {
      source="/images/abs.png"
    }
    if (imagen==="Arms")
    {
      source="/images/arms.jpg"
    }
    if (imagen==="Back")
    {
      source="/images/back.png"
    }
    if (imagen==="Buttocks")
    {
      source="/images/buttocks.png"
    }
    if (imagen==="Chest")
    {
      source="/images/chest.jpg"
    }
    if (imagen==="Legs")
    {
      source="/images/legs.png"
    }
    return (
      
      <Card style={{marginBottom:10}}>
          {/*<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />*/}
          <Image src={source} />        
        <Card.Content>
          <Card.Header>{this.props.stuff.name}</Card.Header>
          <Card.Meta>
            <span className="date">{this.props.stuff.repetitions}</span>
          </Card.Meta>
          <Card.Description>{this.props.stuff.category}</Card.Description>
          <Card.Description>{this.props.stuff.steps}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rating
            icon="star"
            defaultRating={this.props.stuff.score}
            maxRating={5}
            disabled={this.props.stuff.owner == Meteor.userId()}
            onRate={this.handleRate}
          />
        </Card.Content>
        {isAdmin && <Card.Content extra >
          <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
          </Card.Content>
        }
        {isAdmin ? (
          <Button
            toggle
            active={active}
            style={{ height: 41, width:120 }}
            onClick={() => this.handleClick(this.props.stuff._id, active)}
            as="div"
            labelPosition="right"
          >
            <Button toggle active={active} icon>
              <Icon name="heart" />
              Follow
            </Button>
            <Label active={active} as="a" basic pointing="left">
              {this.props.stuff.followers ? this.props.stuff.followers.length : 0}
            </Label>
          </Button>
        ) : (
          <Button active style={{ height: 41, width:120 }} as="div" labelPosition="right">
            <Button icon active>
              <Icon name="heart" />
              Followers:
            </Button>
            <Label active as="a" basic pointing="left">
              {this.props.stuff.followers ? this.props.stuff.followers.length : 0}
            </Label>
          </Button>
        )}
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
