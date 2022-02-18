import React from 'react';
import PropTypes from 'prop-types';


  const ContactListItem = ({ id, name, number, onDeleteContact }) => {
    return (
      <li key={id}>
        {name}: {number}{' '}
        <button onClick={() => onDeleteContact(id)}>Delete</button>
      </li>
    ); 
  };

export default ContactListItem;

 ContactListItem.propTypes = {
   name: PropTypes.string,
   number: PropTypes.string,
   onDeleteContact: PropTypes.func.isRequired,
 };