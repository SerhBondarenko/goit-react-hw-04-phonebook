import { useState, useEffect } from "react";
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm'
import ContactFilter from './ContactFilter/ContactFilter'
const shortid = require('shortid');



function App() {

const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56',},
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12',},
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79',},
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26',},
]);
  const [filter, setFilter] = useState('');
//============== принимает и записывает данные с компонента Filter в state ======
  const changeFilter = (e) => { 
    setFilter(e.currentTarget.value)
    //this.setState({filter: e.currentTarget.value})
  };
  //============= удаление контакта из списка ========
  const deleteContact = (contactId) => { 
    setContacts(prevState => prevState.contacts.filter(contact => contact.id !== contactId)
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

/*
  componentDidUpdate(prevProps, prevState) { 
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    };
  };
  */
//==================================
  useEffect(() => {
    console.log('start useEffect');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
     if (parsedContacts) {
  setContacts(parsedContacts);};
  }, [])
  
  
  /*
  componentDidMount() { 
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
  this.setState({ contacts: parsedContacts });
    };
  };
  */
//===================================
  
    //const { contacts, filter } = this.state;
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
