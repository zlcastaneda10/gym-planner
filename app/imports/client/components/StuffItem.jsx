import React from "react";
import { Table, Rating, Button, Icon, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  state = {};

  handleRate = (e, { rating }) => {
    this.setState({ rating }, () => {
      Meteor.call(
        "stuffs.update",
        { id: this.props.stuff._id, score: rating },
        (err, result) => {
          console.log(err, result);
        }
      );
    });
  };

  render() {
    console.log(this.props.stuff);
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.name}</Table.Cell>
        <Table.Cell>{this.props.stuff.repetitions}</Table.Cell>
        <Table.Cell>{this.props.stuff.category}</Table.Cell>
        <Table.Cell>{this.props.stuff.steps}</Table.Cell>
        <Table.Cell>{this.props.stuff.username}</Table.Cell>
        <Table.Cell>
          <Rating
            icon="star"
            defaultRating={this.props.stuff.score}
            maxRating={5}
            disabled={this.props.stuff.owner == Meteor.userId()}
            onRate={this.handleRate}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
