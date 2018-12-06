import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

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
       /*
      <Card>
       <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
       <Card.Content>
         <Card.Header>{this.props.stuff.name}</Card.Header>
         <Card.Meta>
           <span className='date'>{this.props.stuff.repetitions}</span>
         </Card.Meta>
         <Card.Description>{this.props.stuff.category}</Card.Description>
         <Card.Description>{this.props.stuff.steps}</Card.Description>
       </Card.Content>
       <Card.Content extra>
         <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
       </Card.Content>
     </Card>
     */
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
