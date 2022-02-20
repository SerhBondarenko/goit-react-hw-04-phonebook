import { useState } from "react";
import PropTypes from "prop-types";
const shortid = require("shortid");

 function  ContactForm({onSubmit}){ 
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');
 
  //========= генерация уникального id =================
 const nameInputId = shortid.generate();
 const numberInputId = shortid.generate();
  //========= обновляет данные в state =================
  const handleChangeName = (e) => {
   setName(e.currentTarget.value);
   };
   
    const handleChangeNumber = (e) => {
      setNumber(e.currentTarget.value);
    };
  //======================== добавление контакта  =========
  //================== предает данные в App ===============
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({name, number});
    reset();
  };
  //====================== reset формы ====================
  //==== можно сделать initialState  в (конспекте)
   const reset = () => {
     setName('');
     setNumber(''); 
  };
  //=========================== render ====================
   
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            placeholder="Enter name"
            id={nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={numberInputId}>
          Number
          <input
            type="tel"
            name="number"
            placeholder="Enter number"
            value={number}
            onChange={handleChangeNumber}
            id={numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className="submitBtn">
          Add contact
        </button>
      </form>
    );
};

export default ContactForm;

  //========================== propTypes ===================
  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };