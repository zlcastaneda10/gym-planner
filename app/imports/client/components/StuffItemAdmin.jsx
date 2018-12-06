import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';


/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  render() {
    console.log(this.props)
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.username}</Table.Cell>
          <Table.Cell>{this.props.routines.map((routine,i)=>{

            return (<Link to={`/edit/${routine._id}`}>{routine.name + (i == routine.length-1 ? (", "):(""))}</Link>)
        })
      }</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
