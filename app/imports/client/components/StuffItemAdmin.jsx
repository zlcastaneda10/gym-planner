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
       <Card style={{marginBottom:10}}>
       <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
       <Card.Content>
         <Card.Header>{this.props.stuff.username}</Card.Header>
         <Card.Meta>
          <span>Routines Followed:</span>
         </Card.Meta> 
         {this.props.routines.map((routine,i)=>{

          return (<Card.Description><Link to={`/edit/${routine._id}`}>{routine.name + (i == routine.length-1 ? (", "):(""))}</Link></Card.Description>)

          })
        }
       </Card.Content>
     </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
