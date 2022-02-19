import { useState, useEffect } from "react";
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm'
import ContactFilter from './ContactFilter/ContactFilter'
import useLocalStorage from '../hooks/useLocalStorage'
import data from '../data/data.json'
const shortid = require('shortid');


function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', data);
//============== принимает и записывает данные с компонента Filter в state ======
  const changeFilter = (e) => { 
    setFilter(e.currentTarget.value)
  };
  //============= удаление контакта из списка ========
  const deleteContact = (contactId) => { 
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId)
    )
  };
  //========= принимает данные с компонента Form ====
  //========= добавляет данные в  state =============
  //======== выводит alert если контакт уже есть в state =======
  const formSubmitHandler = data => {
    console.log(data)
    const message = `${data.name} is alredy in contacts`;
    const findName = contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());
    const findNumber = contacts.find(contact => contact.number === data.number);

    if (findName || findNumber !== undefined) {
      alert(message);
      return
    };
    
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number
    }
   setContacts( prevState => [...prevState, contact])
  };
  //==================================
  useEffect(() => {
    console.log('start useEffect');
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

//==================================
  useEffect(() => {
    console.log('start useEffect');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
     if (parsedContacts) {
  setContacts(parsedContacts);};
  }, [setContacts])

    const normalizeFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
    return (
       <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <ContactFilter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filterContacts}
        onDeleteContact={deleteContact}
        />
        </section>
    )
};
    
export default App;
