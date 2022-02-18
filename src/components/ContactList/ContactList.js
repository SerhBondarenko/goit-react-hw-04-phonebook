import React from "react";
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <ul>
        {contacts.map(({id,name,number}) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />))}
      </ul>
    </div>
  );
};

export default ContactList;

//========================== propTypes ===================
 ContactList.propTypes = {
   contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
   onDeleteContact: PropTypes.func.isRequired,
 };