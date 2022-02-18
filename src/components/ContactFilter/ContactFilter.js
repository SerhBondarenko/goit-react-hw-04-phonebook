import React from 'react';
import PropTypes from 'prop-types';

const ContactFilter = ({ value, onChange }) => (
  <label>
    Search by name
    <input
      type="text"
      value={value}
      onChange={onChange}
   />
  </label>
);

export default ContactFilter;

//========================== propTypes ===================
 ContactFilter.propTypes = {
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
 };